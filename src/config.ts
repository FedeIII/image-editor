export const LENS_WIDTH = 128;
export const LENS_HEIGHT = 128;
export const LENS_RADIUS = LENS_WIDTH / 2;
export const LENS_ZOOM = 8;
export const HALF_LENS_ZOOM = LENS_ZOOM / 2;
export const LENS_BORDER = 8;

const lensWidthWithoutBorders = LENS_WIDTH - 2 * LENS_BORDER;
const numberOfLensBars = lensWidthWithoutBorders / LENS_ZOOM;
const pixelsToFirstWhiteBar = (numberOfLensBars / 2) * LENS_ZOOM;
export const CENTRAL_PIXEL_X1 = pixelsToFirstWhiteBar + LENS_BORDER / 2;
