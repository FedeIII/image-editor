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
