import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron';

export const removeFromCache = async (filePath: string): Promise<void> => {
  console.log(`Removing ${filePath} from cache.`);
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log(`File ${filePath} was removed`);
  } catch (error) {
    console.log(error);

    if (error.code === 'ENOENT') {
      console.log(`File ${filePath} not found in cache.`);
    } else {
      console.error(`Error removing file: ${error}`);
      throw error;
    }
  }
};