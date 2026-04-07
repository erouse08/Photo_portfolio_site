# Step 5 — About Page

## Objective
Build the About page with a two-column layout featuring a photographer portrait and bio text.

## Sections

### 1. Page Header
- **Title**: "About" — large centered heading consistent with gallery page styling

### 2. Bio Section (Two-Column Layout)
All text loaded dynamically from `content.json` → `about` section:
- **Left column** (40% width): Portrait/headshot image
  - Placeholder image from `picsum.photos`
  - Slightly rounded corners or no border — clean look
  - Full width within its column
- **Right column** (60% width): Bio content (from `content.json`)
  - **Name** → `about.name`
  - **Bio paragraphs** → `about.bio` (array of paragraphs, rendered as `<p>` tags)
  - **Specialties** → `about.specialties`
  - **Location** → `about.location`
- **Mobile**: Stacks vertically — image on top, text below

### 3. Details / Highlights
- Loaded from `content.json`:
  - Location → `about.location`
  - Specialties → `about.specialties`
- Styled as subtle, secondary text

### 4. Contact CTA
- **Heading** → `about.contactHeading`
- **Button text** → `about.contactButtonText`
- **Email** → `about.contactEmail` (used in `mailto:` link)
- Consistent with CTA styling from the home page

## HTML Structure
```html
<section class="about-bio">
  <div class="about-image">
    <img src="placeholder" alt="Photographer portrait">
  </div>
  <div class="about-text">
    <h2>Your Name</h2>
    <p>Bio paragraph 1...</p>
    <p>Bio paragraph 2...</p>
  </div>
</section>

<section class="about-contact">
  <h2>Get in Touch</h2>
  <a href="mailto:you@email.com" class="btn">Say Hello</a>
</section>
```

## CSS Details
```css
.about-bio {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 60px;
  align-items: start;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px;
}

@media (max-width: 768px) {
  .about-bio {
    grid-template-columns: 1fr;
  }
}
```

## Completion Criteria
- Two-column layout displays correctly on desktop
- Layout stacks properly on mobile
- Placeholder image and bio text are present and easily replaceable
- Contact CTA section with email link is styled consistently
- Page matches the overall dark, minimalist aesthetic
