async function decodeGrid(url) {
  const response = await fetch(url);
  const text = await response.text();

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const entries = lines.map(line => {
    const parts = line.split(/\s+/);
    const x = parseInt(parts[0], 10);
    const char = parts[1];
    const y = parseInt(parts[2], 10);

    return { x, char, y };
  });

  const maxX = Math.max(...entries.map(e => e.x));
  const maxY = Math.max(...entries.map(e => e.y));

  const grid = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX + 1 }, () => " ")
  );

  for (const { char, x, y } of entries) {
    grid[y][x] = char;
  }

  for (const row of grid) {
    console.log(row.join(""));
  }
}

decodeGrid("https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub");
