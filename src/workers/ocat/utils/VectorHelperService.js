export class VectorHelperService {
  constructor() {
    this.tolerance = 0.00001;
  }

  // this algorithm is more costly for longer arrays of points.
  removeAllDuplicateVectors(items, tolerance = 1e-7) {
    const cleanItems = [];
    items.forEach((item) => {
      // when there are no points in cleanPoints array that match the current point, push it in.
      if (!cleanItems.some((s) => this.vectorsTheSame(item, s, tolerance))) {
        cleanItems.push(item);
      }
    });
    return cleanItems;
  }

  removeConsecutiveDuplicates(points, checkFirstAndLast = true) {
    const pointsRemaining = [];
    if (points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i];
        const previousPoint = points[i - 1];
        if (!this.vectorsTheSame(currentPoint, previousPoint, this.tolerance)) {
          pointsRemaining.push(previousPoint);
        }
        if (i === points.length - 1) {
          pointsRemaining.push(currentPoint);
        }
      }
      if (checkFirstAndLast) {
        const firstPoint = pointsRemaining[0];
        const lastPoint = pointsRemaining[pointsRemaining.length - 1];
        if (this.vectorsTheSame(firstPoint, lastPoint, this.tolerance)) {
          pointsRemaining.pop();
        }
      }
    } else if (points.length === 1) {
      pointsRemaining.push(...points);
    }
    return pointsRemaining;
  }

  vectorsTheSame(vec1, vec2, tolerance) {
    let result = false;
    if (vec1.length !== vec2.length) {
      return result;
    }

    result = true;
    for (let i = 0; i < vec1.length; i++) {
      if (!this.approxEq(vec1[i], vec2[i], tolerance)) {
        result = false;
        break;
      }
    }

    return result;
  }

  approxEq(num1, num2, tolerance) {
    const res = Math.abs(num1 - num2) < tolerance;
    return res;
  }
}
