// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getEnv: (key: string) => ipcRenderer.invoke('getEnv', key),
  getAtc: (icao: string) => ipcRenderer.invoke('getAtc', icao),
});


