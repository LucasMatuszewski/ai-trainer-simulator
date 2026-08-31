export interface AvoidanceAgent {
  id: string;
  position: { x: number; z: number };
  velocity: { x: number; z: number };
  /** Lower values have right of way; higher values yield more. */
  priority: number;
}

export function computeAvoidancePush(
  self: AvoidanceAgent,
  others: readonly AvoidanceAgent[],
  radius = 1.5,
  pushMeters = 0.3,
): { x: number; z: number } {
  const selfSpeed = Math.hypot(self.velocity.x, self.velocity.z);
  if (selfSpeed <= 0.05 || radius <= 0 || pushMeters <= 0) return { x: 0, z: 0 };

  const contributors = others
    .filter((other) => {
      if (other.id === self.id || Math.hypot(other.velocity.x, other.velocity.z) <= 0.05) return false;
      if (self.priority < other.priority) return false;
      return Math.hypot(other.position.x - self.position.x, other.position.z - self.position.z) < radius;
    })
    .map((other) => ({
      other,
      distance: Math.hypot(other.position.x - self.position.x, other.position.z - self.position.z),
    }))
    .sort((left, right) => left.distance - right.distance || left.other.id.localeCompare(right.other.id))
    .slice(0, 2);

  const perpendicular = { x: -self.velocity.z / selfSpeed, z: self.velocity.x / selfSpeed };
  let x = 0;
  let z = 0;
  for (const { other, distance } of contributors) {
    const awayX = self.position.x - other.position.x;
    const awayZ = self.position.z - other.position.z;
    const dot = perpendicular.x * awayX + perpendicular.z * awayZ;
    const sign = dot === 0 ? (self.id.localeCompare(other.id) <= 0 ? -1 : 1) : Math.sign(dot);
    const magnitude = pushMeters * (1 - distance / radius);
    x += perpendicular.x * sign * magnitude;
    z += perpendicular.z * sign * magnitude;
  }
  return { x, z };
}
