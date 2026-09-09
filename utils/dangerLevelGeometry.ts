// Pure geometry helpers for the circular Danger Level control.
// Angle convention: degrees in [0, 360), 0 = top (12 o'clock), increasing clockwise.

export function valueToProgress(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(value / max, 1));
}

export function angleFromPoint(x: number, y: number, cx: number, cy: number): number {
  const dx = x - cx;
  const dy = y - cy;
  const angleRad = Math.atan2(dx, -dy);
  const angleDeg = (angleRad * 180) / Math.PI;
  return (angleDeg + 360) % 360;
}

export function angleToValue(angleDeg: number, max: number, step = 1): number {
  const normalized = ((angleDeg % 360) + 360) % 360;
  const raw = (normalized / 360) * max;
  const stepped = Math.round(raw / step) * step;
  return Math.max(0, Math.min(stepped, max));
}

export interface ThumbOffset {
  dx: number;
  dy: number;
}

export function valueToThumbOffset(value: number, max: number, radius: number): ThumbOffset {
  const angleDeg = (valueToProgress(value, max)) * 360;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    dx: radius * Math.sin(angleRad),
    dy: -radius * Math.cos(angleRad),
  };
}
