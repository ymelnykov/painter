export class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(shapes) {
    this.clear();

    shapes.forEach((shape) => {
      if (shape.opacity) {
        this.ctx.globalAlpha = 0.5;
      }

      switch (shape.type) {
        case "circle": {
          this.renderCircle(shape);
          break;
        }

        case "square": {
          this.renderSquare(shape);
          break;
        }

        default: {
          console.log(`Unknown shape ${shape.type}`);
        }
      }
    });

    this.ctx.globalAlpha = 1;
  }

  renderCircle(shape) {
    const radius = shape.size / 2;

    this.ctx.beginPath();
    this.ctx.arc(shape.x, shape.y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = shape.color;
    this.ctx.fill();
  }

  renderSquare(shape) {
    const halfSize = shape.size / 2;

    this.ctx.fillStyle = shape.color;
    this.ctx.fillRect(
      shape.x - halfSize,
      shape.y - halfSize,
      shape.size,
      shape.size
    );
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
