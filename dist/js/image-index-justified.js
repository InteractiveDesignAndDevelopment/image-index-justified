(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageIndexJustified = function () {
  function ImageIndexJustified(el) {
    var _this = this;

    _classCallCheck(this, ImageIndexJustified);

    this.element = el;
    this.instanceID = this.element.getAttribute('data-instance-id');
    this.gallery = el.querySelector('.image-index-justified__gallery');

    // Justified Layout
    this.layoutBoxes();

    // The smartPhoto really needs a selector; nothing else will do
    this.smartPhoto = new smartPhoto('#' + this.element.id + ' .image-index-justified-figure__link');

    // Throttle on resize
    this.isThrottleAvailable = true;
    this.isThrottleQueued = false;
    this.throttleTimeout = 300;

    window.addEventListener('resize', function () {
      return _this.throttle();
    });
  }

  _createClass(ImageIndexJustified, [{
    key: 'cssBoxRule',
    value: function cssBoxRule(id, properties) {
      var width = properties.width,
          height = properties.height,
          xTranslate = properties.left,
          yTranslate = properties.top;

      return '#' + id + ' {\n      width: ' + width + 'px;\n      height: ' + height + 'px;\n      transform: translate(' + xTranslate + 'px, ' + yTranslate + 'px);\n    }';
    }
  }, {
    key: 'cssBoxRules',
    value: function cssBoxRules(geometry) {
      var _this2 = this;

      var rules = '';
      geometry.boxes.forEach(function (properties, i) {
        var boxID = 'image-index-justified-' + _this2.instanceID + '-figure-' + i;
        rules += _this2.cssBoxRule(boxID, properties);
      });
      return rules;
    }
  }, {
    key: 'cssGeometryRules',
    value: function cssGeometryRules(geometry) {
      var rules = '';
      rules += '#image-index-justified-' + this.instanceID + '-gallery {\n      height: ' + geometry.containerHeight + 'px;\n    }';
      rules += this.cssBoxRules(geometry);
      return rules;
    }
  }, {
    key: 'justifiedLayoutAspectRatios',
    value: function justifiedLayoutAspectRatios() {
      var aspectRatios = this.element.getAttribute('data-image-aspect-ratios').split(',').map(function (ratio) {
        return parseFloat(ratio);
      });
      return aspectRatios;
    }
  }, {
    key: 'justifiedLayoutOptions',
    value: function justifiedLayoutOptions() {
      var options = {},
          containerPadding = this.element.getAttribute('data-container-padding'),
          boxSpacing = this.element.getAttribute('data-box-spacing'),
          targetRowHeight = this.element.getAttribute('data-target-row-height'),
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
        if (!isNaN(fullWidthBreakoutRowCadence)) {
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
  }, {
    key: 'layoutBoxes',
    value: function layoutBoxes() {
      var styleTag = document.getElementById('image-index-justified-' + this.instanceID + '-geometry-style'),
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
  }, {
    key: 'throttle',
    value: function throttle() {
      var _this3 = this;

      if (this.isThrottleAvailable) {
        this.layoutBoxes();
        this.isThrottleAvailable = false;
        setTimeout(function () {
          _this3.isThrottleAvailable = true;
          if (_this3.isThrottleQueued) {
            _this3.isThrottleQueued = false;
            _this3.layoutBoxes();
          }
        }, this.throttleTimeout);
      } else {
        this.isThrottleQueued = true;
      }
    }
  }]);

  return ImageIndexJustified;
}();

exports.default = ImageIndexJustified;

},{}],2:[function(require,module,exports){
'use strict';

var _imageIndexJustified = require('./image-index-justified.js');

var _imageIndexJustified2 = _interopRequireDefault(_imageIndexJustified);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.image-index-justified').forEach(function (el) {
    new _imageIndexJustified2.default(el);
  });
});

},{"./image-index-justified.js":1}]},{},[2]);
