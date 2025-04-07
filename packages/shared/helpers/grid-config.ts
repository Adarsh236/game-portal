import { DBData, GridConfig } from "@game-portal/types";

export const queryGridConfig = (
  width: number,
  height: number,
  length: number
): GridConfig => {
  // Determine column count based on width.
  let columnCount = 1;
  if (width >= 1024) {
    columnCount = 4;
  } else if (width >= 600) {
    columnCount = 3;
  }

  // Calculate effective grid width by subtracting side padding (2rem each side).
  const sidePaddingPx = 64; // 4rem * 16px (if 1rem = 16px)
  const gridWidth = width - sidePaddingPx;

  const rowCount = Math.ceil(length / columnCount);

  // Get maximum available height (80% of window height)
  const maxHeight = height * 0.8;
  const rowHeight = 360; // Fixed height for each cell
  // Calculate the total content height
  const calculatedHeight = rowCount * rowHeight;
  // Use full content height if it's less than max; otherwise, cap it.
  const gridHeight =
    calculatedHeight < maxHeight ? calculatedHeight : maxHeight;
  // Calculate each cell's width based on the effective grid width.
  const columnWidth = gridWidth / columnCount - 24;

  return {
    columnCount,
    columnWidth,
    rowCount,
    rowHeight,
    gridWidth,
    gridHeight,
  };
};

export const infinityGridConfig = (width: number, length: number) => {
  // Determine the number of columns based on window width.
  let columnCount = 1;
  if (width >= 1024) {
    columnCount = 5;
  } else if (width >= 600) {
    columnCount = 3;
  }

  // Calculate effective grid width by subtracting side padding (2rem each side).
  const sidePaddingPx = 64; // 4rem * 16px (if 1rem = 16px)
  const gridWidth = width - sidePaddingPx;

  const columnWidth = Math.floor(gridWidth / columnCount);
  const rowHeight = 360; // Adjust this based on your GameCard dimensions.
  const rowCount = Math.ceil(length / columnCount);

  // Calculate grid height so that all rows are rendered.
  const gridHeight = rowHeight * rowCount;

  return {
    columnCount,
    columnWidth,
    rowCount,
    rowHeight,
    gridWidth,
    gridHeight,
  };
};
