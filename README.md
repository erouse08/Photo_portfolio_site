# Photography Portfolio

A minimal, dark-themed photography portfolio built with vanilla HTML, CSS, and JavaScript. Images are hosted and served via Cloudinary — no backend required.

---

## Project Structure

```
Photo_portfolio_site/
├── index.html          # Home page (hero + featured work + CTA)
├── gallery.html        # Full gallery page
├── about.html          # About / contact page
├── content.json        # All editable site text (no code changes needed)
├── css/
│   └── style.css       # Single stylesheet for all pages
├── js/
│   ├── main.js         # Mobile nav, scroll animations, shared utilities
│   ├── content.js      # Loads content.json and injects text via data-content attrs
│   ├── cloudinary.js   # Cloudinary fetch + render functions
│   └── lightbox.js     # Fullscreen image viewer
└── docs/
    └── step-*.md       # Implementation step documentation
```

---

## Customizing Site Content

All page text is stored in `content.json`. Open it in any text editor and update the values — no code changes needed. The site fetches it fresh on every page load.

```json
{
  "site": {
    "photographerName": "Your Name",
    "instagramUrl": "https://instagram.com/yourhandle"
  },
  "home": {
    "heroTagline": "Capturing Moments",
    "heroButtonText": "View Gallery",
    "featuredHeading": "Featured Work",
    "ctaHeading": "Explore the full collection",
    "ctaButtonText": "Go to Gallery"
  },
  "about": {
    "name": "Your Name",
    "bio": [
      "First paragraph...",
      "Second paragraph...",
      "Third paragraph..."
    ],
    "specialties": "Landscape | Portrait | Street",
    "location": "Your City, Country",
    "contactEmail": "you@email.com"
  },
  "footer": {
    "copyright": "© 2026 Your Name. All rights reserved."
  }
}
```

---

## Cloud Image Hosting (Cloudinary)

Images are served via [Cloudinary](https://cloudinary.com). The site uses the public **Resource List API** — no API key or backend is required.

**Cloud name:** `drijkt0we`

### How it works

When a page loads, `cloudinary.js` fetches a tag-based image list:

```
https://res.cloudinary.com/drijkt0we/image/list/{tag}.json
```

Image tagged `primary` will be the banner image on the landing page (NOTE: one 1 image should contain this tag). Images tagged `gallery` appear on the Gallery page. Images tagged `featured` appear in the Featured Work section on the Home page. The response is a JSON array of image resources; the site builds thumbnail URLs with Cloudinary's on-the-fly transform API and renders them into the grid.

### Enable the Resource List API

This must be enabled once in your Cloudinary account before the site can fetch images:

1. Log in to [cloudinary.com](https://cloudinary.com) and go to **Settings → Security**
2. Under **Resource list**, uncheck **Restricted media types**
3. Save

Without this, the API returns a 401 and the gallery shows an empty state.

### Uploading and Tagging Images

#### Option A — Cloudinary Media Library (recommended)

1. Go to **Media Library** in the Cloudinary dashboard
2. Click **Upload** and select your photos
3. After upload, select one or more images and click **Manage** → **Add tag**
4. Enter `primary` (for landing page banner), `gallery` (for the gallery page) or `featured` (for the home page featured section)
5. Save — the image appears on the site immediately on next page load

#### Option B — Bulk upload via the Cloudinary CLI

```bash
# Install the CLI
npm install -g cloudinary-cli

# Configure with your credentials
cld config --cloud_name drijkt0we --api_key YOUR_KEY --api_secret YOUR_SECRET

# Upload a folder and tag all images
cld uploader upload_dir ./my-photos --tags gallery
```

#### Option C — Drag-and-drop upload widget

Images can also be uploaded directly from the Cloudinary Media Library by dragging files onto the browser window.

### Image Tags Reference

| Tag        | Where it appears                         |
|------------|------------------------------------------|
| `gallery`  | Gallery page — full photo grid           |
| `featured` | Home page — Featured Work section (shows up to 4 images by default) |

### Image Transform Parameters

Cloudinary transforms are applied automatically in `cloudinary.js`:

| Context         | Width   | Crop mode | Quality  | Format |
|-----------------|---------|-----------|----------|--------|
| Gallery thumbs  | 600px   | fill      | auto     | auto   |
| Featured thumbs | 800px   | fill      | auto     | auto   |
| Lightbox full   | 1920px  | limit     | auto     | auto   |

`q_auto` and `f_auto` let Cloudinary choose the best quality and format (WebP, AVIF, etc.) per browser.

---

## Running Locally

Because `content.js` and `cloudinary.js` use `fetch()` to load files and call APIs, the site **cannot be opened directly from the filesystem** (`file://` protocol blocks cross-origin requests). You need a local HTTP server.

### Option 1 — VS Code Live Server (easiest)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Right-click `index.html` in the Explorer panel → **Open with Live Server**
3. The site opens at `http://127.0.0.1:5500` and auto-reloads on file save

### Option 2 — Python (no install required)

```bash
# From the project root
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Option 3 — Node.js serve

```bash
npx serve .
```

Then open the URL printed in the terminal (usually `http://localhost:3000`).

### Debugging tips

- **Gallery shows "No photos found"** — check that the Resource List API is enabled in Cloudinary Settings → Security, and that images have the correct tag (`gallery` or `featured`).
- **content.json not loading** — make sure you're running a local server, not opening the HTML file directly from disk.
- **Images not updating after upload** — Cloudinary's resource list endpoint can be cached by the browser for a few minutes. Hard-refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) or open in a private window.
- **Console errors about CORS** — ensure the Cloudinary cloud name in `cloudinary.js` line 6 matches your account's cloud name exactly.

---

## Pages

| Page           | File           | Description                                      |
|----------------|----------------|--------------------------------------------------|
| Home           | `index.html`   | Hero image, Featured Work grid, CTA section      |
| Gallery        | `gallery.html` | Full responsive photo grid with lightbox viewer  |
| About          | `about.html`   | Two-column bio layout with contact CTA           |

---

## Design Tokens

Defined as CSS variables in `style.css`:

```css
--bg-primary:    #111        /* page background */
--bg-secondary:  #1a1a1a     /* card / section backgrounds */
--text-primary:  #fff
--text-secondary:#aaa
--accent:        #e0c97f     /* gold highlight color */
--nav-height:    70px
--transition-speed: 0.3s
```

---

## Responsive Breakpoints

| Breakpoint      | Layout changes                                              |
|-----------------|-------------------------------------------------------------|
| > 1200px        | Full layout, 3-column gallery grid                          |
| 769px – 1200px  | 2-column gallery, slightly reduced spacing                  |
| < 768px         | 1-column layout, hamburger nav, stacked about section       |
