/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/heatmap.js":
/*!*********************************!*\
  !*** ./resources/js/heatmap.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * heatmap.js v2.0.5 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license 
 *
 * :: 2016-09-05 01:16
 */
;
(function (name, context, factory) {
  // Supports UMD. AMD, CommonJS/Node.js and browser context
  if ( true && module.exports) {
    module.exports = factory();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})("h337", this, function () {
  // Heatmap Config stores default values and will be merged with instance config
  var HeatmapConfig = {
    defaultRadius: 40,
    defaultRenderer: 'canvas2d',
    defaultGradient: {
      0.25: "rgb(0,0,255)",
      0.55: "rgb(0,255,0)",
      0.85: "yellow",
      1.0: "rgb(255,0,0)"
    },
    defaultMaxOpacity: 1,
    defaultMinOpacity: 0,
    defaultBlur: .85,
    defaultXField: 'x',
    defaultYField: 'y',
    defaultValueField: 'value',
    plugins: {}
  };
  var Store = function StoreClosure() {
    var Store = function Store(config) {
      this._coordinator = {};
      this._data = [];
      this._radi = [];
      this._min = 10;
      this._max = 1;
      this._xField = config['xField'] || config.defaultXField;
      this._yField = config['yField'] || config.defaultYField;
      this._valueField = config['valueField'] || config.defaultValueField;
      if (config["radius"]) {
        this._cfgRadius = config["radius"];
      }
    };
    var defaultRadius = HeatmapConfig.defaultRadius;
    Store.prototype = {
      // when forceRender = false -> called from setData, omits renderall event
      _organiseData: function _organiseData(dataPoint, forceRender) {
        var x = dataPoint[this._xField];
        var y = dataPoint[this._yField];
        var radi = this._radi;
        var store = this._data;
        var max = this._max;
        var min = this._min;
        var value = dataPoint[this._valueField] || 1;
        var radius = dataPoint.radius || this._cfgRadius || defaultRadius;
        if (!store[x]) {
          store[x] = [];
          radi[x] = [];
        }
        if (!store[x][y]) {
          store[x][y] = value;
          radi[x][y] = radius;
        } else {
          store[x][y] += value;
        }
        var storedVal = store[x][y];
        if (storedVal > max) {
          if (!forceRender) {
            this._max = storedVal;
          } else {
            this.setDataMax(storedVal);
          }
          return false;
        } else if (storedVal < min) {
          if (!forceRender) {
            this._min = storedVal;
          } else {
            this.setDataMin(storedVal);
          }
          return false;
        } else {
          return {
            x: x,
            y: y,
            value: value,
            radius: radius,
            min: min,
            max: max
          };
        }
      },
      _unOrganizeData: function _unOrganizeData() {
        var unorganizedData = [];
        var data = this._data;
        var radi = this._radi;
        for (var x in data) {
          for (var y in data[x]) {
            unorganizedData.push({
              x: x,
              y: y,
              radius: radi[x][y],
              value: data[x][y]
            });
          }
        }
        return {
          min: this._min,
          max: this._max,
          data: unorganizedData
        };
      },
      _onExtremaChange: function _onExtremaChange() {
        this._coordinator.emit('extremachange', {
          min: this._min,
          max: this._max
        });
      },
      addData: function addData() {
        if (arguments[0].length > 0) {
          var dataArr = arguments[0];
          var dataLen = dataArr.length;
          while (dataLen--) {
            this.addData.call(this, dataArr[dataLen]);
          }
        } else {
          // add to store  
          var organisedEntry = this._organiseData(arguments[0], true);
          if (organisedEntry) {
            // if it's the first datapoint initialize the extremas with it
            if (this._data.length === 0) {
              this._min = this._max = organisedEntry.value;
            }
            this._coordinator.emit('renderpartial', {
              min: this._min,
              max: this._max,
              data: [organisedEntry]
            });
          }
        }
        return this;
      },
      setData: function setData(data) {
        var dataPoints = data.data;
        var pointsLen = dataPoints.length;

        // reset data arrays
        this._data = [];
        this._radi = [];
        for (var i = 0; i < pointsLen; i++) {
          this._organiseData(dataPoints[i], false);
        }
        this._max = data.max;
        this._min = data.min || 0;
        this._onExtremaChange();
        this._coordinator.emit('renderall', this._getInternalData());
        return this;
      },
      removeData: function removeData() {
        // TODO: implement
      },
      setDataMax: function setDataMax(max) {
        this._max = max;
        this._onExtremaChange();
        this._coordinator.emit('renderall', this._getInternalData());
        return this;
      },
      setDataMin: function setDataMin(min) {
        this._min = min;
        this._onExtremaChange();
        this._coordinator.emit('renderall', this._getInternalData());
        return this;
      },
      setCoordinator: function setCoordinator(coordinator) {
        this._coordinator = coordinator;
      },
      _getInternalData: function _getInternalData() {
        return {
          max: this._max,
          min: this._min,
          data: this._data,
          radi: this._radi
        };
      },
      getData: function getData() {
        return this._unOrganizeData();
      } /*,
          TODO: rethink.
        getValueAt: function(point) {
         var value;
         var radius = 100;
         var x = point.x;
         var y = point.y;
         var data = this._data;
          if (data[x] && data[x][y]) {
           return data[x][y];
         } else {
           var values = [];
           // radial search for datapoints based on default radius
           for(var distance = 1; distance < radius; distance++) {
             var neighbors = distance * 2 +1;
             var startX = x - distance;
             var startY = y - distance;
              for(var i = 0; i < neighbors; i++) {
               for (var o = 0; o < neighbors; o++) {
                 if ((i == 0 || i == neighbors-1) || (o == 0 || o == neighbors-1)) {
                   if (data[startY+i] && data[startY+i][startX+o]) {
                     values.push(data[startY+i][startX+o]);
                   }
                 } else {
                   continue;
                 } 
               }
             }
           }
           if (values.length > 0) {
             return Math.max.apply(Math, values);
           }
         }
         return false;
        }*/
    };

    return Store;
  }();
  var Canvas2dRenderer = function Canvas2dRendererClosure() {
    var _getColorPalette = function _getColorPalette(config) {
      var gradientConfig = config.gradient || config.defaultGradient;
      var paletteCanvas = document.createElement('canvas');
      var paletteCtx = paletteCanvas.getContext('2d');
      paletteCanvas.width = 256;
      paletteCanvas.height = 1;
      var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
      for (var key in gradientConfig) {
        gradient.addColorStop(key, gradientConfig[key]);
      }
      paletteCtx.fillStyle = gradient;
      paletteCtx.fillRect(0, 0, 256, 1);
      return paletteCtx.getImageData(0, 0, 256, 1).data;
    };
    var _getPointTemplate = function _getPointTemplate(radius, blurFactor) {
      var tplCanvas = document.createElement('canvas');
      var tplCtx = tplCanvas.getContext('2d');
      var x = radius;
      var y = radius;
      tplCanvas.width = tplCanvas.height = radius * 2;
      if (blurFactor == 1) {
        tplCtx.beginPath();
        tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
        tplCtx.fillStyle = 'rgba(0,0,0,1)';
        tplCtx.fill();
      } else {
        var gradient = tplCtx.createRadialGradient(x, y, radius * blurFactor, x, y, radius);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        tplCtx.fillStyle = gradient;
        tplCtx.fillRect(0, 0, 2 * radius, 2 * radius);
      }
      return tplCanvas;
    };
    var _prepareData = function _prepareData(data) {
      var renderData = [];
      var min = data.min;
      var max = data.max;
      var radi = data.radi;
      var data = data.data;
      var xValues = Object.keys(data);
      var xValuesLen = xValues.length;
      while (xValuesLen--) {
        var xValue = xValues[xValuesLen];
        var yValues = Object.keys(data[xValue]);
        var yValuesLen = yValues.length;
        while (yValuesLen--) {
          var yValue = yValues[yValuesLen];
          var value = data[xValue][yValue];
          var radius = radi[xValue][yValue];
          renderData.push({
            x: xValue,
            y: yValue,
            value: value,
            radius: radius
          });
        }
      }
      return {
        min: min,
        max: max,
        data: renderData
      };
    };
    function Canvas2dRenderer(config) {
      var container = config.container;
      var shadowCanvas = this.shadowCanvas = document.createElement('canvas');
      var canvas = this.canvas = config.canvas || document.createElement('canvas');
      var renderBoundaries = this._renderBoundaries = [10000, 10000, 0, 0];
      var computed = getComputedStyle(config.container) || {};
      canvas.className = 'heatmap-canvas';
      this._width = canvas.width = shadowCanvas.width = config.width || +computed.width.replace(/px/, '');
      this._height = canvas.height = shadowCanvas.height = config.height || +computed.height.replace(/px/, '');
      this.shadowCtx = shadowCanvas.getContext('2d');
      this.ctx = canvas.getContext('2d');

      // @TODO:
      // conditional wrapper

      canvas.style.cssText = shadowCanvas.style.cssText = 'position:absolute;left:0;top:0;';
      container.style.position = 'relative';
      container.appendChild(canvas);
      this._palette = _getColorPalette(config);
      this._templates = {};
      this._setStyles(config);
    }
    ;
    Canvas2dRenderer.prototype = {
      renderPartial: function renderPartial(data) {
        if (data.data.length > 0) {
          this._drawAlpha(data);
          this._colorize();
        }
      },
      renderAll: function renderAll(data) {
        // reset render boundaries
        this._clear();
        if (data.data.length > 0) {
          this._drawAlpha(_prepareData(data));
          this._colorize();
        }
      },
      _updateGradient: function _updateGradient(config) {
        this._palette = _getColorPalette(config);
      },
      updateConfig: function updateConfig(config) {
        if (config['gradient']) {
          this._updateGradient(config);
        }
        this._setStyles(config);
      },
      setDimensions: function setDimensions(width, height) {
        this._width = width;
        this._height = height;
        this.canvas.width = this.shadowCanvas.width = width;
        this.canvas.height = this.shadowCanvas.height = height;
      },
      _clear: function _clear() {
        this.shadowCtx.clearRect(0, 0, this._width, this._height);
        this.ctx.clearRect(0, 0, this._width, this._height);
      },
      _setStyles: function _setStyles(config) {
        this._blur = config.blur == 0 ? 0 : config.blur || config.defaultBlur;
        if (config.backgroundColor) {
          this.canvas.style.backgroundColor = config.backgroundColor;
        }
        this._width = this.canvas.width = this.shadowCanvas.width = config.width || this._width;
        this._height = this.canvas.height = this.shadowCanvas.height = config.height || this._height;
        this._opacity = (config.opacity || 0) * 255;
        this._maxOpacity = (config.maxOpacity || config.defaultMaxOpacity) * 255;
        this._minOpacity = (config.minOpacity || config.defaultMinOpacity) * 255;
        this._useGradientOpacity = !!config.useGradientOpacity;
      },
      _drawAlpha: function _drawAlpha(data) {
        var min = this._min = data.min;
        var max = this._max = data.max;
        var data = data.data || [];
        var dataLen = data.length;
        // on a point basis?
        var blur = 1 - this._blur;
        while (dataLen--) {
          var point = data[dataLen];
          var x = point.x;
          var y = point.y;
          var radius = point.radius;
          // if value is bigger than max
          // use max as value
          var value = Math.min(point.value, max);
          var rectX = x - radius;
          var rectY = y - radius;
          var shadowCtx = this.shadowCtx;
          var tpl;
          if (!this._templates[radius]) {
            this._templates[radius] = tpl = _getPointTemplate(radius, blur);
          } else {
            tpl = this._templates[radius];
          }
          // value from minimum / value range
          // => [0, 1]
          var templateAlpha = (value - min) / (max - min);
          // this fixes #176: small values are not visible because globalAlpha < .01 cannot be read from imageData
          shadowCtx.globalAlpha = templateAlpha < .01 ? .01 : templateAlpha;
          shadowCtx.drawImage(tpl, rectX, rectY);

          // update renderBoundaries
          if (rectX < this._renderBoundaries[0]) {
            this._renderBoundaries[0] = rectX;
          }
          if (rectY < this._renderBoundaries[1]) {
            this._renderBoundaries[1] = rectY;
          }
          if (rectX + 2 * radius > this._renderBoundaries[2]) {
            this._renderBoundaries[2] = rectX + 2 * radius;
          }
          if (rectY + 2 * radius > this._renderBoundaries[3]) {
            this._renderBoundaries[3] = rectY + 2 * radius;
          }
        }
      },
      _colorize: function _colorize() {
        var x = this._renderBoundaries[0];
        var y = this._renderBoundaries[1];
        var width = this._renderBoundaries[2] - x;
        var height = this._renderBoundaries[3] - y;
        var maxWidth = this._width;
        var maxHeight = this._height;
        var opacity = this._opacity;
        var maxOpacity = this._maxOpacity;
        var minOpacity = this._minOpacity;
        var useGradientOpacity = this._useGradientOpacity;
        if (x < 0) {
          x = 0;
        }
        if (y < 0) {
          y = 0;
        }
        if (x + width > maxWidth) {
          width = maxWidth - x;
        }
        if (y + height > maxHeight) {
          height = maxHeight - y;
        }
        var img = this.shadowCtx.getImageData(x, y, width, height);
        var imgData = img.data;
        var len = imgData.length;
        var palette = this._palette;
        for (var i = 3; i < len; i += 4) {
          var alpha = imgData[i];
          var offset = alpha * 4;
          if (!offset) {
            continue;
          }
          var finalAlpha;
          if (opacity > 0) {
            finalAlpha = opacity;
          } else {
            if (alpha < maxOpacity) {
              if (alpha < minOpacity) {
                finalAlpha = minOpacity;
              } else {
                finalAlpha = alpha;
              }
            } else {
              finalAlpha = maxOpacity;
            }
          }
          imgData[i - 3] = palette[offset];
          imgData[i - 2] = palette[offset + 1];
          imgData[i - 1] = palette[offset + 2];
          imgData[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha;
        }
        img.data = imgData;
        this.ctx.putImageData(img, x, y);
        this._renderBoundaries = [1000, 1000, 0, 0];
      },
      getValueAt: function getValueAt(point) {
        var value;
        var shadowCtx = this.shadowCtx;
        var img = shadowCtx.getImageData(point.x, point.y, 1, 1);
        var data = img.data[3];
        var max = this._max;
        var min = this._min;
        value = Math.abs(max - min) * (data / 255) >> 0;
        return value;
      },
      getDataURL: function getDataURL() {
        return this.canvas.toDataURL();
      }
    };
    return Canvas2dRenderer;
  }();
  var Renderer = function RendererClosure() {
    var rendererFn = false;
    if (HeatmapConfig['defaultRenderer'] === 'canvas2d') {
      rendererFn = Canvas2dRenderer;
    }
    return rendererFn;
  }();
  var Util = {
    merge: function merge() {
      var merged = {};
      var argsLen = arguments.length;
      for (var i = 0; i < argsLen; i++) {
        var obj = arguments[i];
        for (var key in obj) {
          merged[key] = obj[key];
        }
      }
      return merged;
    }
  };
  // Heatmap Constructor
  var Heatmap = function HeatmapClosure() {
    var Coordinator = function CoordinatorClosure() {
      function Coordinator() {
        this.cStore = {};
      }
      ;
      Coordinator.prototype = {
        on: function on(evtName, callback, scope) {
          var cStore = this.cStore;
          if (!cStore[evtName]) {
            cStore[evtName] = [];
          }
          cStore[evtName].push(function (data) {
            return callback.call(scope, data);
          });
        },
        emit: function emit(evtName, data) {
          var cStore = this.cStore;
          if (cStore[evtName]) {
            var len = cStore[evtName].length;
            for (var i = 0; i < len; i++) {
              var callback = cStore[evtName][i];
              callback(data);
            }
          }
        }
      };
      return Coordinator;
    }();
    var _connect = function _connect(scope) {
      var renderer = scope._renderer;
      var coordinator = scope._coordinator;
      var store = scope._store;
      coordinator.on('renderpartial', renderer.renderPartial, renderer);
      coordinator.on('renderall', renderer.renderAll, renderer);
      coordinator.on('extremachange', function (data) {
        scope._config.onExtremaChange && scope._config.onExtremaChange({
          min: data.min,
          max: data.max,
          gradient: scope._config['gradient'] || scope._config['defaultGradient']
        });
      });
      store.setCoordinator(coordinator);
    };
    function Heatmap() {
      var config = this._config = Util.merge(HeatmapConfig, arguments[0] || {});
      this._coordinator = new Coordinator();
      if (config['plugin']) {
        var pluginToLoad = config['plugin'];
        if (!HeatmapConfig.plugins[pluginToLoad]) {
          throw new Error('Plugin \'' + pluginToLoad + '\' not found. Maybe it was not registered.');
        } else {
          var plugin = HeatmapConfig.plugins[pluginToLoad];
          // set plugin renderer and store
          this._renderer = new plugin.renderer(config);
          this._store = new plugin.store(config);
        }
      } else {
        this._renderer = new Renderer(config);
        this._store = new Store(config);
      }
      _connect(this);
    }
    ;

    // @TODO:
    // add API documentation
    Heatmap.prototype = {
      addData: function addData() {
        this._store.addData.apply(this._store, arguments);
        return this;
      },
      removeData: function removeData() {
        this._store.removeData && this._store.removeData.apply(this._store, arguments);
        return this;
      },
      setData: function setData() {
        this._store.setData.apply(this._store, arguments);
        return this;
      },
      setDataMax: function setDataMax() {
        this._store.setDataMax.apply(this._store, arguments);
        return this;
      },
      setDataMin: function setDataMin() {
        this._store.setDataMin.apply(this._store, arguments);
        return this;
      },
      configure: function configure(config) {
        this._config = Util.merge(this._config, config);
        this._renderer.updateConfig(this._config);
        this._coordinator.emit('renderall', this._store._getInternalData());
        return this;
      },
      repaint: function repaint() {
        this._coordinator.emit('renderall', this._store._getInternalData());
        return this;
      },
      getData: function getData() {
        return this._store.getData();
      },
      getDataURL: function getDataURL() {
        return this._renderer.getDataURL();
      },
      getValueAt: function getValueAt(point) {
        if (this._store.getValueAt) {
          return this._store.getValueAt(point);
        } else if (this._renderer.getValueAt) {
          return this._renderer.getValueAt(point);
        } else {
          return null;
        }
      }
    };
    return Heatmap;
  }();

  // core
  var heatmapFactory = {
    create: function create(config) {
      return new Heatmap(config);
    },
    register: function register(pluginKey, plugin) {
      HeatmapConfig.plugins[pluginKey] = plugin;
    }
  };
  return heatmapFactory;
});

/***/ }),

