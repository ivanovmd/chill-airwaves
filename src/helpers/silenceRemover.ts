import ffmpeg from 'fluent-ffmpeg';

interface FileInfo {
  size: number;
  bitrate: number;
  duration: number;
}

async function getFileInfo(filePath: string): Promise<FileInfo> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          size: metadata.format.size,
          bitrate: metadata.format.bit_rate,
          duration: metadata.format.duration,
        });
      }
    });
  });
}

async function processAudio(inputFile: string, outputFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .audioFilters([
        'silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,aformat=dblp,areverse',
        'silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,aformat=dblp,areverse',
        'silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:stop_duration=0.5:stop_threshold=-50dB:detection=peak'
      ])
      .audioBitrate(32)
      .on('end', () => resolve(outputFile))
      .on('error', (err) => reject(err))
      .save(outputFile);
  });
}

export async function removeSilence(inputFile: string, outputFile: string): Promise<string> {
  try {
    const inputInfo = await getFileInfo(inputFile);
    console.log(`Original file: ${inputFile}`);
    console.log(`Size: ${(inputInfo.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Bitrate: ${inputInfo.bitrate} Hz`);
    console.log(`Duration: ${inputInfo.duration} seconds`);

    outputFile = await processAudio(inputFile, outputFile);

    const outputInfo = await getFileInfo(outputFile);
    console.log(`Processed file: ${outputFile}`);
    console.log(`Size: ${(outputInfo.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Bitrate: ${outputInfo.bitrate} Hz`);
    console.log(`Duration: ${outputInfo.duration} seconds`);
    console.log("------------------------");

    return outputFile;
  } catch (error) {
    console.error(`Error processing ${inputFile}:`, error);
    throw error;
  }
}