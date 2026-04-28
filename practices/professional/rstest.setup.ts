import { expect } from '@rstest/core'
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'

expect.extend(jestDomMatchers)

HTMLCanvasElement.prototype.getContext = function getContext() {
  return {
    clearRect: () => {},
    fillRect: () => {},
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    measureText: () => ({ width: 0 }),
    putImageData: () => {},
    setTransform: () => {},
  } as unknown as CanvasRenderingContext2D
}
