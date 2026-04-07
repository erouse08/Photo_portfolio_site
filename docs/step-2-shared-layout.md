# Step 2 — Shared Layout (Navigation + Footer)

## Objective
Build the fixed navigation bar and footer that appear on every page, including responsive mobile hamburger menu.

## Navigation Bar

### Desktop Layout
```
[Your Name / Logo]                    [Home] [Gallery] [About] [Instagram Icon]
```

- **Position**: Fixed to top of viewport, stays visible on scroll
- **Background**: Semi-transparent dark (`rgba(17, 17, 17, 0.95)`) with subtle backdrop blur
- **Logo/Name**: Left-aligned, loaded from `content.json` → `site.photographerName`, links back to `index.html`
- **Nav links**: Right-aligned, horizontal list
- **Instagram**: SVG icon, URL loaded from `content.json` → `site.instagramUrl`, opens in a new tab (`target="_blank"`)
- **Active state**: Underline or highlight on the current page link
- **Hover effect**: Subtle color shift or underline animation on links

### Mobile Layout (< 768px)
- Hamburger icon replaces nav links
- Clicking toggles a full-screen or slide-in overlay menu
- Menu items stacked vertically, centered
- Close button (X) to dismiss

## Footer

### Content
```
© 2026 [Your Name]. All rights reserved.        [Instagram Icon] [Email Icon]
```

- **Copyright text**: Loaded from `content.json` → `footer.copyright`
- **Instagram URL**: Loaded from `content.json` → `site.instagramUrl`
- **Background**: Slightly lighter than page background (`--bg-secondary`)
- **Layout**: Centered text with social icons
- **Spacing**: Generous padding top and bottom

## Technical Details

### HTML Structure (repeated on each page)
```html
<header class="navbar">
  <a href="index.html" class="nav-logo">Your Name</a>
  <button class="nav-toggle" aria-label="Toggle menu">
    <span class="hamburger"></span>
  </button>
  <nav class="nav-menu">
    <a href="index.html" class="nav-link">Home</a>
    <a href="gallery.html" class="nav-link">Gallery</a>
    <a href="about.html" class="nav-link">About</a>
    <a href="https://instagram.com/yourhandle" class="nav-link nav-instagram" target="_blank">
      <svg>...</svg>
    </a>
  </nav>
</header>
```

### JavaScript
- **content.js**: On page load, fetches `content.json` and populates the nav logo name, Instagram URL, and footer copyright
- **main.js**: Toggle `.active` class on nav menu when hamburger is clicked, close menu when a nav link is clicked, optional hide/show navbar on scroll direction

## Completion Criteria
- Nav bar is fixed and visible on all three pages
- All links navigate correctly between pages
- Instagram icon opens external link in new tab
- Hamburger menu works on mobile viewport widths
- Footer appears at the bottom of every page
