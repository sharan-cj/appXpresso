import fs from 'fs';
import path from 'path';
/**
 * Copies files from a source directory to a destination directory recursively.
 *
 * @param {string} src - The path of the source directory.
 * @param {string} dest - The path of the destination directory.
 */
export const copyFiles = (src, dest) => {
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyFiles(srcFile, destFile);
    } else {
      const contents = fs.readFileSync(srcFile);
      fs.writeFileSync(destFile, contents);
    }
  });
};
