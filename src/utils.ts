function componentToHex(c: number): string {
  var hex = c.toString(16).toUpperCase();
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function loadFile(files: FileList | null): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!files) {
      return reject();
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      var img = new Image();
      img.src = <string>reader.result;
      img.onload = () => resolve(img);
    };
  });
}
