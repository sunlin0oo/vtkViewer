export class ShapesHelperService {
  starLines(innerRadius, outerRadius, numRays, half) {
    let lines = [];
    const angle_step = (2 * Math.PI) / numRays;
    for (let i = 0; i < numRays; i++) {
      const angle_i = i * angle_step;
      const outer_point = [outerRadius * Math.cos(angle_i), 0, outerRadius * Math.sin(angle_i)];
      const inner_point = [
        innerRadius * Math.cos(angle_i + angle_step / 2),
        0,
        innerRadius * Math.sin(angle_i + angle_step / 2)
      ];
      const next_outer_point = [
        outerRadius * Math.cos(angle_i + angle_step),
        0,
        outerRadius * Math.sin(angle_i + angle_step)
      ];
      lines.push({ start: outer_point, end: inner_point });
      lines.push({ start: inner_point, end: next_outer_point });
    }
    if (half) {
      lines = lines.slice(0, lines.length / 2);
    }
    return lines;
  }

  parallelogram(width, height, angle, center) {
    const radians = (angle * Math.PI) / 180;
    let x1;
    let y1;
    let x2;
    let y2;
    let x3;
    let y3;
    let x4;
    let y4;
    if (center) {
      x1 = -width / 2;
      y1 = -height / 2;
      x2 = width / 2;
      y2 = -height / 2;
      x3 = width / 2;
      y3 = height / 2;
      x4 = -width / 2;
      y4 = height / 2;
    } else {
      x1 = 0;
      y1 = 0;
      x2 = width;
      y2 = 0;
      x3 = width;
      y3 = height;
      x4 = 0;
      y4 = height;
    }
    const shift = (height * Math.tan(radians)) / 2;
    x1 += shift;
    x2 += shift;
    x3 -= shift;
    x4 -= shift;
    const pt1 = [x1, 0, y1];
    const pt2 = [x2, 0, y2];
    const pt3 = [x3, 0, y3];
    const pt4 = [x4, 0, y4];
    const line1 = { start: pt1, end: pt2 };
    const line2 = { start: pt2, end: pt3 };
    const line3 = { start: pt3, end: pt4 };
    const line4 = { start: pt4, end: pt1 };
    return [line1, line2, line3, line4];
  }
}
