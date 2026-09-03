/** Position a fixed hover label above a projected character head. */
export function positionHoverLabel(
  label: HTMLElement,
  projected: { x: number; y: number },
  rect: Pick<DOMRectReadOnly, "left" | "top" | "width" | "height">,
): void {
  label.style.left = `${rect.left + (projected.x * 0.5 + 0.5) * rect.width}px`;
  label.style.top = `${rect.top + (-projected.y * 0.5 + 0.5) * rect.height}px`;
  // Replace any legacy pixel translation retained from the previous target.
  label.style.transform = "translate(-50%, -100%)";
}
