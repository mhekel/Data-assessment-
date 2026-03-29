
import requests
from bs4 import BeautifulSoup

def decode_grid(url):
    # Fetch the published Google Doc HTML
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, "html.parser")

    points = []

    # Google Docs tables look like <table><tbody><tr><td><p>value</p></td>...
    for row in soup.find_all("tr"):
        cells = row.find_all("td")
        if len(cells) >= 3:
            # Extract text inside <td><p>...</p></td>
            x_text = cells[0].get_text(strip=True)
            ch_text = cells[1].get_text(strip=True)
            y_text = cells[2].get_text(strip=True)

            try:
                x = int(x_text)
                y = int(y_text)
                ch = ch_text
                points.append((x, y, ch))
            except ValueError:
                continue

    if not points:
        print("No valid data found.")
        return

    # Compute bounds
    min_x = min(p[0] for p in points)
    max_x = max(p[0] for p in points)
    min_y = min(p[1] for p in points)
    max_y = max(p[1] for p in points)

    width = max_x - min_x + 1
    height = max_y - min_y + 1

    # Build empty grid
    grid = [[" " for _ in range(width)] for _ in range(height)]

    # Fill grid
    for x, y, ch in points:
        nx = x - min_x
        ny = y - min_y
        grid[ny][nx] = ch

    # Print from top (maxY) to bottom (minY)
    for row in reversed(grid):
        print("".join(row))


# Example usage:
# decode_grid("https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub")
