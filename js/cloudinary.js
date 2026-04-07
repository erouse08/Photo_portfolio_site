/* ============================================
   cloudinary.js — Fetch & render images from
   Cloudinary using the Resource List API
   ============================================ */

const CLOUD_NAME = 'drijkt0we';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image`;

/**
 * Cloudinary image URL builder with transformations.
 * @param {string} publicId - The image public ID from Cloudinary
 * @param {object} options - Transformation options
 * @returns {string} The full Cloudinary image URL
 */
function cloudinaryUrl(publicId, options = {}) {
  const {
    width = null,
    height = null,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  const transforms = [];
  if (crop) transforms.push(`c_${crop}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);

  const transformStr = transforms.join(',');
  return `${BASE_URL}/upload/${transformStr}/${publicId}`;
}

/**
 * Fetches the list of images for a given tag from Cloudinary.
 * Requires "Resource List" to be enabled in Cloudinary Settings > Security.
 *
 * @param {string} tag - The tag to fetch images for (e.g., "gallery", "featured")
 * @returns {Promise<Array>} Array of image resource objects
 */
async function fetchImagesByTag(tag) {
  try {
    const response = await fetch(`${BASE_URL}/list/${tag}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images for tag "${tag}": ${response.status}`);
    }
    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    return [];
  }
}

/**
 * Renders a grid of images into a container element.
 *
 * @param {string} containerId - The ID of the container element
 * @param {string} tag - The Cloudinary tag to fetch images from
 * @param {object} options - Configuration options
 * @param {number} options.thumbWidth - Thumbnail width (default: 600)
 * @param {number} options.fullWidth - Lightbox full-size width (default: 1920)
 * @param {boolean} options.showOverlay - Show hover overlay with title (default: true)
 * @param {function} options.onClick - Callback when an image is clicked
 */
async function renderGallery(containerId, tag, options = {}) {
  const {
    thumbWidth = 600,
    fullWidth = 1920,
    showOverlay = true,
    onClick = null,
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return [];
  }

  // Show skeleton loading state
  container.innerHTML = Array(6).fill('')
    .map(() => '<div class="gallery-item skeleton" style="aspect-ratio: 4/3;"></div>')
    .join('');

  // Fetch images from Cloudinary
  const images = await fetchImagesByTag(tag);

  if (images.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-secondary);">No photos found. Upload images to Cloudinary and tag them as "' + tag + '".</p>';
    return [];
  }

  // Clear skeleton and render actual images
  container.innerHTML = '';

  images.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    // Extract a display name from the public_id (remove folder prefix, replace dashes/underscores)
    const displayName = image.public_id
      .split('/').pop()
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    item.setAttribute('aria-label', displayName);

    const thumbUrl = cloudinaryUrl(image.public_id, {
      width: thumbWidth,
      crop: 'fill',
    });

    const fullUrl = cloudinaryUrl(image.public_id, {
      width: fullWidth,
      crop: 'limit',
    });

    item.innerHTML = `
      <img src="${thumbUrl}" alt="${displayName}" loading="lazy" data-full="${fullUrl}">
      ${showOverlay ? `
        <div class="gallery-overlay">
          <span class="gallery-title">${displayName}</span>
        </div>
      ` : ''}
    `;

    if (onClick) {
      item.addEventListener('click', () => onClick(index, images));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(index, images);
        }
      });
    }

    container.appendChild(item);
  });

  return images;
}

/**
 * Fetches the image tagged "primary" and sets it as the background of the
 * given element. Falls back to the CSS background-color if no image is found.
 * Logs a warning if more than one image carries the "primary" tag.
 *
 * @param {string} selector - CSS selector for the hero element (e.g. '.hero')
 */
async function loadPrimaryHeroImage(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`[Portfolio] loadPrimaryHeroImage: element "${selector}" not found`);
    return;
  }

  const images = await fetchImagesByTag('primary');

  if (images.length === 0) return;

  if (images.length > 1) {
    console.warn(`[Portfolio] Warning: ${images.length} images tagged "primary". Using the first one.`);
  }

  const url = cloudinaryUrl(images[0].public_id, {
    width: 1920,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  });

  element.style.backgroundImage = `url('${url}')`;
}
