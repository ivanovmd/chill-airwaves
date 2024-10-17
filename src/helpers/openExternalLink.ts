export const openExternalLink = (url: string, event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  if (event) {
    event.preventDefault();
  }
  if (window.electronAPI && window.electronAPI.shell) {
    window.electronAPI.shell.openExternal(url);
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}