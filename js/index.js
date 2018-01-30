import ImageIndexJustified from './image-index-justified.js';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.image-index-justified').forEach(function (el) {
    new ImageIndexJustified(el);
  });
});
