export default class ImageIndexJustified {
  constructor(el) {
    this.element = el;
    this.instanceID = this.element.getAttribute('data-instance-id');
    this.gallery = el.querySelector('.image-index-justified__gallery');

    // Justified Layout
    this.layoutBoxes();

    // The smartPhoto really needs a selector; nothing else will do
    this.smartPhoto = new smartPhoto(`#${this.element.id} .image-index-justified-figure__link`);

    // Throttle on resize
    this.isThrottleAvailable = true;
    this.isThrottleQueued = false;
    this.throttleTimeout = 300;

    window.addEventListener('resize', () => this.throttle());
  }

  cssBoxRule (id, properties) {
    let width    = properties.width,
      height     = properties.height,
      xTranslate = properties.left,
      yTranslate = properties.top;

    return `#${id} {
      width: ${width}px;
      height: ${height}px;
      transform: translate(${xTranslate}px, ${yTranslate}px);
    }`;
  }

  cssBoxRules (geometry) {
    let rules = '';
    geometry.boxes.forEach((properties, i) => {
      let boxID = `image-index-justified-${this.instanceID}-figure-${i}`;
      rules += this.cssBoxRule(boxID, properties);
    });
    return rules;
  }

  cssGeometryRules (geometry) {
    let rules = '';
    rules += `#image-index-justified-${this.instanceID}-gallery {
      height: ${geometry.containerHeight}px;
    }`;
    rules += this.cssBoxRules(geometry);
    return rules;
  }

  justifiedLayoutAspectRatios () {
    let aspectRatios = this.element.getAttribute('data-image-aspect-ratios')
      .split(',')
      .map(function(ratio) { return parseFloat(ratio) });
    return aspectRatios;
  }

  justifiedLayoutOptions () {
    let options = {},
      containerPadding            = this.element.getAttribute('data-container-padding'),
      boxSpacing                  = this.element.getAttribute('data-box-spacing'),
      targetRowHeight             = this.element.getAttribute('data-target-row-height'),
      fullWidthBreakoutRowCadence = this.element.getAttribute('data-full-width-breakout-row-cadence');

    if (null !== containerPadding) {
      options.containerPadding = parseInt(containerPadding);
    }

    if (null !== boxSpacing) {
      options.boxSpacing = parseInt(boxSpacing);
    }

    if (null !== targetRowHeight) {
      options.targetRowHeight = parseInt(targetRowHeight);
    }

    if (null !== fullWidthBreakoutRowCadence) {
      if (! isNaN(fullWidthBreakoutRowCadence)) {
        options.fullWidthBreakoutRowCadence = parseInt(fullWidthBreakoutRowCadence);
      } else {
        if (-1 < fullWidthBreakoutRowCadence.toLowerCase().indexOf('true')) {
          options.fullWidthBreakoutRowCadence = true;
        } else {
          options.fullWidthBreakoutRowCadence = false;
        }
      }
    }

    options.containerWidth = this.gallery.clientWidth;

    // console.log('==========');
    //
    // console.log(`gallery client width = ${this.gallery.clientWidth}`);
    // console.log(`window inner width = ${window.innerWidth}`);
    //
    // this.gallery.style.height = '101vh';
    // console.log('----------');
    //
    // console.log(`gallery client width = ${this.gallery.clientWidth}`);
    // console.log(`window inner width = ${window.innerWidth}`);
    //
    // this.gallery.style.height = 'auto';
    // console.log('----------');
    //
    // console.log(`gallery client width = ${this.gallery.clientWidth}`);
    // console.log(`window inner width = ${window.innerWidth}`);
    //
    // console.log('==========');

    return options;
  }

  layoutBoxes () {
    let styleTag = document.getElementById(`image-index-justified-${this.instanceID}-geometry-style`),
      geometry = JustifiedLayout(this.justifiedLayoutAspectRatios(), this.justifiedLayoutOptions()),
      galleryClientWidth = this.gallery.clientWidth;
    styleTag.innerHTML = this.cssGeometryRules(geometry);
    // If the gallery causes scroll bars, do it again
    // This need not loop
    if (galleryClientWidth !== this.gallery.clientWidth) {
      geometry = JustifiedLayout(this.justifiedLayoutAspectRatios(), this.justifiedLayoutOptions());
      styleTag.innerHTML = this.cssGeometryRules(geometry);
    }
  }

  throttle () {
    if (this.isThrottleAvailable) {
      this.layoutBoxes();
      this.isThrottleAvailable = false;
      setTimeout(() => {
        this.isThrottleAvailable = true;
        if (this.isThrottleQueued) {
          this.isThrottleQueued = false;
          this.layoutBoxes();
        }
      }, this.throttleTimeout);
    } else {
      this.isThrottleQueued = true;
    }
  }
}
