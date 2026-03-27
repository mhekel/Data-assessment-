import fs from "fs";

// Read the input file
const data = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Parse rows into objects
const points = data.map(line => {
  const parts = line.trim().split(/\s+/);

  const x = parseInt(parts[0], 10);   // FIRST column
  const char = parts[1];              // SECOND column
  const y = parseInt(parts[2], 10);   // THIRD column

  return { x, y, char };
});

// Determine grid size
const maxX = Math.max(...points.map(p => p.x));
const maxY = Math.max(...points.map(p => p.y));

// Create empty grid
const grid = Array.from
