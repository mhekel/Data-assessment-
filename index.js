import fetch from "node-fetch";
import cheerio from "cheerio";

export async function decodeGrid(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const points = [];

  $("table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length >= 3) {
      const x = parseInt($(cells[0]).text().trim(), 10);
      const ch = $(cells[1]).text().trim();
      const y = parseInt($(cells[2]).text().trim(), 10);

      if (!isNaN(x) && !isNaN(y)) {
        points.push({ x, y, ch });
      }
    }
  });

  // Compute bounds
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));

  // Build empty grid
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " ")
  );

  // Fill grid
  for (const { x, y, ch } of points) {
    const nx = x - minX;
    const ny = y - minY;
    grid[ny][nx] = ch;
  }

  // Print from top (maxY) to bottom (minY)
  for (let row = height - 1; row >= 0; row--) {
    console.log(grid[row].join(""));
  }
}
