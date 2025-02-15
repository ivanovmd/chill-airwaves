
declare global {
  interface Window {
    electronAPI: {
      getEnv: (key: string) => Promise<string>;
      verifyShare: (url: string) => Promise<boolean>;
      shell: {
        openExternal: (url: string) => Promise<void>;
      };
    };
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export { }; // This line ensures that the file is treated as a module and not a script. It prevents TypeScript from merging this file with other global declarations. This is important for maintaining type safety and avoiding conflicts.  

