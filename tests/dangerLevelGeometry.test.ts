import {
  angleFromPoint,
  angleToValue,
  valueToProgress,
  valueToThumbOffset,
} from '@/utils/dangerLevelGeometry';

describe('dangerLevelGeometry - valueToProgress', () => {
  it('returns 0 at the minimum value', () => {
    expect(valueToProgress(0, 26)).toBe(0);
  });

  it('returns 1 at the maximum value', () => {
    expect(valueToProgress(26, 26)).toBe(1);
  });

  it('returns a proportional fraction for a mid-range value', () => {
    expect(valueToProgress(13, 26)).toBe(0.5);
  });

  it('clamps negative values to 0', () => {
    expect(valueToProgress(-5, 26)).toBe(0);
  });

  it('clamps values above max to 1', () => {
    expect(valueToProgress(40, 26)).toBe(1);
  });

  it('returns 0 when max is 0, avoiding division by zero', () => {
    expect(valueToProgress(5, 0)).toBe(0);
  });

  it('returns 0 when max is negative', () => {
    expect(valueToProgress(5, -10)).toBe(0);
  });
});

describe('dangerLevelGeometry - angleFromPoint', () => {
  const cx = 100;
  const cy = 100;

  it('returns 0 degrees for a point straight above the center (top)', () => {
    expect(angleFromPoint(100, 0, cx, cy)).toBeCloseTo(0);
  });

  it('returns 90 degrees for a point to the right of the center', () => {
    expect(angleFromPoint(200, 100, cx, cy)).toBeCloseTo(90);
  });

  it('returns 180 degrees for a point straight below the center (bottom)', () => {
    expect(angleFromPoint(100, 200, cx, cy)).toBeCloseTo(180);
  });

  it('returns 270 degrees for a point to the left of the center', () => {
    expect(angleFromPoint(0, 100, cx, cy)).toBeCloseTo(270);
  });

  it('always returns a value within [0, 360)', () => {
    const angle = angleFromPoint(cx, cy - 50, cx, cy);
    expect(angle).toBeGreaterThanOrEqual(0);
    expect(angle).toBeLessThan(360);
  });
});

describe('dangerLevelGeometry - angleToValue', () => {
  const max = 26;

  it('maps 0 degrees to 0', () => {
    expect(angleToValue(0, max)).toBe(0);
  });

  it('maps 360 degrees to 0 (wraps around)', () => {
    expect(angleToValue(360, max)).toBe(0);
  });

  it('maps 180 degrees to half of max', () => {
    expect(angleToValue(180, max)).toBe(13);
  });

  it('normalizes negative angles before mapping', () => {
    expect(angleToValue(-90, max)).toBe(angleToValue(270, max));
  });

  it('rounds to the nearest step', () => {
    // step = 1 (default): raw = (10/360)*26 = 0.722 -> rounds to 1
    expect(angleToValue(10, max, 1)).toBe(1);
  });

  it('respects a custom step size', () => {
    // step = 2: raw = (180/360)*26 = 13 -> nearest multiple of 2 is 14
    expect(angleToValue(180, max, 2)).toBe(14);
  });

  it('never returns a value below 0', () => {
    expect(angleToValue(0.01, max)).toBeGreaterThanOrEqual(0);
  });

  it('never returns a value above max', () => {
    expect(angleToValue(359.99, max)).toBeLessThanOrEqual(max);
  });
});

describe('dangerLevelGeometry - valueToThumbOffset', () => {
  const max = 26;
  const radius = 100;

  it('places the thumb directly above the center at value 0 (top)', () => {
    const offset = valueToThumbOffset(0, max, radius);
    expect(offset.dx).toBeCloseTo(0);
    expect(offset.dy).toBeCloseTo(-radius);
  });

  it('places the thumb directly to the right at a quarter of max', () => {
    const offset = valueToThumbOffset(max / 4, max, radius);
    expect(offset.dx).toBeCloseTo(radius);
    expect(offset.dy).toBeCloseTo(0);
  });

  it('places the thumb directly below the center at half of max', () => {
    const offset = valueToThumbOffset(max / 2, max, radius);
    expect(offset.dx).toBeCloseTo(0);
    expect(offset.dy).toBeCloseTo(radius);
  });

  it('places the thumb directly to the left at three-quarters of max', () => {
    const offset = valueToThumbOffset((3 * max) / 4, max, radius);
    expect(offset.dx).toBeCloseTo(-radius);
    expect(offset.dy).toBeCloseTo(0);
  });

  it('is the inverse of angleFromPoint at the four cardinal points', () => {
    const cx = 0;
    const cy = 0;

    const top = valueToThumbOffset(0, max, radius);
    expect(angleFromPoint(top.dx, top.dy, cx, cy)).toBeCloseTo(0);

    const right = valueToThumbOffset(max / 4, max, radius);
    expect(angleFromPoint(right.dx, right.dy, cx, cy)).toBeCloseTo(90);

    const bottom = valueToThumbOffset(max / 2, max, radius);
    expect(angleFromPoint(bottom.dx, bottom.dy, cx, cy)).toBeCloseTo(180);

    const left = valueToThumbOffset((3 * max) / 4, max, radius);
    expect(angleFromPoint(left.dx, left.dy, cx, cy)).toBeCloseTo(270);
  });

  it('clamps to the top position when value exceeds max', () => {
    const offset = valueToThumbOffset(max * 2, max, radius);
    expect(offset.dx).toBeCloseTo(0);
    expect(offset.dy).toBeCloseTo(-radius);
  });

  it('clamps to the top position when value is negative', () => {
    const offset = valueToThumbOffset(-10, max, radius);
    expect(offset.dx).toBeCloseTo(0);
    expect(offset.dy).toBeCloseTo(-radius);
  });
});
