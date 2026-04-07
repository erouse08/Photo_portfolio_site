# Step 1 — Project Scaffold

## Objective
Set up the folder structure, create all empty starter files, and add placeholder images so the project is ready for development.

## Folder Structure

```
Photo_portfolio_site/
├── index.html          # Home page
├── gallery.html        # Gallery page
├── about.html          # About page
├── content.json        # Editable text content for all pages (no code changes needed)
├── css/
│   └── style.css       # Single stylesheet for all pages
├── js/
│   ├── main.js         # Mobile nav, scroll animations, shared utilities
│   ├── content.js      # Loads content.json and populates text on each page
│   ├── cloudinary.js   # Cloudinary API integration (fetch images dynamically)
│   └── lightbox.js     # Lightbox viewer logic
├── images/
│   └── (local assets only — portrait, hero fallback, site logo)
└── docs/
    └── (implementation step documents)
```

## Cloudinary Configuration

- **Cloud Name**: `drijkt0we`
- **Folders to create in Cloudinary Media Library**:
  - `gallery` — all gallery photos
  - `featured` — photos for the home page featured section
- **API used**: Cloudinary Client-Side Resources List (no API key needed)
  - Endpoint: `https://res.cloudinary.com/drijkt0we/image/list/{tag}.json`
  - OR use the Auto-Upload + Fetch API for public folder listing
- **Image delivery URL pattern**: `https://res.cloudinary.com/drijkt0we/image/upload/{transformations}/{public_id}`

## Tasks

1. **Create directories**: `css/`, `js/`, `images/`
2. **Create HTML files**: `index.html`, `gallery.html`, `about.html` — each with a basic HTML5 boilerplate
3. **Create `content.json`**: Single JSON file with all editable text (see below)
4. **Create CSS file**: `css/style.css` — with CSS reset and base variables (colors, fonts, spacing)
5. **Create JS files**:
   - `js/main.js` — DOMContentLoaded listener, mobile nav, scroll animations
   - `js/content.js` — fetches `content.json` and injects text into HTML elements via `data-content` attributes
   - `js/cloudinary.js` — functions to fetch and render images from Cloudinary
   - `js/lightbox.js` — fullscreen image viewer
6. **Placeholder images**: Use `picsum.photos` URLs initially; will be replaced by Cloudinary URLs once photos are uploaded

## content.json Structure

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
    "heading": "About",
    "name": "Your Name",
    "bio": [
      "First paragraph about your background and journey into photography...",
      "Second paragraph about your style, approach, and what inspires you...",
      "Third paragraph about your experience, exhibitions, or press..."
    ],
    "specialties": "Landscape | Portrait | Street",
    "location": "Your City, Country",
    "contactHeading": "Get in Touch",
    "contactButtonText": "Say Hello",
    "contactEmail": "you@email.com"
  },
  "footer": {
    "copyright": "© 2026 Your Name. All rights reserved."
  }
}
```

**How to update**: Open `content.json` in any text editor, change the text, save. The website loads it on every page visit — no recompilation needed.

## CSS Variables to Define

```css
:root {
  --bg-primary: #111;
  --bg-secondary: #1a1a1a;
  --text-primary: #fff;
  --text-secondary: #aaa;
  --accent: #e0c97f;       /* subtle gold accent */
  --font-main: 'Inter', sans-serif;
  --transition-speed: 0.3s;
  --nav-height: 70px;
}
```

## Completion Criteria
- All folders and files exist
- HTML files have valid boilerplate linking to `style.css` and `main.js`
- CSS file has reset styles and variables defined
- Project can be opened in a browser without errors
