/* ============================================
   lightbox.js — Fullscreen image viewer
   with prev/next navigation & keyboard controls
   ============================================ */

const Lightbox = (() => {
  let lightboxEl = null;
  let imgEl = null;
  let currentIndex = 0;
  let images = [];
  let isOpen = false;

  /**
   * Creates the lightbox DOM elements and appends to body.
   * Called once on first open.
   */
  function createLightbox() {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'lightbox';
    lightboxEl.id = 'lightbox';
    lightboxEl.innerHTML = `
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <button class="lightbox-next" aria-label="Next image">&#10095;</button>
      <img class="lightbox-img" src="" alt="">
    `;

    document.body.appendChild(lightboxEl);
    imgEl = lightboxEl.querySelector('.lightbox-img');

    // Event listeners — stopPropagation prevents clicks from reaching the overlay
    lightboxEl.querySelector('.lightbox-close').addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
    lightboxEl.querySelector('.lightbox-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      prev();
    });
    lightboxEl.querySelector('.lightbox-next').addEventListener('click', (e) => {
      e.stopPropagation();
      next();
    });
    imgEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Click outside image to close (only fires on the overlay itself)
    lightboxEl.addEventListener('click', close);

    // Keyboard controls
    document.addEventListener('keydown', handleKeydown);
  }

  function handleKeydown(e) {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowRight':
        next();
        break;
    }
  }

  /**
   * Opens the lightbox with a specific image.
   * @param {number} index - The index of the image to show
   * @param {Array} imageList - Array of Cloudinary image resources
   */
  function open(index, imageList) {
    if (!lightboxEl) createLightbox();

    images = imageList;
    currentIndex = index;
    updateImage();

    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }

  /** Closes the lightbox */
  function close() {
    if (!lightboxEl) return;

    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
    isOpen = false;
  }

  /** Shows the previous image (wraps around) */
  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  /** Shows the next image (wraps around) */
  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  /** Updates the lightbox image src */
  function updateImage() {
    if (!imgEl || images.length === 0) return;

    const image = images[currentIndex];
    const fullUrl = cloudinaryUrl(image.public_id, {
      width: 1920,
      crop: 'limit',
    });

    imgEl.src = fullUrl;
    imgEl.alt = image.public_id.split('/').pop().replace(/[-_]/g, ' ');
  }

  return { open, close, prev, next };
})();
