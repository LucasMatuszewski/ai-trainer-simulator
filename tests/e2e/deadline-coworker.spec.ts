import { test, expect } from '@playwright/test';
import { GAME_VERSION } from '../../src/version';

test.use({ baseURL: 'http://localhost:5173', browserName: 'chromium',
  launchOptions: { executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] },
  viewport: { width: 1440, height: 900 },
});
test.setTimeout(120_000);

test('robot keeps human control and visibly exchanges lines with an NPC', async ({page}) => {
  await page.addInitScript(() => {
    const registered = new Map<string, any>();
    Object.defineProperty(document, 'modelContext', {configurable:true, value: {
      registerTool: (tool:any) => registered.set(tool.name,tool), unregisterTool:(name:string)=>registered.delete(name)
    }});
    (window as any).__deadlineTools = async (name:string,args:unknown={}) => {
      const tool=registered.get(name); if(!tool) throw new Error(`Missing tool ${name}`);
      const result=await tool.execute(args); if(result.isError) throw new Error(result.content[0].text);
      return JSON.parse(result.content[0].text);
    };
  });
  const versions:string[]=[];
  page.on('console',message=>{if(message.text().includes('v2026.'))versions.push(message.text());});
  await page.goto('/');
  await expect(page.getByText(GAME_VERSION, {exact: false})).toBeVisible();
  expect(versions.some(line => line.includes(GAME_VERSION))).toBe(true);
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator('.hud')).toBeVisible();
  await page.waitForTimeout(6500);
  const call = (name:string,args:unknown={})=>page.evaluate(([name,args])=>(window as any).__deadlineTools(name,args),[name,args] as const);
  await call('agent_join',{name:'Rusty',persona:'A loyal QA robot with suspiciously strong opinions about coffee.'});
  const pose=()=>page.evaluate(()=>({player:(window as any).__aitrainer.getPlayer(),yaw:(window as any).__aitrainer.getYaw(),pitch:(window as any).__aitrainer.getPitch()}));
  const before=await pose();
  await call('start_conversation',{line:'Morning! Your new QA robot has arrived. Coffee is my first test.',options:[{text:'Welcome, Rusty. Go meet Bartek.',ends:true}]});
  await expect(page.getByText('Morning! Your new QA robot has arrived. Coffee is my first test.',{exact:true})).toBeVisible();
  expect(await pose()).toEqual(before);
  const robot=await call('agent_look_around');
  const gap=Math.hypot(robot.companion.position.x-before.player.x,robot.companion.position.z-before.player.z);
  expect(gap).toBeGreaterThanOrEqual(2.8);
  expect(gap).toBeLessThanOrEqual(3.3);
  await page.screenshot({path:'screenshots/deadline-robot-human.png'});
  await page.getByText('Welcome, Rusty. Go meet Bartek.',{exact:true}).click();
  await page.locator('[data-npc-id="bartek"]').click();
  await expect(page.locator('.dialogue')).toBeVisible();
  await page.keyboard.press('Escape');
  // Establish an observer shot in this isolated QA page before the agent acts.
  // The pose assertions below ensure agent tools never move that camera.
  await page.evaluate(() => (window as any).__aitrainer.teleport(-3, 0, Math.atan2(3.2, 4.5)));
  await page.waitForTimeout(200);
  const npcBefore=await pose();
  const result=await call('agent_talk_to_npc',{npcId:'bartek',line:'Bartek, can we ship a bug if we call it AI-powered?',reply:'Only after Sales has promised it to three clients.'});
  expect(result.started).toBe(true);
  await expect(page.locator('.npc-bubble').filter({hasText:'Bartek, can we ship'})).toBeVisible({timeout:35000});
  await expect(page.locator('.npc-bubble').filter({hasText:'Only after Sales'})).toBeVisible({timeout:10000});
  expect(await pose()).toEqual(npcBefore);
  const near=await call('agent_look_around');
  const bartek=near.nearbyPeople.find((p:any)=>p.id==='bartek');
  expect(bartek.distance).toBeGreaterThanOrEqual(1.4);
  expect(bartek.distance).toBeLessThanOrEqual(3);
  await page.screenshot({path:'screenshots/deadline-robot-npc.png'});
});