/***/ "./resources/js/test.js":
/*!******************************!*\
  !*** ./resources/js/test.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heatmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heatmap */ "./resources/js/heatmap.js");
/* harmony import */ var _heatmap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heatmap__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var root;
var GetGrafs = /*#__PURE__*/function () {
  function GetGrafs() {
    _classCallCheck(this, GetGrafs);
    this.url = '/statistic';
    this.selectSites = $("#sitesSelect");
    this.Init();
  }
  _createClass(GetGrafs, [{
    key: "Init",
    value: function Init() {
      var _this = this;
      if (this.selectSites.length) {
        this.getClickMapParams(this.selectSites.val());
        this.selectSites.change(function (e) {
          _this.getClickMapParams(_this.selectSites.val());
        });
      }
    }
  }, {
    key: "getClickMapParams",
    value: function getClickMapParams(site) {
      this.site = site;
      this.dataParams = {
        "_token": token,
        "site": this.site,
        "action": "getClickMap"
      };
      this.AjaxSend();
      this.getHeatMapParams();
    }
  }, {
    key: "AjaxSend",
    value: function AjaxSend() {
      var _this2 = this;
      $.ajax({
        url: this.url,
        type: "POST",
        data: this.dataParams,
        success: function success(data) {
          _this2.getGraf(data);
        }
      });
    }
  }, {
    key: "getHeatMapParams",
    value: function getHeatMapParams() {
      this.dataParams = {
        "_token": token,
        "site": this.site,
        "action": "getHeatMap"
      };
      this.AjaxSend();
    }
  }, {
    key: "showClickMap",
    value: function showClickMap(arData) {
      if (root) {
        root.dispose();
      }
      am5.ready(function () {
        root = am5.Root["new"]("chartdiv");
        root.setThemes([am5themes_Animated["new"](root)]);
        var chart = root.container.children.push(am5xy.XYChart["new"](root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          layout: root.verticalLayout
        }));
        var yRenderer = am5xy.AxisRendererY["new"](root, {
          visible: false,
          minGridDistance: 20,
          inversed: true
        });
        yRenderer.grid.template.set("visible", false);
        var yAxis = chart.yAxes.push(am5xy.CategoryAxis["new"](root, {
          maxDeviation: 0,
          renderer: yRenderer,
          categoryField: "weekday"
        }));
        var xRenderer = am5xy.AxisRendererX["new"](root, {
          visible: false,
          minGridDistance: 30,
          opposite: true
        });
        xRenderer.grid.template.set("visible", false);
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis["new"](root, {
          renderer: xRenderer,
          categoryField: "hour"
        }));
        var series = chart.series.push(am5xy.ColumnSeries["new"](root, {
          calculateAggregates: true,
          stroke: am5.color(0xffffff),
          clustered: false,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryXField: "hour",
          categoryYField: "weekday",
          valueField: "value"
        }));
        series.columns.template.setAll({
          tooltipText: "{value}",
          strokeOpacity: 1,
          strokeWidth: 2,
          width: am5.percent(100),
          height: am5.percent(100)
        });
        series.columns.template.events.on("pointerover", function (event) {
          var di = event.target.dataItem;
          if (di) {
            heatLegend.showValue(di.get("value", 0));
          }
        });
        series.events.on("datavalidated", function () {
          heatLegend.set("startValue", series.getPrivate("valueHigh"));
          heatLegend.set("endValue", series.getPrivate("valueLow"));
        });
        series.set("heatRules", [{
          target: series.columns.template,
          min: am5.color(0xfffb77),
          max: am5.color(0xfe131a),
          dataField: "value",
          key: "fill"
        }]);
        var heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend["new"](root, {
          orientation: "horizontal",
          endColor: am5.color(0xfffb77),
          startColor: am5.color(0xfe131a)
        }));
        var data = [];
        var dateList = [];
        var hoursList = [];
        arData.forEach(function (element) {
          data.push({
            hour: element.hour,
            weekday: element.date,
            value: Number(element.count)
          });
          dateList.push(element.date);
          hoursList.push(element.hour);
        });
        var unicHour = Array.from(new Set(hoursList));
        var unicHourObj = [];
        unicHour.forEach(function (element) {
          unicHourObj.push({
            hour: element
          });
        });
        var unicDate = Array.from(new Set(dateList));
        var unicDateObj = [];
        unicDate.forEach(function (element) {
          unicDateObj.push({
            weekday: element
          });
        });
        series.data.setAll(data);
        yAxis.data.setAll(unicDateObj);
        xAxis.data.setAll(unicHourObj);
        chart.appear(1000, 100);
      });
    }
  }, {
    key: "showHeatkMap",
    value: function showHeatkMap(arData) {
      $('#heatmapContainer').html('');
      var heatmap = _heatmap__WEBPACK_IMPORTED_MODULE_0___default.a.create({
        container: document.getElementById('heatmapContainer')
      });
      var dataPoints = [];
      arData.forEach(function (element) {
        dataPoints.push({
          x: element.posX,
          y: element.posY,
          value: 1
        });
      });
      heatmap.setData({
        max: 5,
        data: dataPoints
      });
    }
  }, {
    key: "getGraf",
    value: function getGraf(arData) {
      switch (arData.success['map']) {
        case 'click':
          this.showClickMap(arData.success['vals']);
          break;
        case 'heat':
          this.showHeatkMap(arData.success['vals']);
          break;
      }
    }
  }]);
  return GetGrafs;
}();
var grafs = new GetGrafs();

/***/ }),

/***/ 4:
/*!************************************!*\
  !*** multi ./resources/js/test.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! c:\SERVER\domains\mysite\resources\js\test.js */"./resources/js/test.js");


/***/ })

/******/ });