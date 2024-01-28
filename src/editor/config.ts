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

export const LENS_LABEL_X = 34;
export const LENS_LABEL_Y = 93;
export const LENS_LABEL_WIDTH = LENS_WIDTH - 2 * LENS_LABEL_X;
export const LENS_LABEL_RADIUS = 8;
export const LENS_LABEL_HEIGHT = LENS_LABEL_RADIUS * 2;
