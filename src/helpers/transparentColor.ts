export const makeTransparent = (hex: string, opacity = 0.5): string => {
  // Ensure opacity is between 0 and 1
  opacity = Math.max(0, Math.min(1, opacity));

  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex string into RGB values
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};