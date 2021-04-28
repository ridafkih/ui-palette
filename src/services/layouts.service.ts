interface ScreenElementPosition {
  x: number,
  y: number
}

interface ScreenElementDimensions {
  width: number,
  height: number
}

type ColorType = "main" | "secondary" | "accent" | "background";

interface ScreenElement {
  colorType: ColorType,
  position: ScreenElementPosition,
  dimensions: ScreenElementDimensions
}

interface ScreenLayout {
  value: string,
  elements: ScreenElement[]
}

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 2048;

export const layouts: ScreenLayout[] = [
  {
    value: "social-app",
    elements: [
      {
        colorType: "main",
        position: {
          x: 0,
          y: 0
        },
        dimensions: {
          width: CANVAS_WIDTH / 2,
          height: CANVAS_HEIGHT / 2,
        }
      },
      {
        colorType: "secondary",
        position: {
          x: CANVAS_WIDTH / 2,
          y: 0
        },
        dimensions: {
          width: CANVAS_WIDTH / 2,
          height: CANVAS_HEIGHT / 2,
        }
      },
      {
        colorType: "accent",
        position: {
          x: 0,
          y: CANVAS_HEIGHT / 2
        },
        dimensions: {
          width: CANVAS_WIDTH / 2,
          height: CANVAS_HEIGHT / 2,
        }
      },
      {
        colorType: "background",
        position: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2
        },
        dimensions: {
          width: CANVAS_WIDTH / 2,
          height: CANVAS_HEIGHT / 2,
        }
      }
    ]
  }
]