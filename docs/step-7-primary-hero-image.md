# Step 7 — Primary Hero Image Tag

## Objective

Allow a single Cloudinary image tagged `primary` to be used as the home page hero banner background, replacing the static placeholder. If no image is tagged `primary`, the hero falls back to a solid dark background. If more than one image carries the tag, the first is used and a console warning is logged.

---

## New Tag

| Tag       | Where it appears               | Expected count |
|-----------|--------------------------------|----------------|
| `primary` | Home page hero background only | Exactly 1      |

---

## Affected Files

| File           | Change                                                                 |
|----------------|------------------------------------------------------------------------|
| `js/cloudinary.js` | Add a new function `loadPrimaryHeroImage(elementSelector)` that fetches the `primary` tag, validates the result count, and sets the hero background |
| `index.html`   | Call `loadPrimaryHeroImage` on `DOMContentLoaded`; remove the hardcoded `background-image` from the inline style (if any) |
| `css/style.css` | Remove the hardcoded `background-image` URL from `.hero`; ensure the fallback dark background is defined there |

---

## Implementation Plan

### 1. CSS — Remove hardcoded background, define fallback

The `.hero` rule currently sets `background-image` to a picsum URL. That line should be removed. The existing `background-color` of `var(--bg-primary)` (or `#111`) serves as the fallback automatically — no additional CSS is needed.

### 2. `cloudinary.js` — New function `loadPrimaryHeroImage`

**Signature:**
```js
async function loadPrimaryHeroImage(selector)
```

**Behavior:**

1. Call the existing `fetchImagesByTag('primary')` to retrieve the resource list.
2. If the result is empty, do nothing — the CSS fallback dark background shows.
3. If the result contains more than one image, log:
   ```
   [Portfolio] Warning: multiple images tagged "primary". Using the first one.
   ```
4. Take `result[0]`, build a Cloudinary URL using `cloudinaryUrl()` with:
   - `width: 1920`
   - `crop: 'limit'`
   - `quality: 'auto'`
   - `format: 'auto'`
5. Query the DOM for `selector` (e.g. `'.hero'`) and set:
   ```js
   element.style.backgroundImage = `url('${url}')`;
   ```

### 3. `index.html` — Call the new function

Inside the existing `DOMContentLoaded` script block at the bottom of `index.html`, add a call to `loadPrimaryHeroImage('.hero')` alongside the existing `renderGallery` call.

---

## Behavior Summary

| State                          | Result                                      |
|--------------------------------|---------------------------------------------|
| 1 image tagged `primary`       | Image used as hero background               |
| 0 images tagged `primary`      | Hero shows solid dark background (`#111`)   |
| 2+ images tagged `primary`     | First image used; console warning logged    |

---

## Cloudinary Setup

In the Cloudinary Media Library:

1. Upload or locate the photo you want as the hero banner
2. Open the image → **Manage** → **Add tag** → enter `primary`
3. Save — the home page will use it on next load

Only one image should carry this tag at a time. To swap the hero image, remove the `primary` tag from the current image and add it to the new one.

---

## Completion Criteria

- [ ] `.hero` in `style.css` has no hardcoded `background-image`
- [ ] `loadPrimaryHeroImage` is defined in `cloudinary.js`
- [ ] Calling with a valid tag loads and displays the image as the hero background
- [ ] With no `primary` image, the hero displays a solid dark background with no errors
- [ ] With 2+ `primary` images, the first is used and a warning appears in the browser console
- [ ] `index.html` calls `loadPrimaryHeroImage('.hero')` on `DOMContentLoaded`
