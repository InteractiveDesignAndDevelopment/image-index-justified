(function(){
  'use strict';

  var galleries,
    containers,
    boxes,
    styleTagOptionsWrapper;

  document.addEventListener('DOMContentLoaded', onLoad);

  function onLoad() {
    populateVariables();
    recordIntialClasses();
    style();
    watchForOptionChanges();
  }

  function populateVariables() {
    galleries = document.querySelectorAll('.iij-Gallery');
    containers = document.querySelectorAll('.iij-Container');
    boxes = document.querySelectorAll('.iij-Box');
    styleTagOptionsWrapper = document.getElementById('style-tag-options-wrapper');
  }

  function recordIntialClasses() {
    var el,
      klass;

    for (var i = 0; i < galleries.length; ++i) {
      el = galleries[i];
      klass = el.getAttribute('class');
      el.setAttribute('data-initial-class', klass);
    }

    for (var i = 0; i < containers.length; ++i) {
      el = containers[i];
      klass = el.getAttribute('class');
      el.setAttribute('data-initial-class', klass);
    }

    for (var i = 0; i < boxes.length; ++i) {
      el = boxes[i];
      klass = el.getAttribute('class');
      el.setAttribute('data-initial-class', klass);
    }
  }

  function revertToIntialClasses() {
    var el,
      initialClass;

    for (var i = 0; i < galleries.length; ++i) {
      el = galleries[i];
      initialClass = el.getAttribute('data-initial-class');
      el.setAttribute('class', initialClass);
    }

    for (var i = 0; i < containers.length; ++i) {
      el = containers[i];
      initialClass = el.getAttribute('data-initial-class');
      el.setAttribute('class', initialClass);
    }

    for (var i = 0; i < boxes.length; ++i) {
      el = boxes[i];
      initialClass = el.getAttribute('data-initial-class');
      el.setAttribute('class', initialClass);
    }
  }

  function style() {
    var imageIndexClassesInput = document.getElementById('classes-image-index'),
      imageIndexClasses = imageIndexClassesInput.value.split(/\s+/),
      photoClassesInput = document.getElementById('classes-photo'),
      photoClasses = photoClassesInput.value.split(/\s+/),
      titleClassesInput = document.getElementById('classes-title'),
      titleClasses = titleClassesInput.value.split(/\s+/),
      descriptionClassesInput = document.getElementById('classes-description'),
      descriptionClasses = descriptionClassesInput.value.split(/\s+/);

    // console.dir(imageIndexClasses);
    // console.dir(photoClasses);
    // console.dir(titleClasses);
    // console.dir(descriptionClasses);

    classOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses);
    styleTagOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses);
    attributeOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses);

    window.imageIndexJustified.layoutGalleries(true);
  }

  function hexToRgba(hex) {
    var r,
      g,
      b,
      a;
    hex = hex.replace('#', '');
    if (3 === hex.length) {
      r = hex.charAt(0);
      g = hex.charAt(1);
      b = hex.charAt(2);
    } else if (4 === hex.length) {
      r = hex.charAt(0);
      g = hex.charAt(1);
      b = hex.charAt(2);
      a = hex.charAt(3);
    } else if (6 === hex.length) {
      r = hex.substring(0, 2);
      g = hex.substring(2, 4);
      b = hex.substring(4, 6);
    } else if (8 === hex.length) {
      r = hex.substring(0, 2);
      g = hex.substring(2, 4);
      b = hex.substring(4, 6);
      a = hex.substring(6, 8);
    } else {
      return '';
    }
    if ('undefined' === typeof a) {
      a = 'ff';
    }
    if (1 === r.length) {
      r += r;
    }
    if (1 === g.length) {
      g += g;
    }
    if (1 === b.length) {
      b += b;
    }
    if (1 === a.length) {
      a += a;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    a = parseInt(a, 16) / 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

   ██████ ██       █████  ███████ ███████
  ██      ██      ██   ██ ██      ██
  ██      ██      ███████ ███████ ███████
  ██      ██      ██   ██      ██      ██
   ██████ ███████ ██   ██ ███████ ███████

  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  function classOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses) {
    revertToIntialClasses();

    imageIndexClasses.filter(function(klass) {
      return 0 === klass.indexOf('theme-');
    }).forEach(function(klass) {
      // Remove any existing themes
      for (var i = 0; i < galleries.length; ++i) {
        for (var j = 0; j < galleries[i].classList.length; ++j) {
          if (-1 < galleries[i].classList[j].indexOf('theme-')) {
            galleries[i].classList.remove(galleries[i].classList[j]);
          }
        }
      }
      for (var i = 0; i < containers.length; ++i) {
        for (var j = 0; j < containers[i].classList.length; ++j) {
          if (-1 < containers[i].classList[j].indexOf('theme-')) {
            containers[i].classList.remove(containers[i].classList[j]);
          }
        }
      }
      for (var i = 0; i < boxes.length; ++i) {
        for (var j = 0; j < boxes[i].classList.length; ++j) {
          if (-1 < boxes[i].classList[j].indexOf('theme-')) {
            boxes[i].classList.remove(boxes[i].classList[j]);
          }
        }
      }
      // Style class pattern: theme-camelCase
      // console.log(klass.split('-'));
      klass = klass.split('-').reduce(function(result, val, i) {
        // console.log(val);
        if (0 === i) {
          return result + 'theme-';
        } else if (1 === i) {
          return result + val.toLowerCase();
        } else {
          return result +
            val.substring(0, 1).toUpperCase() +
            val.substring(1, val.length).toLowerCase();
        }
      }, '');
      // console.log(klass);
      // Add the new theme
      for (var i = 0; i < galleries.length; ++i) {
        galleries[i].classList.add(klass);
      }
      for (var i = 0; i < containers.length; ++i) {
        containers[i].classList.add(klass);
      }
      for (var i = 0; i < boxes.length; ++i) {
        boxes[i].classList.add(klass);
      }
    });

    if (0 <= titleClasses.indexOf('visible')) {
      for (var i = 0; i < boxes.length; ++i) {
        boxes[i].classList.add('is-title-visible');
      }
    }

    if (0 <= descriptionClasses.indexOf('visible')) {
      for (var i = 0; i < boxes.length; ++i) {
        boxes[i].classList.add('is-description-visible');
      }
    }
  }

  /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  ███████ ████████ ██    ██ ██      ███████     ████████  █████   ██████
  ██         ██     ██  ██  ██      ██             ██    ██   ██ ██
  ███████    ██      ████   ██      █████          ██    ███████ ██   ███
       ██    ██       ██    ██      ██             ██    ██   ██ ██    ██
  ███████    ██       ██    ███████ ███████        ██    ██   ██  ██████

  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  function styleTagOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses) {
    var style = [];

    style.push('<style>');

    imageIndexClasses.filter(function(klass) {
      return 0 === klass.indexOf('background-color-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length - 1];
      style.push('.iij-Container {');
      style.push('background-color: '+hexToRgba(val)+' !important;');
      style.push('}');
    });

    photoClasses.filter(function(klass) {
      return 0 === klass.indexOf('caption-background-color-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length -1];
      style.push('.iij-Box-caption {');
      style.push('background-color: '+hexToRgba(val)+' !important;');
      style.push('}');
    });

    titleClasses.filter(function(klass) {
      return 0 === klass.indexOf('color-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length -1];
      style.push('.iij-Box-title {');
      style.push('color: '+hexToRgba(val)+' !important;');
      style.push('}');
    });

    titleClasses.filter(function(klass) {
      return 0 === klass.indexOf('size-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length -1];
      style.push('.iij-Box-title {');
      style.push('font-size: '+val+'px !important;');
      style.push('}');
    });

    descriptionClasses.filter(function(klass) {
      return 0 === klass.indexOf('color-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length -1];
      style.push('.iij-Box-description {');
      style.push('color: '+hexToRgba(val)+' !important;');
      style.push('}');
    });

    descriptionClasses.filter(function(klass) {
      return 0 === klass.indexOf('size-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length -1];
      style.push('.iij-Box-description {');
      style.push('font-size: '+val+'px !important;');
      style.push('}');
    });

    style.push('</style>');

    // console.log(style);
    styleTagOptionsWrapper.innerHTML = style.join('\n');
  }

  /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

   █████  ████████ ████████ ██████  ██ ██████  ██    ██ ████████ ███████ ███████
  ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██      ██
  ███████    ██       ██    ██████  ██ ██████  ██    ██    ██    █████   ███████
  ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██           ██
  ██   ██    ██       ██    ██   ██ ██ ██████   ██████     ██    ███████ ███████

  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  function attributeOptions(imageIndexClasses, photoClasses, titleClasses, descriptionClasses) {

    for (var i = 0; i < galleries.length; ++i) {
      galleries[i].removeAttribute('data-container-padding');
      galleries[i].removeAttribute('data-target-row-height');
      galleries[i].removeAttribute('data-full-width-breakout-row-cadence');
      galleries[i].removeAttribute('data-box-spacing');
    }

    imageIndexClasses.filter(function(klass) {
      return 0 === klass.indexOf('spacing-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length - 1];
      for (var i = 0; i < galleries.length; ++i) {
        galleries[i].setAttribute('data-container-padding', val);
      }
    });

    imageIndexClasses.filter(function(klass) {
      return 0 === klass.indexOf('target-row-height-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length - 1];
      for (var i = 0; i < galleries.length; ++i) {
        galleries[i].setAttribute('data-target-row-height', val);
      }
    });

    imageIndexClasses.filter(function(klass) {
      return 0 === klass.indexOf('full-width-breakout-row-cadence-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length - 1];
      for (var i = 0; i < galleries.length; ++i) {
        galleries[i].setAttribute('data-full-width-breakout-row-cadence', val);
      }
    });

    photoClasses.filter(function(klass) {
      return 0 === klass.indexOf('spacing-');
    }).forEach(function(klass) {
      var val = klass.split('-')[klass.split('-').length - 1];
      for (var i = 0; i < galleries.length; ++i) {
        galleries[i].setAttribute('data-box-spacing', val);
      }
    });

  }

  function watchForOptionChanges() {
    var options = document.getElementById('options');
    options.addEventListener('keyup', style);
  }

})();
