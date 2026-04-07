# Step 3 — Home Page

## Objective
Build the landing page with a full-viewport hero section, featured photos grid, and a call-to-action linking to the gallery.

## Sections

### 1. Hero Section
- **Full viewport height** (`100vh`) background image
- **Overlay**: Semi-transparent dark gradient to ensure text readability
- **Content** (centered, loaded from `content.json`):
  - Photographer's name → `site.photographerName`
  - Tagline → `home.heroTagline`
  - CTA button text → `home.heroButtonText`
- **Background image**: Placeholder via `picsum.photos` (high-res, ~1920x1080)
- **Parallax effect** (optional): Slight background-attachment fixed for depth

### 2. Featured Photos Section
- **Heading**: "Featured Work" or similar
- **Layout**: CSS Grid — 2 columns on desktop, 1 on mobile
- **Cards**: Dynamically loaded from Cloudinary `featured` tag/folder
  - Subtle hover zoom effect (CSS `transform: scale(1.03)`)
  - Optional caption overlay on hover
- **Images**: Fetched dynamically via `cloudinary.js` — auto-updates when new photos are uploaded to the `featured` folder
- **Scroll animation**: Elements fade/slide in as user scrolls into view
- **Loading state**: Skeleton/shimmer placeholders while images load from Cloudinary

### 3. Call-to-Action Banner
- **Full-width dark section** with centered text
- **Text**: Loaded from `home.ctaHeading` in `content.json`
- **Button**: Text from `home.ctaButtonText` → links to `gallery.html`
- **Styling**: Accent color border/underline on the button

## Technical Details

### Scroll Reveal Animation (vanilla JS)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
```

### CSS for Reveal
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

## Completion Criteria
- Hero fills the viewport with image, name, tagline, and CTA button
- Featured section shows 4–6 photos in a responsive grid
- Scroll animations trigger as elements come into view
- "View Gallery" and "Go to Gallery" buttons link to `gallery.html`
- Page is fully responsive on mobile
