/* ============================================
   content.js — Loads content.json and injects
   text into HTML elements via data-content attrs
   ============================================ */

/**
 * Fetches content.json and returns the parsed object.
 * Cached after first load so multiple calls don't re-fetch.
 */
let _contentCache = null;

async function loadContent() {
  if (_contentCache) return _contentCache;

  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error(`Failed to load content.json: ${response.status}`);
    _contentCache = await response.json();
    return _contentCache;
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

/**
 * Resolves a dot-notation path (e.g., "site.photographerName")
 * against the content object.
 */
function getContentValue(content, path) {
  return path.split('.').reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : null;
  }, content);
}

/**
 * Finds all elements with [data-content] attributes and
 * injects the corresponding value from content.json.
 *
 * Usage in HTML:
 *   <h1 data-content="site.photographerName"></h1>
 *   <p data-content="home.heroTagline"></p>
 *   <a data-content-href="site.instagramUrl" data-content="site.photographerName"></a>
 *
 * For arrays (like about.bio), it renders each item as a <p> tag.
 */
async function populateContent() {
  const content = await loadContent();
  if (!content) return;

  // Populate text content
  document.querySelectorAll('[data-content]').forEach(el => {
    const path = el.getAttribute('data-content');
    const value = getContentValue(content, path);

    if (value === null) return;

    // If the value is an array, render each item as a <p>
    if (Array.isArray(value)) {
      el.innerHTML = value.map(item => `<p>${item}</p>`).join('');
    } else {
      el.textContent = value;
    }
  });

  // Populate href attributes (e.g., Instagram URL, mailto links)
  document.querySelectorAll('[data-content-href]').forEach(el => {
    const path = el.getAttribute('data-content-href');
    const value = getContentValue(content, path);

    if (value === null) return;

    // Auto-detect mailto links
    if (path.toLowerCase().includes('email') && !value.startsWith('mailto:')) {
      el.setAttribute('href', `mailto:${value}`);
    } else {
      el.setAttribute('href', value);
    }
  });
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', populateContent);
