import ffmpeg from 'fluent-ffmpeg';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';

interface FileInfo {
  size: number;
  bitrate: number;
  duration: number;
}

interface SilencePeriod {
  start: number;
  end: number;
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

function detectSilence(inputFile: string): Promise<SilencePeriod[]> {
  return new Promise((resolve, reject) => {
    const silencePeriods: SilencePeriod[] = [];
    let currentStart: number | null = null;

    const ffmpeg = spawn('ffmpeg', [
      '-i', inputFile,
      '-af', 'silencedetect=noise=-50dB:d=0.5',
      '-f', 'null',
      '-'
    ]);

    ffmpeg.stderr.on('data', (data) => {
      const output = data.toString();
      const startMatch = output.match(/silence_start: ([\d.]+)/);
      const endMatch = output.match(/silence_end: ([\d.]+)/);

      if (startMatch) {
        currentStart = parseFloat(startMatch[1]);
      } else if (endMatch && currentStart !== null) {
        const end = parseFloat(endMatch[1]);
        silencePeriods.push({ start: currentStart, end });
        currentStart = null;
      }
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve(silencePeriods);
      } else {
        reject(new Error(`FFmpeg process exited with code ${code}`));
      }
    });
  });
}

async function generateTrimFilter(silencePeriods: SilencePeriod[], maxSilenceDuration: number, totalDuration: number): Promise<string> {
  let filter = '';
  let lastEnd = 0;

  for (const period of silencePeriods) {
    if (period.start > lastEnd) {
      // Keep non-silent part
      filter += `between(t,${lastEnd},${period.start})+`;
    }

    const silenceDuration = period.end - period.start;
    if (silenceDuration > maxSilenceDuration) {
      // Keep only maxSilenceDuration of silence
      filter += `between(t,${period.start},${period.start + maxSilenceDuration})+`;
    } else {
      // Keep entire silence if it's shorter than maxSilenceDuration
      filter += `between(t,${period.start},${period.end})+`;
    }

    lastEnd = period.end;
  }

  // Keep the rest of the audio after the last silence period
  if (lastEnd < totalDuration) {
    filter += `between(t,${lastEnd},${totalDuration})+`;
  }

  // Remove the trailing '+'
  filter = filter.slice(0, -1);

  return filter;
}

async function processAudio(inputFile: string, outputFile: string, silencePeriods: SilencePeriod[], maxSilenceDuration: number, totalDuration: number): Promise<string> {
  const trimFilter = await generateTrimFilter(silencePeriods, maxSilenceDuration, totalDuration);

  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .audioFilters(`aselect='${trimFilter}',asetpts=N/SR/TB`)
      .audioBitrate(32)
      //.on('start', (commandLine) => {
      //  console.log('Spawned FFmpeg with command: ' + commandLine);
      //})
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

    const silencePeriods = await detectSilence(inputFile);
    console.log(`Detected ${silencePeriods.length} silence periods`);

    outputFile = await processAudio(inputFile, outputFile, silencePeriods, 30, inputInfo.duration);

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