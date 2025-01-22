/* eslint-disable prefer-const */
const allImages = import.meta.glob("./*");
let Images: string[] = [];

// Get the current directory as a base path

for (const img in allImages) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allImages[img]().then((smth: any) => {
    Images.push(smth.default);
  });
}

export default Images;
