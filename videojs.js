/*!
 * @license MIT
 * newrelic-video-videojs 0.7.0
 * Copyright New Relic <http://newrelic.com/>
 * @author Jordi Aguilar
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object")
      module.exports = factory();
    else if (typeof define === "function" && define.amd) define([], factory);
    else if (typeof exports === "object") exports["nrvideo"] = factory();
    else root["nrvideo"] = factory();
  })(self, () => {
    return /******/ (() => {
      // webpackBootstrap
      /******/ "use strict";
      /******/ var __webpack_modules__ = {
        /***/ "./src/ads/brightcove-ima.js":
          /*!***********************************!*\
    !*** ./src/ads/brightcove-ima.js ***!
    \***********************************/
          /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            var nrvideo = _interopRequireWildcard(
              __webpack_require__(
                /*! newrelic-video-core */ "./node_modules/newrelic-video-core/src/index.js"
              )
            );
            var _videojsAds = _interopRequireDefault(
              __webpack_require__(/*! ./videojs-ads */ "./src/ads/videojs-ads.js")
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _getRequireWildcardCache(e) {
              if ("function" != typeof WeakMap) return null;
              var r = new WeakMap(),
                t = new WeakMap();
              return (_getRequireWildcardCache = function (e) {
                return e ? t : r;
              })(e);
            }
            function _interopRequireWildcard(e, r) {
              if (!r && e && e.__esModule) return e;
              if (null === e || ("object" != typeof e && "function" != typeof e))
                return { default: e };
              var t = _getRequireWildcardCache(r);
              if (t && t.has(e)) return t.get(e);
              var n = { __proto__: null },
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var u in e)
                if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
                  var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
                  i && (i.get || i.set)
                    ? Object.defineProperty(n, u, i)
                    : (n[u] = e[u]);
                }
              return (n.default = e), t && t.set(e, n), n;
            }
            class BrightcoveImaAdsTracker extends _videojsAds.default {
              static isUsing(player) {
                return !!player.ima3;
              }
              getTrackerName() {
                return "brightcove-ima-ads";
              }
              getPlayerName() {
                return "brightcove-ima-ads";
              }
              getPlayhead() {
                return this.player.ima3.adPlayer.currentTime();
              }
              registerListeners() {
                nrvideo.Log.debugCommonVideoEvents(this.player, [
                  null,
                  "ima3-ready",
                  "ima3error",
                  "ima3-ad-error",
                  "ima3-started",
                  "ima3-complete",
                  "ima3-paused",
                  "ima3-resumed",
                  "ads-request",
                  "ads-load",
                  "ads-ad-started",
                  "ads-ad-ended",
                  "ads-pause",
                  "ads-play",
                  "ads-click",
                  "ads-pod-started",
                  "ads-pod-ended",
                  "ads-allpods-completed",
                ]);
                this.player.on("ima3-started", this.onStarted.bind(this));
                this.player.on("ima3-paused", this.onPaused.bind(this));
                this.player.on("ima3-resumed", this.onResume.bind(this));
                this.player.on("ima3-complete", this.onComplete.bind(this));
                this.player.on("ima3-skipped", this.onSkipped.bind(this));
                this.player.on("adserror", this.onError.bind(this));
                this.player.on("ads-click", this.onClick.bind(this));
              }
              unregisterListeners() {
                this.player.off("ima3-started", this.onStarted);
                this.player.off("ima3-paused", this.onPaused);
                this.player.off("ima3-resumed", this.onResume);
                this.player.off("ima3-complete", this.onComplete);
                this.player.off("ima3-skipped", this.onSkipped);
                this.player.off("adserror", this.onError);
                this.player.off("ads-click", this.onClick);
              }
              onStarted(e) {
                this.sendRequest();
                this.sendStart();
              }
              onPaused(e) {
                this.sendPause();
              }
              onResume(e) {
                this.sendResume();
              }
              onComplete(e) {
                this.sendEnd();
              }
              onSkipped(e) {
                this.sendEnd({
                  skipped: true,
                });
              }
              onError(e) {
                this.sendError();
              }
              onClick(e) {
                this.sendClick();
              }
            }
            exports["default"] = BrightcoveImaAdsTracker;
  
            /***/
          },
  
        /***/ "./src/ads/freewheel.js":
          /*!******************************!*\
    !*** ./src/ads/freewheel.js ***!
    \******************************/
          /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            var _videojsAds = _interopRequireDefault(
              __webpack_require__(/*! ./videojs-ads */ "./src/ads/videojs-ads.js")
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            class FreewheelAdsTracker extends _videojsAds.default {
              static isUsing(player) {
                return (
                  !!player.FreeWheelPlugin &&
                  typeof tv !== "undefined" &&
                  tv.freewheel
                );
              }
              getTrackerName() {
                return "freewheel-ads";
              }
              getPlayerName() {
                return "freewheel-ads";
              }
              getPlayerVersion() {
                return this.player.FreeWheelPlugin.VERSION;
              }
              getPlayhead() {
                if (this.player.ads.ad.currentTime) {
                  return this.player.ads.ad.currentTime() * 1000;
                }
              }
              getDuration() {
                if (this.player.ads.ad.duration) {
                  return this.player.ads.ad.duration * 1000;
                }
              }
              getVideoId() {
                return this.player.ads.ad.id;
              }
              getAdPartner() {
                return "freewheel";
              }
              getAdCreativeId() {
                try {
                  return this.player.ads.provider.event.adInstance
                    .getActiveCreativeRendition()
                    .getId();
                } catch (err) {
                  /* do nothing */
                }
              }
              getSrc() {
                try {
                  let acr =
                    this.player.ads.provider.event.adInstance.getActiveCreativeRendition();
                  return acr.getPrimaryCreativeRenditionAsset().getUrl();
                } catch (err) {
                  /* do nothing */
                }
              }
              getTitle() {
                try {
                  let acr =
                    this.player.ads.provider.event.adInstance.getActiveCreativeRendition();
                  return acr.getPrimaryCreativeRenditionAsset().getName();
                } catch (err) {
                  /* do nothing */
                }
              }
              getAdPosition() {
                switch (this.player.ads.ad.type) {
                  case "PREROLL":
                    return nrvideo.Constants.AdPositions.PRE;
                  case "MIDROLL":
                    return nrvideo.Constants.AdPositions.MID;
                  case "POSTROLL":
                    return nrvideo.Constants.AdPositions.POST;
                }
              }
            }
            exports["default"] = FreewheelAdsTracker;
  
            /***/
          },
  
        /***/ "./src/ads/ima.js":
          /*!************************!*\
    !*** ./src/ads/ima.js ***!
    \************************/
          /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            var nrvideo = _interopRequireWildcard(
              __webpack_require__(
                /*! newrelic-video-core */ "./node_modules/newrelic-video-core/src/index.js"
              )
            );
            var _videojsAds = _interopRequireDefault(
              __webpack_require__(/*! ./videojs-ads */ "./src/ads/videojs-ads.js")
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _getRequireWildcardCache(e) {
              if ("function" != typeof WeakMap) return null;
              var r = new WeakMap(),
                t = new WeakMap();
              return (_getRequireWildcardCache = function (e) {
                return e ? t : r;
              })(e);
            }
            function _interopRequireWildcard(e, r) {
              if (!r && e && e.__esModule) return e;
              if (null === e || ("object" != typeof e && "function" != typeof e))
                return { default: e };
              var t = _getRequireWildcardCache(r);
              if (t && t.has(e)) return t.get(e);
              var n = { __proto__: null },
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var u in e)
                if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
                  var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
                  i && (i.get || i.set)
                    ? Object.defineProperty(n, u, i)
                    : (n[u] = e[u]);
                }
              return (n.default = e), t && t.set(e, n), n;
            }
            /* global google */
  
            class ImaAdsTracker extends _videojsAds.default {
              static isUsing(player) {
                return player.ima && typeof google !== "undefined";
              }
              getTrackerName() {
                return "ima-ads";
              }
              getPlayerName() {
                return "ima";
              }
              getPlayerVersion() {
                return (
                  "ima: " +
                  google.ima.VERSION +
                  "; contrib-ads: " +
                  this.player.ads.VERSION
                );
              }
              getDuration() {
                try {
                  return (
                    this.player.ima.getAdsManager().getCurrentAd().getDuration() *
                    1000
                  );
                } catch (err) {
                  /* do nothing */
                }
              }
              getVideoId() {
                try {
                  return this.player.ima.getAdsManager().getCurrentAd().getAdId();
                } catch (err) {
                  /* do nothing */
                }
              }
              getAdCreativeId() {
                try {
                  return this.player.ima
                    .getAdsManager()
                    .getCurrentAd()
                    .getCreativeId();
                } catch (err) {
                  /* do nothing */
                }
              }
              getSrc() {
                try {
                  return this.player.ima
                    .getAdsManager()
                    .getCurrentAd()
                    .getMediaUrl();
                } catch (err) {
                  /* do nothing */
                }
              }
              getTitle() {
                try {
                  return this.player.ima
                    .getAdsManager()
                    .getCurrentAd()
                    .getTitle();
                } catch (err) {
                  /* do nothing */
                }
              }
              getPlayhead() {
                let manager = this.player.ima.getAdsManager();
                if (manager) {
                  return (this.getDuration() - manager.getRemainingTime()) * 1000;
                }
              }
              getPlayrate() {
                return this.player.playbackRate();
              }
              getAdPartner() {
                return "ima";
              }
              registerListeners() {
                // Shortcut events
                let e = google.ima.AdEvent.Type;
                let AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
  
                // debug
                nrvideo.Log.debugCommonVideoEvents(
                  this.player.ima.addEventListener,
                  [
                    null,
                    e.ALL_ADS_COMPLETED,
                    e.LINEAR_CHANGED,
                    e.COMPLETE,
                    e.USER_CLOSE,
                    e.IMPRESSION,
                    e.CONTENT_PAUSE_REQUESTED,
                    e.CONTENT_RESUME_REQUESTED,
                    e.SKIPPED,
                    e.SKIPPABLE_STATE_CHANGED,
                    e.LOADED,
                    e.PAUSED,
                    e.RESUMED,
                    e.STARTED,
                    e.AD_CAN_PLAY,
                    e.AD_METADATA,
                    e.EXPANDED_CHANGED,
                    e.AD_BREAK_READY,
                    e.LOG,
                    e.CLICK,
                    e.FIRST_QUARTILE,
                    e.MIDPOINT,
                    e.THIRD_QUARTILE,
                    AD_ERROR,
                  ]
                );
  
                // Register listeners
                this.player.ima.addEventListener(
                  e.LOADED,
                  this.onLoaded.bind(this)
                );
                this.player.ima.addEventListener(
                  e.IMPRESSION,
                  this.onImpression.bind(this)
                );
                this.player.ima.addEventListener(
                  e.PAUSED,
                  this.onPaused.bind(this)
                );
                this.player.ima.addEventListener(
                  e.RESUMED,
                  this.onResumed.bind(this)
                );
                this.player.ima.addEventListener(
                  e.COMPLETE,
                  this.onComplete.bind(this)
                );
                this.player.ima.addEventListener(
                  e.SKIPPED,
                  this.onSkipped.bind(this)
                );
                this.player.ima.addEventListener(
                  e.CLICK,
                  this.onClick.bind(this)
                );
                this.player.ima.addEventListener(
                  e.FIRST_QUARTILE,
                  this.onFirstQuartile.bind(this)
                );
                this.player.ima.addEventListener(
                  e.MIDPOINT,
                  this.onMidpoint.bind(this)
                );
                this.player.ima.addEventListener(
                  e.THIRD_QUARTILE,
                  this.onThirdQuartile.bind(this)
                );
                this.player.ima.addEventListener(
                  AD_ERROR,
                  this.onError.bind(this)
                );
                this.player.on("adend", this.onAdend.bind(this));
              }
              unregisterListeners() {
                // Shortcut events
                let e = google.ima.AdEvent.Type;
                let AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
  
                // unregister listeners
                this.player.ima.removeEventListener(e.LOADED, this.onLoaded);
                this.player.ima.removeEventListener(
                  e.IMPRESSION,
                  this.onImpression
                );
                this.player.ima.removeEventListener(e.PAUSED, this.onPaused);
                this.player.ima.removeEventListener(e.RESUMED, this.onResumed);
                this.player.ima.removeEventListener(e.COMPLETE, this.onComplete);
                this.player.ima.removeEventListener(e.SKIPPED, this.onSkipped);
                this.player.ima.removeEventListener(e.CLICK, this.onClick);
                this.player.ima.removeEventListener(
                  e.FIRST_QUARTILE,
                  this.onFirstQuartile
                );
                this.player.ima.removeEventListener(e.MIDPOINT, this.onMidpoint);
                this.player.ima.removeEventListener(
                  e.THIRD_QUARTILE,
                  this.onThirdQuartile
                );
                this.player.ima.removeEventListener(AD_ERROR, this.onError);
                this.player.off("adend", this.onAdend);
              }
              onLoaded(e) {
                this.sendRequest();
              }
              onImpression(e) {
                this.sendStart();
              }
              onComplete(e) {
                this.sendEnd();
              }
              onAdend(e) {
                this.sendEnd();
              }
              onSkipped(e) {
                this.sendEnd({
                  skipped: true,
                });
              }
              onError(e) {
                this.sendError(e.getError());
              }
              onClick(e) {
                this.sendAdClick();
              }
              onFirstQuartile() {
                this.sendAdQuartile({
                  quartile: 1,
                });
              }
              onMidpoint() {
                this.sendAdQuartile({
                  quartile: 2,
                });
              }
              onThirdQuartile() {
                this.sendAdQuartile({
                  quartile: 3,
                });
              }
              onPaused() {
                this.sendPause();
              }
              onResumed() {
                this.sendResume();
              }
            }
            exports["default"] = ImaAdsTracker;
  
            /***/
          },
  
        /***/ "./src/ads/videojs-ads.js":
          /*!********************************!*\
    !*** ./src/ads/videojs-ads.js ***!
    \********************************/
          /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            var nrvideo = _interopRequireWildcard(
              __webpack_require__(
                /*! newrelic-video-core */ "./node_modules/newrelic-video-core/src/index.js"
              )
            );
            var _package = _interopRequireDefault(
              __webpack_require__(/*! ../../package.json */ "./package.json")
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _getRequireWildcardCache(e) {
              if ("function" != typeof WeakMap) return null;
              var r = new WeakMap(),
                t = new WeakMap();
              return (_getRequireWildcardCache = function (e) {
                return e ? t : r;
              })(e);
            }
            function _interopRequireWildcard(e, r) {
              if (!r && e && e.__esModule) return e;
              if (null === e || ("object" != typeof e && "function" != typeof e))
                return { default: e };
              var t = _getRequireWildcardCache(r);
              if (t && t.has(e)) return t.get(e);
              var n = { __proto__: null },
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var u in e)
                if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
                  var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
                  i && (i.get || i.set)
                    ? Object.defineProperty(n, u, i)
                    : (n[u] = e[u]);
                }
              return (n.default = e), t && t.set(e, n), n;
            }
            class VideojsAdsTracker extends nrvideo.VideoTracker {
              getTrackerName() {
                return "videojs-ads";
              }
              getTrackerVersion() {
                return _package.default.version;
              }
              isMuted() {
                return this.player.muted();
              }
              getRenditionHeight() {
                return null;
              }
              getRenditionWidth() {
                return null;
              }
              getPlayerName() {
                return "videojs-ads";
              }
              getPlayerVersion() {
                return this.player.ads.VERSION;
              }
              registerListeners() {
                nrvideo.Log.debugCommonVideoEvents(this.player, [
                  null,
                  "ads-request",
                  "ads-load",
                  "adstart",
                  "adend",
                  "adskip",
                  "adserror",
                  "ads-click",
                  "ads-pod-started",
                  "ads-pod-ended",
                  "ads-first-quartile",
                  "ads-midpoint",
                  "ads-third-quartile",
                  "ads-pause",
                  "ads-play",
                  "adtimeout",
                ]);
  
                // Register listeners
                this.player.on("ads-request", this.onAdrequest.bind(this));
                this.player.on("ads-load", this.onAdload.bind(this));
                this.player.on("adstart", this.onAdstart.bind(this));
                this.player.on("adend", this.onAdend.bind(this));
                this.player.on("adskip", this.onAdskip.bind(this));
                this.player.on("adserror", this.onAdserror.bind(this));
                this.player.on("ads-click", this.onAdsClick.bind(this));
                this.player.on("ads-pod-started", this.onPodStart.bind(this));
                this.player.on("ads-pod-ended", this.onPodEnd.bind(this));
                this.player.on(
                  "ads-first-quartile",
                  this.onFirstQuartile.bind(this)
                );
                this.player.on("ads-midpoint", this.onMidpoint.bind(this));
                this.player.on(
                  "ads-third-quartile",
                  this.onThirdQuartile.bind(this)
                );
                this.player.on("ads-pause", this.onAdspause.bind(this));
                this.player.on("ads-play", this.onAdsplay.bind(this));
              }
              unregisterListeners() {
                // unregister listeners
                this.player.off("ads-request", this.onAdrequest);
                this.player.off("ads-load", this.onAdload);
                this.player.off("adstart", this.onAdstart);
                this.player.off("adend", this.onAdend);
                this.player.off("adskip", this.onAdskip);
                this.player.off("adserror", this.onAdserror);
                this.player.off("ads-click", this.onAdsClick);
                this.player.off("ads-pod-started", this.onPodStart);
                this.player.off("ads-pod-ended", this.onPodEnd);
                this.player.off("ads-first-quartile", this.onFirstQuartile);
                this.player.off("ads-midpoint", this.onMidpoint);
                this.player.off("ads-third-quartile", this.onThirdQuartile);
                this.player.off("ads-pause", this.onAdspause);
                this.player.off("ads-play", this.onAdsplay);
              }
              onAdrequest(e) {
                this.sendRequest();
                this.sendDownload({
                  state: "ads-request",
                });
              }
              onAdload(e) {
                this.sendDownload({
                  state: "ads-load",
                });
              }
              onAdstart(e) {
                this.sendRequest();
                this.sendStart();
              }
              onAdend(e) {
                this.sendEnd();
              }
              onAdskip(e) {
                this.sendEnd({
                  skipped: true,
                });
              }
              onAdserror(e) {
                this.sendError();
              }
              onAdsClick(e) {
                this.sendAdClick({
                  url: "unknown",
                });
              }
              onPodStart(e) {
                this.sendAdBreakStart();
              }
              onPodEnd(e) {
                this.sendAdBreakEnd();
              }
              onFirstQuartile() {
                this.sendAdQuartile({
                  quartile: 1,
                });
              }
              onMidpoint() {
                this.sendAdQuartile({
                  quartile: 2,
                });
              }
              onThirdQuartile() {
                this.sendAdQuartile({
                  quartile: 3,
                });
              }
              onAdspause() {
                this.sendPause();
              }
              onAdsplay() {
                this.sendResume();
              }
            }
            exports["default"] = VideojsAdsTracker;
  
            /***/
          },
  
        /***/ "./src/index.js":
          /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
          /***/ (module, __unused_webpack_exports, __webpack_require__) => {
            var nrvideo = _interopRequireWildcard(
              __webpack_require__(
                /*! newrelic-video-core */ "./node_modules/newrelic-video-core/src/index.js"
              )
            );
            var _tracker = _interopRequireDefault(
              __webpack_require__(/*! ./tracker */ "./src/tracker.js")
            );
            __webpack_require__(
              /*! ./register-plugin */ "./src/register-plugin.js"
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _getRequireWildcardCache(e) {
              if ("function" != typeof WeakMap) return null;
              var r = new WeakMap(),
                t = new WeakMap();
              return (_getRequireWildcardCache = function (e) {
                return e ? t : r;
              })(e);
            }
            function _interopRequireWildcard(e, r) {
              if (!r && e && e.__esModule) return e;
              if (null === e || ("object" != typeof e && "function" != typeof e))
                return { default: e };
              var t = _getRequireWildcardCache(r);
              if (t && t.has(e)) return t.get(e);
              var n = { __proto__: null },
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var u in e)
                if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
                  var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
                  i && (i.get || i.set)
                    ? Object.defineProperty(n, u, i)
                    : (n[u] = e[u]);
                }
              return (n.default = e), t && t.set(e, n), n;
            }
            nrvideo.VideojsTracker = _tracker.default;
            module.exports = nrvideo;
  
            /***/
          },
  
        /***/ "./src/register-plugin.js":
          /*!********************************!*\
    !*** ./src/register-plugin.js ***!
    \********************************/
          /***/ () => {
            if (typeof videojs !== "undefined") {
              // Cross-compatibility for Video.js 5 and 6.
              const registerPlugin = videojs.registerPlugin || videojs.plugin;
  
              /**
               * Register newrelic's video.js plugin.
               *
               * In the plugin function, the value of `this` is a video.js `Player`
               * instance. You cannot rely on the player being in a "ready" state here,
               * depending on how the plugin is invoked. This may or may not be important
               * to you; if not, remove the wait for "ready"!
               */
              registerPlugin("newrelic", function (options) {
                if (!this.newrelictracker) {
                  this.newrelictracker = new nrvideo.VideojsTracker(this);
                  nrvideo.Core.addTracker(this.newrelictracker);
                }
                return this.newrelictracker;
              });
            }
  
            /***/
          },
  
        /***/ "./src/techs/contrib-hls.js":
          /*!**********************************!*\
    !*** ./src/techs/contrib-hls.js ***!
    \**********************************/
          /***/ (__unused_webpack_module, exports) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            class ContribHlsTech {
              constructor(tech) {
                this.tech = tech.vhs;
              }
              getRenditionName() {
                try {
                  var media = this.tech.playlists.media();
                  if (media && media.attributes) return media.attributes.NAME;
                } catch (err) {}
                return null;
              }
              getRenditionBitrate() {
                try {
                  var media = this.tech.playlists.media();
                  if (media && media.attributes)
                    return media.attributes.BANDWIDTH;
                } catch (err) {}
                return null;
              }
              getRenditionWidth() {
                try {
                  var media = this.tech.playlists.media();
                  if (media && media.attributes && media.attributes.RESOLUTION) {
                    return media.attributes.RESOLUTION.width;
                  }
                } catch (err) {}
                return null;
              }
              getRenditionHeight() {
                try {
                  var media = this.tech.playlists.media();
                  if (media && media.attributes && media.attributes.RESOLUTION) {
                    return media.attributes.RESOLUTION.height;
                  }
                } catch (err) {}
                return null;
              }
            }
            exports["default"] = ContribHlsTech;
            ContribHlsTech.isUsing = function (tech) {
              return !!tech.vhs;
            };
  
            /***/
          },
  
        /***/ "./src/techs/hls-js.js":
          /*!*****************************!*\
    !*** ./src/techs/hls-js.js ***!
    \*****************************/
          /***/ (__unused_webpack_module, exports) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            class HlsJs {
              constructor(tech) {
                this.tech = tech.vhs_;
              }
              getResource(tech) {
                return this.tech.url;
              }
              getRenditionName(tech) {
                try {
                  var level = this.tech.levels[this.tech.currentLevel];
                  if (level && level.name) return level.name;
                } catch (err) {}
                return null;
              }
              getRenditionBitrate(tech) {
                try {
                  var level = this.tech.levels[this.tech.currentLevel];
                  if (level && level.bitrate) return level.bitrate;
                } catch (err) {}
                return null;
              }
              getRenditionWidth(tech) {
                try {
                  var level = this.tech.levels[this.tech.currentLevel];
                  if (level && level.width) return level.width;
                } catch (err) {}
                return null;
              }
              getRenditionHeight(tech) {
                try {
                  var level = this.tech.levels[this.tech.currentLevel];
                  if (level && level.height) return level.height;
                } catch (err) {}
                return null;
              }
            }
            exports["default"] = HlsJs;
            HlsJs.isUsing = function (tech) {
              return !!tech.vhs_;
            };
  
            /***/
          },
  
        /***/ "./src/techs/shaka.js":
          /*!****************************!*\
    !*** ./src/techs/shaka.js ***!
    \****************************/
          /***/ (__unused_webpack_module, exports) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            exports["default"] = void 0;
            class ShakaTech {
              constructor(tech) {
                this.tech = tech.shakaPlayer;
              }
              getSrc(tech) {
                try {
                  return this.tech.getManifestUri();
                } catch (err) {}
                return null;
              }
              getRenditionBitrate(tech) {
                try {
                  return this.tech.getStats().streamBandwidth;
                } catch (err) {}
                return null;
              }
              getRenditionWidth(tech) {
                try {
                  var tracks = this.tech.getVariantTracks();
                  for (var i in tracks) {
                    var track = tracks[i];
                    if (track.active && track.type === "video") {
                      return track.width;
                    }
                  }
                } catch (err) {}
                return null;
              }
              getRenditionHeight(tech) {
                try {
                  var tracks = this.tech.getVariantTracks();
                  for (var i in tracks) {
                    var track = tracks[i];
                    if (track.active && track.type === "video") {
                      return track.height;
                    }
                  }
                } catch (err) {}
                return null;
              }
            }
            exports["default"] = ShakaTech;
            ShakaTech.isUsing = function (tech) {
              return !!tech.shakaPlayer;
            };
  
            /***/
          },
  
        /***/ "./src/tracker.js":
          /*!************************!*\
    !*** ./src/tracker.js ***!
    \************************/
          /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            Object.defineProperty(exports, "__esModule", {
              value: true,
            });
            Object.defineProperty(exports, "BrightcoveImaAdsTracker", {
              enumerable: true,
              get: function () {
                return _brightcoveIma.default;
              },
            });
            Object.defineProperty(exports, "ContribHlsTech", {
              enumerable: true,
              get: function () {
                return _contribHls.default;
              },
            });
            Object.defineProperty(exports, "FreewheelAdsTracker", {
              enumerable: true,
              get: function () {
                return _freewheel.default;
              },
            });
            Object.defineProperty(exports, "HlsJsTech", {
              enumerable: true,
              get: function () {
                return _hlsJs.default;
              },
            });
            Object.defineProperty(exports, "ImaAdsTracker", {
              enumerable: true,
              get: function () {
                return _ima.default;
              },
            });
            Object.defineProperty(exports, "ShakaTech", {
              enumerable: true,
              get: function () {
                return _shaka.default;
              },
            });
            Object.defineProperty(exports, "VideojsAdsTracker", {
              enumerable: true,
              get: function () {
                return _videojsAds.default;
              },
            });
            exports["default"] = void 0;
            var nrvideo = _interopRequireWildcard(
              __webpack_require__(
                /*! newrelic-video-core */ "./node_modules/newrelic-video-core/src/index.js"
              )
            );
            var _package = _interopRequireDefault(
              __webpack_require__(/*! ../package.json */ "./package.json")
            );
            var _contribHls = _interopRequireDefault(
              __webpack_require__(
                /*! ./techs/contrib-hls */ "./src/techs/contrib-hls.js"
              )
            );
            var _hlsJs = _interopRequireDefault(
              __webpack_require__(/*! ./techs/hls-js */ "./src/techs/hls-js.js")
            );
            var _shaka = _interopRequireDefault(
              __webpack_require__(/*! ./techs/shaka */ "./src/techs/shaka.js")
            );
            var _videojsAds = _interopRequireDefault(
              __webpack_require__(
                /*! ./ads/videojs-ads */ "./src/ads/videojs-ads.js"
              )
            );
            var _ima = _interopRequireDefault(
              __webpack_require__(/*! ./ads/ima */ "./src/ads/ima.js")
            );
            var _brightcoveIma = _interopRequireDefault(
              __webpack_require__(
                /*! ./ads/brightcove-ima */ "./src/ads/brightcove-ima.js"
              )
            );
            var _freewheel = _interopRequireDefault(
              __webpack_require__(/*! ./ads/freewheel */ "./src/ads/freewheel.js")
            );
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _getRequireWildcardCache(e) {
              if ("function" != typeof WeakMap) return null;
              var r = new WeakMap(),
                t = new WeakMap();
              return (_getRequireWildcardCache = function (e) {
                return e ? t : r;
              })(e);
            }
            function _interopRequireWildcard(e, r) {
              if (!r && e && e.__esModule) return e;
              if (null === e || ("object" != typeof e && "function" != typeof e))
                return { default: e };
              var t = _getRequireWildcardCache(r);
              if (t && t.has(e)) return t.get(e);
              var n = { __proto__: null },
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var u in e)
                if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
                  var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
                  i && (i.get || i.set)
                    ? Object.defineProperty(n, u, i)
                    : (n[u] = e[u]);
                }
              return (n.default = e), t && t.set(e, n), n;
            }
            class VideojsTracker extends nrvideo.VideoTracker {
              getTech() {
                let tech = this.player.tech({
                  IWillNotUseThisInPlugins: true,
                });
                if (tech) {
                  if (_contribHls.default.isUsing(tech)) {
                    return new _contribHls.default(tech);
                  } else if (_hlsJs.default.isUsing(tech)) {
                    return new _hlsJs.default(tech);
                  } else if (_shaka.default.isUsing(tech)) {
                    return new _shaka.default(tech);
                  }
                }
              }
              getTrackerName() {
                return "videojs";
              }
              getTrackerVersion() {
                return _package.default.version;
              }
              getPlayhead() {
                if (
                  this.player.ads &&
                  this.player.ads.state === "ads-playback" &&
                  this.player.ads.snapshot &&
                  this.player.ads.snapshot.currentTime
                ) {
                  return this.player.ads.snapshot.currentTime * 1000;
                } else if (this.player.absoluteTime) {
                  return this.player.absoluteTime() * 1000;
                } else {
                  return this.player.currentTime() * 1000;
                }
              }
              getDuration() {
                if (
                  this.player.mediainfo &&
                  typeof this.player.mediainfo.duration !== "undefined"
                ) {
                  return this.player.mediainfo.duration * 1000; // Brightcove
                } else {
                  return this.player.duration() * 1000;
                }
              }
              getTitle() {
                if (this.player.mediainfo) {
                  return this.player.mediainfo.name; // Brightcove
                }
              }
              getLanguage() {
                return this.player?.language();
              }
              getSrc() {
                let tech = this.getTech();
                if (tech && tech.getSrc) {
                  return tech.getSrc();
                } else {
                  return this.player.currentSrc();
                }
              }
              getPlayerVersion() {
                return typeof videojs !== "undefined" && videojs.VERSION;
              }
              isMuted() {
                return this.player.muted();
              }
              getRenditionName() {
                let tech = this.getTech();
                if (tech && tech.getRenditionName) {
                  return tech.getRenditionName();
                }
              }
              getRenditionBitrate() {
                let tech = this.getTech();
                if (tech && tech.getRenditionBitrate) {
                  return tech.getRenditionBitrate();
                }
              }
              getRenditionHeight() {
                let tech = this.getTech();
                if (tech && tech.getRenditionHeight) {
                  return tech.getRenditionHeight();
                }
                return this.player.videoHeight();
              }
              getRenditionWidth() {
                let tech = this.getTech();
                if (tech && tech.getRenditionWidth) {
                  return tech.getRenditionWidth();
                }
                return this.player.videoWidth();
              }
              getPlayrate() {
                return this.player.playbackRate();
              }
              isAutoplayed() {
                return this.player.autoplay();
              }
              getPreload() {
                return this.player.preload();
              }
              registerListeners() {
                nrvideo.Log.debugCommonVideoEvents(this.player, [
                  "adstart",
                  "adend",
                  "adskip",
                  "adsready",
                  "adserror",
                  "dispose",
                ]);
                this.player.on("loadstart", this.onDownload.bind(this));
                this.player.on("loadeddata", this.onDownload.bind(this));
                this.player.on("loadedmetadata", this.onDownload.bind(this));
                this.player.on("adsready", this.onAdsready.bind(this));
                this.player.on("play", this.onPlay.bind(this));
                this.player.on("pause", this.onPause.bind(this));
                this.player.on("playing", this.onPlaying.bind(this));
                this.player.on("abort", this.onAbort.bind(this));
                this.player.on("ended", this.onEnded.bind(this));
                this.player.on("dispose", this.onDispose.bind(this));
                this.player.on("seeking", this.onSeeking.bind(this));
                this.player.on("seeked", this.onSeeked.bind(this));
                this.player.on("error", this.onError.bind(this));
                this.player.on("waiting", this.onWaiting.bind(this));
                this.player.on("timeupdate", this.onTimeupdate.bind(this));
              }
              unregisterListeners() {
                this.player.off("loadstart", this.onDownload);
                this.player.off("loadeddata", this.onDownload);
                this.player.off("loadedmetadata", this.onDownload);
                this.player.off("adsready", this.onAdsready);
                this.player.off("play", this.onPlay);
                this.player.off("pause", this.onPause);
                this.player.off("playing", this.onPlaying);
                this.player.off("abort", this.onAbort);
                this.player.off("ended", this.onEnded);
                this.player.off("dispose", this.onDispose);
                this.player.off("seeking", this.onSeeking);
                this.player.off("seeked", this.onSeeked);
                this.player.off("error", this.onError);
                this.player.off("waiting", this.onWaiting);
                this.player.off("timeupdate", this.onTimeupdate);
              }
              onDownload(e) {
                this.sendDownload({
                  state: e.type,
                });
              }
              onAdsready() {
                if (!this.adsTracker) {
                  if (_brightcoveIma.default.isUsing(this.player)) {
                    // BC IMA
                    this.setAdsTracker(new _brightcoveIma.default(this.player));
                  } else if (_ima.default.isUsing(this.player)) {
                    // IMA
                    this.setAdsTracker(new _ima.default(this.player));
                  } else if (_freewheel.default.isUsing(this.player)) {
                    // FW
                    this.setAdsTracker(new _freewheel.default(this.player));
                    // } else if (OnceAdsTracker.isUsing(this)) { // Once
                  } else {
                    // Generic
                    this.setAdsTracker(new _videojsAds.default(this.player));
                  }
                }
              }
              onPlay() {
                this.sendRequest();
              }
              onPause() {
                this.sendPause();
              }
              onPlaying() {
                this.sendResume();
                this.sendBufferEnd();
              }
              onAbort() {
                this.sendEnd();
              }
              onEnded() {
                this.sendEnd();
              }
              onDispose() {
                this.sendEnd();
              }
              onSeeking() {
                this.sendSeekStart();
              }
              onSeeked() {
                this.sendSeekEnd();
              }
              onError() {
                if (this.player.error && this.player.error()) {
                  this.sendError(this.player.error());
                }
              }
              onWaiting(e) {
                this.sendBufferStart();
              }
              onTimeupdate(e) {
                if (this.getPlayhead() > 0.1) {
                  this.sendStart();
                }
              }
            }
  
            // Static members
            exports["default"] = VideojsTracker;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/backend.js":
          /*!*********************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/backend.js ***!
    \*********************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /**
             * Backend class provides the basic logic to create event backends.
             * This class is intended to be subclassed, not directly used.
             *
             * @class Backend
             */
            class Backend {
              constructor() {
                /**
                 * Custom attributes
                 * @private
                 */
                this._attributes = {};
              }
  
              /**
               * Sends given event (to be overwritten by a subclass).
               * @param {String} event Event to send.
               * @param {Object} data Data associated to the event.
               */
              send(event, data) {
                data = Object.assign(data || {}, this._attributes);
              }
  
              /**
               * Store custom attribute.
               * @param {String} key Attribute name.
               * @param {Object} value Attribute value.
               */
              setAttribute(key, value) {
                this._attributes[key] = value;
              }
  
              /**
               * Store custom attribute list.
               * @param {Object} attr Attributes.
               */
              setAttributes(attr) {
                this._attributes.append(attr);
              }
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Backend;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/chrono.js":
          /*!********************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/chrono.js ***!
    \********************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /**
             * This class calculates time lapses between two points on time.
             */
            class Chrono {
              /**
               * Constructor
               */
              constructor() {
                this.reset();
              }
  
              /** Reset chrono values. */
              reset() {
                /** Start time */
                this.startTime = 0;
  
                /** Stop time */
                this.stopTime = 0;
  
                /**
                 * If you set an offset in a chrono, its value will be added getDeltaTime and stop.
                 *
                 * @example
                 * let chrono = new Chrono()
                 * chrono.offset = 500
                 * chrono.start()
                 * process.sleep(500)
                 * chrono.stop() // Will return 1000
                 *
                 * @type {number}
                 */
                this.offset = 0;
              }
  
              /**
               * Returns the time between start() and the last stop() in ms. Returns null if start wasn't
               * called.
               * @return {(number|null)} Time lapse in ms.
               */
              getDeltaTime() {
                if (this.startTime) {
                  return this.offset + (new Date().getTime() - this.startTime);
                } else {
                  return null;
                }
              }
  
              /**
               * Starts the chrono.
               */
              start() {
                this.startTime = new Date().getTime();
                this.stopTime = 0;
              }
  
              /**
               * Stops the timer and returns delta time.
               * @return {(number|null)} Returns the delta time
               */
              stop() {
                this.stopTime = new Date().getTime();
                return this.getDeltaTime();
              }
  
              /**
               * Creates a copy of the chrono.
               * @returns {Chrono} Cloned chrono
               */
              clone() {
                var chrono = new Chrono();
                chrono.startTime = this.startTime;
                chrono.stopTime = this.stopTime;
                chrono.offset = this.offset;
                return chrono;
              }
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Chrono;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/constants.js":
          /*!***********************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/constants.js ***!
    \***********************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /**
             * Constants for the library.
             * @class Constants
             * @static
             */
            class Constants {}
  
            /**
             * Enum for types/positions of ads.
             * @example var type = Constants.AdPositions.PRE
             * @enum {String}
             */
            Constants.AdPositions = {
              /** For ads shown before the content. */
              PRE: "pre",
              /** For ads shown during the content. */
              MID: "mid",
              /** For ads shown after the content. */
              POST: "post",
            };
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Constants;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/core.js":
          /*!******************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/core.js ***!
    \******************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ./log */ "./node_modules/newrelic-video-core/src/log.js"
              );
            /* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ./backend */ "./node_modules/newrelic-video-core/src/backend.js"
              );
  
            /**
             * Static class that sums up core functionalities of the library.
             * @static
             */
            class Core {
              /**
               * Add a tracker to the system. Trackers added will start reporting its events to NR's backend.
               *
               * @param {(Emitter|Tracker)} tracker Tracker instance to add.
               */
              static addTracker(tracker) {
                if (tracker.on && tracker.emit) {
                  trackers.push(tracker);
                  tracker.on("*", eventHandler);
                  if (typeof tracker.trackerInit == "function") {
                    tracker.trackerInit();
                  }
                } else {
                  _log__WEBPACK_IMPORTED_MODULE_0__["default"].error(
                    "Tried to load a non-tracker.",
                    tracker
                  );
                }
              }
  
              /**
               * Disposes and remove given tracker. Removes its listeners.
               *
               * @param {Tracker} tracker Tracker to remove.
               */
              static removeTracker(tracker) {
                tracker.off("*", eventHandler);
                tracker.dispose();
                let index = trackers.indexOf(tracker);
                if (index !== -1) trackers.splice(index, 1);
              }
  
              /**
               * Returns the array of trackers.
               *
               * @returns {Tracker[]} Array of trackers.
               */
              static getTrackers() {
                return trackers;
              }
  
              /**
               * Returns the current backend.
               *
               * @returns {Backend} The current backend.
               */
              static getBackend() {
                return backend;
              }
  
              /**
               * Sets the current backend.
               * @param {Backend} backendInstance Backend instance.
               */
              static setBackend(backendInstance) {
                backend = backendInstance;
              }
  
              /**
               * Sends given event using the appropriate backend.
               * @param {String} event Event to send.
               * @param {Object} data Data associated to the event.
               */
              static send(event, data) {
                if (
                  Core.getBackend() == undefined ||
                  !(
                    Core.getBackend() instanceof
                    _backend__WEBPACK_IMPORTED_MODULE_1__["default"]
                  )
                ) {
                  // Use the default backend (NR Agent)
                  if (typeof newrelic !== "undefined" && newrelic.addPageAction) {
                    newrelic.addPageAction(event, data);
                  } else {
                    if (!isErrorShown) {
                      _log__WEBPACK_IMPORTED_MODULE_0__["default"].error(
                        "newrelic.addPageAction() is not available.",
                        "In order to use NewRelic Video you will need New Relic Browser Agent."
                      );
                      isErrorShown = true;
                    }
                  }
                } else {
                  // Use the user-defined backend
                  Core.getBackend().send(event, data);
                }
              }
  
              /**
               * Sends an error event. This may be used for external errors launched by the app, the network or
               * any external factor. Note that errors within the player are normally reported with
               * tracker.sendError, so this method should not be used to report those.
               *
               * @param {object} att attributes to be sent along the error.
               */
              static sendError(att) {
                Core.send("ERROR", att);
              }
            }
  
            let trackers = [];
            let backend;
            let isErrorShown = false;
  
            /**
             * Logs and sends given event.
             *
             * @private
             * @param {Event} e Event
             */
            function eventHandler(e) {
              let data = cleanData(e.data);
              if (
                _log__WEBPACK_IMPORTED_MODULE_0__["default"].level <=
                _log__WEBPACK_IMPORTED_MODULE_0__["default"].Levels.DEBUG
              ) {
                _log__WEBPACK_IMPORTED_MODULE_0__["default"].notice(
                  "Sent",
                  e.type,
                  data
                );
              } else {
                _log__WEBPACK_IMPORTED_MODULE_0__["default"].notice(
                  "Sent",
                  e.type
                );
              }
              Core.send(e.type, data);
            }
  
            /**
             * Cleans given object, removing all items with value === null.
             * @private
             * @param {Object} data Data to clean
             * @returns {Object} Cleaned object
             */
            function cleanData(data) {
              let ret = {};
              for (let i in data) {
                if (data[i] !== null && typeof data[i] !== "undefined")
                  ret[i] = data[i];
              }
              return ret;
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Core;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/emitter.js":
          /*!*********************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/emitter.js ***!
    \*********************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /**
             * This base class implements a basic behavior of listeners and events. Extend this object to have
             * this feature built-in inside your classes.
             *
             * @class Emitter
             */
            class Emitter {
              /**
               * Sets a listener to a given event. Use {@link emit} to trigger those events.
               * Pass '*' to listen ALL events.
               *
               * @param {string} event Name of the event.
               * @param {function} callback Callback of the event. Receives event and data.
               * @return this
               */
              on(event, callback) {
                this._listeners = this._listeners || {};
                if (typeof callback === "function") {
                  this._listeners[event] = this._listeners[event] || [];
                  this._listeners[event].push(callback);
                  return this;
                }
              }
  
              /**
               * Removes given callback from the listeners of this object.
               *
               * @param {string} event Name of the event.
               * @param {function} callback Callback of the event.
               * @return this
               */
              off(event, callback) {
                this._listeners = this._listeners || {};
  
                if (this._listeners[event]) {
                  var index = this._listeners[event].indexOf(callback);
                  if (index !== -1) {
                    this._listeners[event].splice(index, 1);
                  }
                }
                return this;
              }
  
              /**
               * Emits given event, triggering all the associated callbacks.
               *
               * @param {string} event Name of the event.
               * @param {object} [data] Custom data to be sent to the callbacks.
               * @return this
               */
              emit(event, data) {
                this._listeners = this._listeners || {};
                data = data || {};
  
                if (Array.isArray(this._listeners[event])) {
                  this._listeners[event].forEach((callback) => {
                    callback.call(this, {
                      type: event,
                      data: data,
                      target: this,
                    });
                  });
                }
  
                if (Array.isArray(this._listeners["*"])) {
                  this._listeners["*"].forEach((callback) => {
                    callback.call(this, {
                      type: event,
                      data: data,
                      target: this,
                    });
                  });
                }
  
                return this;
              }
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Emitter;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/index.js":
          /*!*******************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/index.js ***!
    \*******************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ Backend: () =>
                /* reexport safe */ _backend__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ],
              /* harmony export */ Chrono: () =>
                /* reexport safe */ _chrono__WEBPACK_IMPORTED_MODULE_4__[
                  "default"
                ],
              /* harmony export */ Constants: () =>
                /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ],
              /* harmony export */ Core: () =>
                /* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_2__["default"],
              /* harmony export */ Emitter: () =>
                /* reexport safe */ _emitter__WEBPACK_IMPORTED_MODULE_6__[
                  "default"
                ],
              /* harmony export */ Log: () =>
                /* reexport safe */ _log__WEBPACK_IMPORTED_MODULE_5__["default"],
              /* harmony export */ NRInsightsBackend: () =>
                /* reexport safe */ _plugins_nrinsightsbackend__WEBPACK_IMPORTED_MODULE_1__[
                  "default"
                ],
              /* harmony export */ Tracker: () =>
                /* reexport safe */ _tracker__WEBPACK_IMPORTED_MODULE_7__[
                  "default"
                ],
              /* harmony export */ VideoTracker: () =>
                /* reexport safe */ _videotracker__WEBPACK_IMPORTED_MODULE_8__[
                  "default"
                ],
              /* harmony export */ VideoTrackerState: () =>
                /* reexport safe */ _videotrackerstate__WEBPACK_IMPORTED_MODULE_9__[
                  "default"
                ],
              /* harmony export */ version: () =>
                /* reexport safe */ _package_json__WEBPACK_IMPORTED_MODULE_10__.version,
              /* harmony export */
            });
            /* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ./backend */ "./node_modules/newrelic-video-core/src/backend.js"
              );
            /* harmony import */ var _plugins_nrinsightsbackend__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ./plugins/nrinsightsbackend */ "./node_modules/newrelic-video-core/src/plugins/nrinsightsbackend.js"
              );
            /* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(
                /*! ./core */ "./node_modules/newrelic-video-core/src/core.js"
              );
            /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ =
              __webpack_require__(
                /*! ./constants */ "./node_modules/newrelic-video-core/src/constants.js"
              );
            /* harmony import */ var _chrono__WEBPACK_IMPORTED_MODULE_4__ =
              __webpack_require__(
                /*! ./chrono */ "./node_modules/newrelic-video-core/src/chrono.js"
              );
            /* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5__ =
              __webpack_require__(
                /*! ./log */ "./node_modules/newrelic-video-core/src/log.js"
              );
            /* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_6__ =
              __webpack_require__(
                /*! ./emitter */ "./node_modules/newrelic-video-core/src/emitter.js"
              );
            /* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_7__ =
              __webpack_require__(
                /*! ./tracker */ "./node_modules/newrelic-video-core/src/tracker.js"
              );
            /* harmony import */ var _videotracker__WEBPACK_IMPORTED_MODULE_8__ =
              __webpack_require__(
                /*! ./videotracker */ "./node_modules/newrelic-video-core/src/videotracker.js"
              );
            /* harmony import */ var _videotrackerstate__WEBPACK_IMPORTED_MODULE_9__ =
              __webpack_require__(
                /*! ./videotrackerstate */ "./node_modules/newrelic-video-core/src/videotrackerstate.js"
              );
            /* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_10__ =
              __webpack_require__(
                /*! ../package.json */ "./node_modules/newrelic-video-core/package.json"
              );
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/log.js":
          /*!*****************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/log.js ***!
    \*****************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /**
             * Static Log class
             *
             * @class
             * @static
             */
            class Log {
              /**
               * Sends an error console log.
               * @param {...any} [msg] Message to show
               * @static
               */
              static error(...msg) {
                _report(msg, Log.Levels.ERROR, "darkred");
              }
  
              /**
               * Sends a warning console log.
               * @method Log.warn
               * @static
               * @param {...any} msg Message to show
               */
              static warn(...msg) {
                _report(msg, Log.Levels.WARNING, "darkorange");
              }
  
              /**
               * Sends a notice console log.
               * @method Log.notice
               * @static
               * @param {...any} msg Message to show
               */
              static notice(...msg) {
                _report([].slice.call(arguments), Log.Levels.NOTICE, "darkcyan");
              }
  
              /**
               * Sends a debug message to console.
               * @method Log.debug
               * @static
               * @param {...any} msg Message to show
               */
              static debug(...msg) {
                _report(msg, Log.Levels.DEBUG, "indigo");
              }
  
              /**
               * This utility method will add most of the HTML5 common event listeners to the player sent.
               * Events will be reported as DEBUG level messages.
               *
               * @example
               * // Already included events:
               * ['canplay', 'buffering', 'waiting', 'ended', 'play', 'playing', 'pause', 'resume', 'error',
               * 'abort', 'seek', 'seeking', 'seeked', 'stalled', 'dispose', 'loadeddata', 'loadstart',
               * 'loadedmetadata']
               *
               * @method Log.debugCommonVideoEvents
               * @static
               * @param {object|function} o Object to attach the events.
               * @param {array} [extraEvents]
               * An array of extra events to watch. ie:  ['timeupdate', 'progress'].
               * If the first item is null, no common events will be added.
               * @param {function} [report] Callback function called to report events.
               * Default calls Log.debug()
               */
              static debugCommonVideoEvents(o, extraEvents, report) {
                try {
                  if (Log.level <= Log.Levels.DEBUG) {
                    report =
                      report ||
                      function (e) {
                        Log.debug("Event: " + e.type);
                      };
  
                    var playerEvents = [
                      "canplay",
                      "buffering",
                      "waiting",
                      "ended",
                      "play",
                      "playing",
                      "pause",
                      "resume",
                      "error",
                      "abort",
                      "seek",
                      "seeking",
                      "seeked",
                      "stalled",
                      "dispose",
                      "loadeddata",
                      "loadstart",
                      "loadedmetadata",
                    ];
                    if (extraEvents) {
                      if (extraEvents[0] === null) {
                        extraEvents.shift();
                        playerEvents = extraEvents;
                      } else {
                        playerEvents = playerEvents.concat(extraEvents);
                      }
                    }
  
                    for (var i = 0; i < playerEvents.length; i++) {
                      if (typeof o === "function") {
                        o.call(window, playerEvents[i], report);
                      } else if (o.on) {
                        o.on(playerEvents[i], report);
                      } else if (o.addEventListener) {
                        o.addEventListener(playerEvents[i], report);
                      } else if (o.addEventHandler) {
                        o.addEventHandler(playerEvents[i], report);
                      } else {
                        Log.warn(
                          "debugCommonVideoEvents: No common listener function found for ",
                          o
                        );
                      }
                    }
                  }
                } catch (err) {
                  Log.warn(err);
                }
              }
            }
  
            /**
             * Enum for log levels
             * @enum {integer}
             * @static
             * @var
             */
            Log.Levels = {
              /** No console outputs */
              SILENT: 5,
              /** Console will show errors */
              ERROR: 4,
              /** Console will show warnings */
              WARNING: 3,
              /** Console will show notices (ie: life-cyrcle logs) */
              NOTICE: 2,
              /** Console will show debug messages. */
              DEBUG: 1,
              /** Show all messages. */
              ALL: 0,
            };
  
            /**
             * Only logs of this imporance or higher will be shown.
             * @example Log.level = Log.Levels.ALL
             * @default Log.Levels.ERROR
             * @static
             */
            Log.level = Log.Levels.ERROR;
  
            /**
             * If true, logs will be outputed with colors.
             * @default true
             * @static
             */
            Log.colorful = true;
  
            /**
             * If true, logs will include the time mark.
             * @default true
             * @static
             */
            Log.includeTime = true;
  
            /**
             * Prefix included at the start of every log.
             * @default '[New Relic]'
             * @static
             */
            Log.prefix = "[nrvideo]";
  
            // PRIVATE MEMBERS
  
            /**
             * Returns a console message
             *
             * @private
             * @param {array} msg Message array, error object or array of messages.
             * @param {Log.Level} [level=Log.Levels.NOTICE] Defines the level of the error sent.
             * Only errors with higher or equal level than Log.logLevel will be displayed.
             * @param {string} [color='darkgreen'] Color of the header
             * @see {@link Log.level}
             */
            function _report(msg, level, color) {
              level = level || Log.Levels.NOTICE;
              color = color || "darkcyan";
  
              var prefix = Log.prefix;
              if (Log.includeTime) prefix += _getCurrentTime() + " ";
              prefix += _level2letter(level) + ":";
  
              // Show messages in actual console if level is enought
              if (Log.level <= level && level !== Log.Levels.SILENT) {
                if (
                  !Log.colorful ||
                  (typeof document !== "undefined" && document.documentMode)
                ) {
                  // document.documentMode exits only in IE
                  _plainReport(msg, prefix);
                } else {
                  // choose log method
                  var logMethod;
                  if (level === Log.Levels.ERROR && console.error) {
                    logMethod = console.error;
                  } else if (level === Log.Levels.WARNING && console.warn) {
                    logMethod = console.warn;
                  } else if (level === Log.Levels.DEBUG && console.debug) {
                    // NOTE: for some reason console.debug doesn't work on CAF Receivers.
                    if (window.cast == undefined) {
                      logMethod = console.debug;
                    } else {
                      logMethod = console.log;
                    }
                  } else {
                    logMethod = console.log;
                  }
  
                  // print message
                  prefix = "%c" + prefix;
                  msg.splice(0, 0, prefix, "color: " + color);
                  logMethod.apply(console, msg);
                }
              }
            }
  
            /**
             * Returns the current time in format hh:mm:ss.mmm (with trailing 0s)
             * @private
             * @return {string} Current time.
             */
            function _getCurrentTime() {
              var d = new Date();
              var hh = ("0" + d.getDate()).slice(-2);
              var mm = ("0" + d.getMinutes()).slice(-2);
              var ss = ("0" + d.getSeconds()).slice(-2);
              var mmm = ("00" + d.getMilliseconds()).slice(-3);
              return "[" + hh + ":" + mm + ":" + ss + "." + mmm + "]";
            }
  
            /**
             * Returns a console message without style
             *
             * @private
             * @param {(string|object|array)} msg Message string, object or array of messages.
             * @param {string} prefix Prefix of the message.
             */
            function _plainReport(msg, prefix) {
              if (msg instanceof Array) {
                for (var m in msg) {
                  _plainReport(msg[m], prefix);
                }
              } else {
                if (typeof msg === "string") {
                  console.log(prefix + " " + msg);
                } else {
                  console.log(prefix + "↵");
                  console.log(msg);
                }
              }
            }
  
            const _letters = {
              4: "e", // Error
              3: "w", // Warning
              2: "n", // Notice
              1: "d", // Debug
            };
  
            /**
             * Transforms a level to a letter to identify every message.
             *
             * @private
             * @param {sLog.Level} level Level of the message
             */
            function _level2letter(level) {
              return _letters[level];
            }
  
            /**
             * This function is automatically executed at load.
             * Will search inside window.location.search for attribute 'nrvideo-debug=X'.
             * X can have one of these values, that will modify Log.Levels.
             * 5: SILENT,
             * 4: ERROR,
             * 3: WARNING,
             * 2: NOTICE,
             * 1: DEBUG,
             *
             * If nrvideo-colors=false is present, Log.colorful will be set to false.
             *
             * @private
             */
            function _loadLevelFromUrl() {
              if (
                typeof window !== "undefined" &&
                window.location &&
                window.location.search
              ) {
                var m = /\?.*&*nrvideo-debug=(.+)/i.exec(window.location.search);
                if (m !== null) {
                  if (m[1] === "true") {
                    Log.level = Log.Levels.ALL;
                  } else {
                    Log.level = m[1];
                  }
                }
  
                var m2 = /\?.*&*nrvideo-colors=false/i.exec(
                  window.location.search
                );
                if (m2 !== null) {
                  Log.colorful = false;
                }
              }
            }
  
            // Execute load level
            _loadLevelFromUrl();
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Log;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/plugins/nrinsightsbackend.js":
          /*!***************************************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/plugins/nrinsightsbackend.js ***!
    \***************************************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ../backend */ "./node_modules/newrelic-video-core/src/backend.js"
              );
            /* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ../log */ "./node_modules/newrelic-video-core/src/log.js"
              );
  
            /**
             * Implements a New Relic Insights API backend. For a description of what is a Backend, see {@link Backend}.
             * It must be initialized using a New Relic Account ID and an Insights API insert key.
             *
             * @example
             * let backend = new nrvideo.NRInsightsBackend("ACCOUNT ID", "API KEY")
             * nrvideo.Core.setBackend(backend)
             *
             * @extends Backend
             */
            class NRInsightsBackend extends _backend__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ] {
              /**
               * Constructor, receives account ID, API Key and (optionally) an event type.
               *
               * @param {String} [accountId] Insights Account ID.
               * @param {String} [apiKey] Insights API Key.
               * @param {String} [eventType] Insights event type. Default 'BrowserVideo'.
               */
              constructor(accountId, apiKey, eventType = "BrowserVideo") {
                super();
  
                /**
                 * Insights account ID.
                 * @private
                 */
                this._accountId = accountId;
  
                /**
                 * Insights API Key.
                 * @private
                 */
                this._apiKey = apiKey;
  
                /**
                 * Insights event type.
                 * @private
                 */
                this._eventType = eventType;
  
                /**
                 * Buffer to store events.
                 * @private
                 */
                this._eventBuffer = [];
  
                /**
                 * Harvest timer lock.
                 * @private
                 */
                this._harvestLocked = false;
  
                /**
                 * Last timestamp.
                 * @private
                 */
                this._lastTimestamp = 0;
  
                // Define harvest timer handler
                setInterval(() => {
                  this.harvestHandler(NRInsightsBackend.Source.TIMER);
                }, 10000);
              }
  
              send(event, data) {
                super.send(event, data);
                if (this._eventBuffer.length < 500) {
                  data = this.generateAttributes(data);
                  data["eventType"] = this._eventType;
                  data["actionName"] = event;
                  // Mechanism to avoid having two events with the same timestamp
                  let timestamp = Date.now();
                  if (timestamp > this._lastTimestamp) {
                    data["timestamp"] = timestamp;
                    this._lastTimestamp = timestamp;
                  } else {
                    this._lastTimestamp++;
                    data["timestamp"] = this._lastTimestamp;
                  }
                  this._eventBuffer.push(data);
                }
              }
  
              generateAttributes(data) {
                data["pageUrl"] = window.location.href;
                data["currentUrl"] =
                  window.location.origin + window.location.pathname;
                data["referrerUrl"] = document.referrer;
  
                let OSName = "Unknown";
                if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
                else if (navigator.userAgent.indexOf("Android") != -1)
                  OSName = "Android";
                else if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac";
                else if (navigator.userAgent.match(/iPhone|iPad|iPod/i))
                  OSName = "iOS";
                else if (navigator.userAgent.indexOf("Linux") != -1)
                  OSName = "Linux";
                else if (navigator.userAgent.indexOf("X11") != -1)
                  OSName = "UNIX";
                data["userAgentOS"] = OSName;
  
                let agentName = "Unknown";
                if (navigator.userAgent.indexOf("Chrome") != -1)
                  agentName = "Chrome";
                else if (navigator.userAgent.indexOf("Firefox") != -1)
                  agentName = "Firefox";
                else if (navigator.userAgent.indexOf("MSIE") != -1)
                  agentName = "IE";
                else if (navigator.userAgent.indexOf("Edge") != -1)
                  agentName = "Microsoft Edge";
                else if (navigator.userAgent.indexOf("Safari") != -1)
                  agentName = "Safari";
                else if (navigator.userAgent.indexOf("Opera") != -1)
                  agentName = "Opera";
                data["userAgentName"] = agentName;
  
                let deviceType = "Unknown";
                if (navigator.userAgent.match(/Tablet|iPad/i))
                  deviceType = "Tablet";
                else if (
                  navigator.userAgent.match(
                    /Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i
                  )
                )
                  deviceType = "Mobile";
                else if (window.cast != undefined) deviceType = "Cast";
                else deviceType = "Desktop";
                data["deviceType"] = deviceType;
  
                return data;
              }
  
              harvestHandler(source) {
                if (
                  source == NRInsightsBackend.Source.TIMER &&
                  this._harvestLocked
                ) {
                  _log__WEBPACK_IMPORTED_MODULE_1__["default"].debug(
                    "Harvest still locked, abort"
                  );
                  return;
                }
  
                this._harvestLocked = true;
  
                if (this._eventBuffer.length > 0) {
                  _log__WEBPACK_IMPORTED_MODULE_1__["default"].debug(
                    "Push events to Insights = ",
                    this._eventBuffer
                  );
                  this.pushEventToInsights(this._eventBuffer.pop());
                } else {
                  this._harvestLocked = false;
                }
              }
  
              pushEventToInsights(ev) {
                const requestOptions = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Insert-Key": this._apiKey,
                  },
                  body: JSON.stringify(ev),
                };
  
                const url =
                  "https://insights-collector.newrelic.com/v1/accounts/" +
                  this._accountId +
                  "/events";
                fetch(url, requestOptions)
                  .then((response) => response.json())
                  .then((data) => this.insightsRequestResponse(data))
                  .catch((error) => {
                    _log__WEBPACK_IMPORTED_MODULE_1__["default"].error(
                      "Error:",
                      error,
                      ev
                    );
                    // Put back the event and abort current fetch process
                    this._eventBuffer.push(ev);
                    this._harvestLocked = false;
                  });
              }
  
              insightsRequestResponse(data) {
                // Send next event
                this.harvestHandler(NRInsightsBackend.Source.FETCH);
              }
            }
  
            NRInsightsBackend.Source = {
              TIMER: "TIMER",
              FETCH: "FETCH",
            };
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              NRInsightsBackend;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/tracker.js":
          /*!*********************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/tracker.js ***!
    \*********************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ../package.json */ "./node_modules/newrelic-video-core/package.json"
              );
            /* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ./emitter */ "./node_modules/newrelic-video-core/src/emitter.js"
              );
            /* harmony import */ var _chrono__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(
                /*! ./chrono */ "./node_modules/newrelic-video-core/src/chrono.js"
              );
  
            /**
             * Tracker class provides the basic logic to extend Newrelic's Browser Agent capabilities.
             * Trackers are designed to listen third party elements (like video tags, banners, etc.) and send
             * information over to Browser Agent. Extend this class to create your own tracker, override
             * registerListeners and unregisterListeners for full coverage!
             *
             * @example
             * Tracker instances should be added to Core library to start sending data:
             * nrvideo.Core.addTracker(new Tracker())
             *
             * @extends Emitter
             */
            class Tracker extends _emitter__WEBPACK_IMPORTED_MODULE_1__[
              "default"
            ] {
              /**
               * Constructor, receives options. You should call {@see registerListeners} after this.
               *
               * @param {Object} [options] Options for the tracker. See {@link setOptions}.
               */
              constructor(options) {
                super();
  
                /**
                 * If you add something to this custom dictionary it will be added to every action. If you set
                 * any value, it will always override the values returned by the getters.
                 *
                 * @example
                 * If you define tracker.customData.contentTitle = 'a' and tracker.getTitle() returns 'b'.
                 * 'a' will prevail.
                 */
                this.customData = {};
  
                /**
                 * Set time between hearbeats, in ms.
                 */
                this.heartbeat = null;
  
                /**
                 * Another Tracker instance. Useful to relate ad Trackers to their parent content Trackers.
                 * @type Tracker
                 */
                this.parentTracker = null;
  
                /**
                 * Chrono that counts time since this class was instantiated.
                 * @private
                 */
                this._trackerReadyChrono =
                  new _chrono__WEBPACK_IMPORTED_MODULE_2__["default"]();
                this._trackerReadyChrono.start();
  
                options = options || {};
                this.setOptions(options);
              }
  
              /**
               * Set options for the Tracker.
               *
               * @param {Object} [options] Options for the tracker.
               * @param {number} [options.heartbeat] Set time between heartbeats. See {@link heartbeat}.
               * @param {Object} [options.customData] Set custom data. See {@link customData}.
               * @param {Tracker} [options.parentTracker] Set parent tracker. See {@link parentTracker}.
               */
              setOptions(options) {
                if (options) {
                  if (options.parentTracker)
                    this.parentTracker = options.parentTracker;
                  if (options.customData) this.customData = options.customData;
                  if (options.heartbeat) this.heartbeat = options.heartbeat;
                }
              }
  
              /**
               * Prepares tracker to dispose. Calls {@see unregisterListeners} and drops references.
               */
              dispose() {
                this.unregisterListeners();
              }
  
              /**
               * Override this method to register listeners to third party elements.
               *
               * @example
               * class SpecificTracker extends Tracker {
               *  registerListeners() {
               *    this.player.on('play', () => this.playHandler)
               *  }
               *
               *  playHandler() {
               *    this.emit(Tracker.Events.REQUESTED)
               *  }
               * }
               */
              registerListeners() {}
  
              /**
               * Override this method to unregister listeners to third party elements created with
               * {@see registerListeners}.
               *
               * @example
               * class SpecificTracker extends Tracker {
               *  registerListeners() {
               *    this.player.on('play', () => this.playHandler)
               *  }
               *
               *  unregisterListeners() {
               *    this.player.off('play', () => this.playHandler)
               *  }
               *
               *  playHandler() {
               *    this.emit(Tracker.Events.REQUESTED)
               *  }
               * }
               */
              unregisterListeners() {}
  
              /**
               * Returns heartbeat time interval. 30000 (30s) if not set. See {@link setOptions}.
               * @return {number} Heartbeat interval in ms.
               * @final
               */
              getHeartbeat() {
                if (this.heartbeat) {
                  return this.heartbeat;
                } else if (this.parentTracker && this.parentTracker.heartbeat) {
                  return this.parentTracker.heartbeat;
                } else {
                  return 30000;
                }
              }
  
              /**
               * Starts heartbeating. Interval period set by options.heartbeat. Min 5000 ms.
               * This method is automaticaly called by the tracker once sendRequest is called.
               */
              startHeartbeat() {
                this._heartbeatInterval = setInterval(
                  this.sendHeartbeat.bind(this),
                  Math.max(this.getHeartbeat(), 5000)
                );
              }
  
              /**
               * Stops heartbeating. This method is automaticaly called by the tracker.
               */
              stopHeartbeat() {
                if (this._heartbeatInterval) {
                  clearInterval(this._heartbeatInterval);
                }
              }
  
              /**
               * Heartbeating allows you to call this function each X milliseconds, defined by
               * {@link getHeartbeat}. This is useful to send regular events to track changes.
               *
               * By default it will send {@link Tracker.Events.HEARTBEAT}.
               * To start heartbeating use {@link startHeartbeat} and to stop them use {@link stopHeartbeat}.
               *
               * @example
               * Override this method to define your own Heartbeat reporting.
               *
               * class TrackerChild extends Tracker {
               *  sendHeartbeat (att) {
               *    this.send('MY_HEARBEAT_EVENT')
               *  }
               * }
               *
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendHeartbeat(att) {
                this.send(Tracker.Events.HEARTBEAT, att);
              }
  
              /**
               * Override this method to return attributes for actions.
               *
               * @example
               * class SpecificTracker extends Tracker {
               *  getAttributes(att) {
               *    att = att || {}
               *    att.information = 'something'
               *    return att
               *  }
               * }
               *
               * @param {object} [att] Collection of key value attributes
               * @return {object} Filled attributes
               * @final
               */
              getAttributes(att) {
                att = att || {};
                att.trackerName = this.getTrackerName();
                att.trackerVersion = this.getTrackerVersion();
                att.coreVersion =
                  _package_json__WEBPACK_IMPORTED_MODULE_0__.version;
                att.timeSinceTrackerReady =
                  this._trackerReadyChrono.getDeltaTime();
  
                for (let key in this.customData) {
                  att[key] = this.customData[key];
                }
  
                if (document.hidden != undefined) {
                  att.isBackgroundEvent = document.hidden;
                }
  
                return att;
              }
  
              /** Override to change of the Version of tracker. ie: '1.0.1' */
              getTrackerVersion() {
                return _package_json__WEBPACK_IMPORTED_MODULE_0__.version;
              }
  
              /** Override to change of the Name of the tracker. ie: 'custom-html5' */
              getTrackerName() {
                return "base-tracker";
              }
  
              /**
               * Send given event. Will automatically call {@see getAttributes} to fill information.
               * Internally, this will call {@see Emitter#emit}, so you could listen any event fired.
               *
               * @example
               * tracker.send('BANNER_CLICK', { url: 'http....' })
               *
               * @param {string} event Event name
               * @param {object} [att] Key:value dictionary filled with attributes.
               */
              send(event, att) {
                this.emit(event, this.getAttributes(att));
              }
            }
  
            /**
             * Enumeration of events fired by this class.
             *
             * @static
             * @memberof Tracker
             * @enum {string}
             */
            Tracker.Events = {
              /** The heartbeat event is sent once every 30 seconds while the video is playing. */
              HEARTBEAT: "HEARTBEAT",
            };
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Tracker;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/videotracker.js":
          /*!**************************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/videotracker.js ***!
    \**************************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ./log */ "./node_modules/newrelic-video-core/src/log.js"
              );
            /* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ./tracker */ "./node_modules/newrelic-video-core/src/tracker.js"
              );
            /* harmony import */ var _videotrackerstate__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(
                /*! ./videotrackerstate */ "./node_modules/newrelic-video-core/src/videotrackerstate.js"
              );
  
            /**
             * Base video tracker class provides extensible tracking over video elements. See {@link Tracker}.
             * Extend this class to create your own video tracker class. Override getter methods and
             * registerListeners/unregisterListeners to provide full integration with your video experience.
             *
             * @example
             * Tracker instances should be added to Core library to start sending data:
             * nrvideo.Core.addTracker(new Tracker())
             *
             * @extends Tracker
             */
            class VideoTracker extends _tracker__WEBPACK_IMPORTED_MODULE_1__[
              "default"
            ] {
              /**
               * Constructor, receives player and options.
               * Lifecycle: constructor > {@link setOptions} > {@link setPlayer} > {@link registerListeners}.
               *
               * @param {Object} [player] Player to track. See {@link setPlayer}.
               * @param {Object} [options] Options for the tracker. See {@link setOptions}.
               */
              constructor(player, options) {
                super();
  
                /**
                 * TrackerState instance. Stores the state of the view. Tracker will automatically update the
                 * state of its instance, so there's no need to modify/interact with it manually.
                 * @type TrackerState
                 */
                this.state = new _videotrackerstate__WEBPACK_IMPORTED_MODULE_2__[
                  "default"
                ]();
  
                /**
                 * Another Tracker instance to track ads.
                 * @type Tracker
                 */
                this.adsTracker = null;
  
                /**
                 * Last bufferType value.
                 * @private
                 */
                this._lastBufferType = null;
  
                options = options || {};
                this.setOptions(options);
                if (player) this.setPlayer(player, options.tag);
  
                _log__WEBPACK_IMPORTED_MODULE_0__["default"].notice(
                  "Tracker " +
                    this.getTrackerName() +
                    " v" +
                    this.getTrackerVersion() +
                    " is ready."
                );
              }
  
              /**
               * Set options for the Tracker.
               *
               * @param {Object} [options] Options for the tracker.
               * @param {Boolean} [options.isAd] True if the tracker is tracking ads. See {@link setIsAd}.
               * @param {number} [options.heartbeat] Set time between heartbeats. See {@link heartbeat}.
               * @param {Object} [options.customData] Set custom data. See {@link customData}.
               * @param {Tracker} [options.parentTracker] Set parent tracker. See {@link parentTracker}.
               * @param {Tracker} [options.adsTracker] Set ads tracker. See {@link adsTracker}.
               * @param {Object} [options.tag] DOM element to track. See {@link setPlayer}.
               */
              setOptions(options) {
                if (options) {
                  if (options.adsTracker) this.setAdsTracker(options.adsTracker);
                  if (typeof options.isAd === "boolean")
                    this.setIsAd(options.isAd);
                  _tracker__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ].prototype.setOptions.apply(this, arguments);
                }
              }
  
              /**
               * Set a player and/or a tag. If there was one already defined, it will call dispose() first.
               * Will call this.registerListeners() afterwards.
               *
               * @param {Object|string} player New player to save as this.player. If a string is passed,
               * document.getElementById will be called.
               * @param {DOMObject|string} [tag] Optional DOMElement to save as this.tag. If a string is passed,
               * document.getElementById will be called.
               */
              setPlayer(player, tag) {
                if (this.player || this.tag) this.dispose();
  
                if (typeof document !== "undefined" && document.getElementById) {
                  if (typeof player === "string")
                    player = document.getElementById(player);
                  if (typeof tag === "string") tag = document.getElementById(tag);
                }
  
                tag = tag || player; // if no tag is passed, use player as both.
  
                this.player = player;
                this.tag = tag;
                this.registerListeners();
              }
  
              /** Returns true if the tracker is currently on ads. */
              isAd() {
                return this.state.isAd();
              }
  
              /** Sets if the tracker is currenlty tracking ads */
              setIsAd(isAd) {
                this.state.setIsAd(isAd);
              }
  
              /**
               * Use this function to set up a child ad tracker. You will be able to access it using
               * this.adsTracker.
               *
               * @param {Tracker} tracker Ad tracker to add
               */
              setAdsTracker(tracker) {
                this.disposeAdsTracker(); // dispose current one
                if (tracker) {
                  this.adsTracker = tracker;
                  this.adsTracker.setIsAd(true);
                  this.adsTracker.parentTracker = this;
                  this.adsTracker.on("*", funnelAdEvents.bind(this));
                }
              }
  
              /**
               * Dispose current adsTracker.
               */
              disposeAdsTracker() {
                if (this.adsTracker) {
                  this.adsTracker.off("*", funnelAdEvents);
                  this.adsTracker.dispose();
                }
              }
  
              /**
               * Prepares tracker to dispose. Calls unregisterListener and drops references to player and tag.
               */
              dispose() {
                this.stopHeartbeat();
                this.disposeAdsTracker();
                this.unregisterListeners();
                this.player = null;
                this.tag = null;
              }
  
              /**
               * Override this method to register listeners to player/tag.
               * @example
               * class SpecificTracker extends Tracker {
               *  registerListeners() {
               *    this.player.on('play', () => this.playHandler)
               *  }
               *
               *  playHandler() {
               *    this.send(VideoTracker.Events.REQUESTED)
               *  }
               * }
               */
              registerListeners() {}
  
              /**
               * Override this method to unregister listeners to player/tag created in registerListeners
               * @example
               * class SpecificTracker extends Tracker {
               *  registerListeners() {
               *    this.player.on('play', () => this.playHandler)
               *  }
               *
               *  unregisterListeners() {
               *    this.player.off('play', () => this.playHandler)
               *  }
               *
               *  playHandler() {
               *    this.send(VideoTracker.Events.REQUESTED)
               *  }
               * }
               */
              unregisterListeners() {}
  
              /**
               * Trackers will generate unique id's for every new video iteration. If you have your own unique
               * view value, you can override this method to return it.
               * If the tracker has a parentTracker defined, parent viewId will be used.
               */
              getViewId() {
                if (this.parentTracker) {
                  return this.parentTracker.getViewId();
                } else {
                  return this.state.getViewId();
                }
              }
  
              /**
               * Trackers will generate unique id's for every new video session. If you have your own unique
               * view value, you can override this method to return it.
               * If the tracker has a parentTracker defined, parent viewId will be used.
               */
              getViewSession() {
                if (this.parentTracker) {
                  return this.parentTracker.getViewSession();
                } else {
                  return this.state.getViewSession();
                }
              }
  
              /** Override to return the Id of the video. */
              getVideoId() {
                return null;
              }
  
              /** Override to return Title of the video. */
              getTitle() {
                return null;
              }
  
              /** Override to return True if the video is live. */
              isLive() {
                return null;
              }
  
              /** Override to return Bitrate (in bits) of the video. */
              getBitrate() {
                return null;
              }
  
              /** Calculates consumed bitrate using webkitVideoDecodedByteCount. */
              getWebkitBitrate() {
                if (this.tag && this.tag.webkitVideoDecodedByteCount) {
                  let bitrate;
                  if (this._lastWebkitBitrate) {
                    bitrate = this.tag.webkitVideoDecodedByteCount;
                    let delta = bitrate - this._lastWebkitBitrate;
                    let seconds = this.getHeartbeat() / 1000;
                    bitrate = Math.round((delta / seconds) * 8);
                  }
                  this._lastWebkitBitrate = this.tag.webkitVideoDecodedByteCount;
                  return bitrate || null;
                }
              }
  
              /** Override to return Name of the rendition (ie: 1080p). */
              getRenditionName() {
                return null;
              }
  
              /** Override to return Target Bitrate of the rendition. */
              getRenditionBitrate() {
                return null;
              }
  
              /**
               * This method will return 'up', 'down' or null depending on if the bitrate of the rendition
               * have changed from the last time it was called.
               *
               * @param {boolean} [saveNewRendition=false] If true, current rendition will be stored to be used
               * the next time this method is called. This allows you to call this.getRenditionShift() without
               * saving the current rendition and thus preventing interferences with RENDITION_CHANGE events.
               */
              getRenditionShift(saveNewRendition) {
                let current = this.getRenditionBitrate();
                let last;
                if (this.isAd()) {
                  last = this._lastAdRendition;
                  if (saveNewRendition) this._lastAdRendition = current;
                } else {
                  last = this._lastRendition;
                  if (saveNewRendition) this._lastRendition = current;
                }
  
                if (!current || !last) {
                  return null;
                } else {
                  if (current > last) {
                    return "up";
                  } else if (current < last) {
                    return "down";
                  } else {
                    return null;
                  }
                }
              }
  
              /** Override to return renidtion actual Height (before re-scaling). */
              getRenditionHeight() {
                return this.tag ? this.tag.videoHeight : null;
              }
  
              /** Override to return rendition actual Width (before re-scaling). */
              getRenditionWidth() {
                return this.tag ? this.tag.videoWidth : null;
              }
  
              /** Override to return Duration of the video, in ms. */
              getDuration() {
                return this.tag ? this.tag.duration : null;
              }
  
              /** Override to return Playhead (currentTime) of the video, in ms. */
              getPlayhead() {
                return this.tag ? this.tag.currentTime : null;
              }
  
              /**
               * Override to return Language of the video. We recommend using locale notation, ie: en_US.
               * {@see https://gist.github.com/jacobbubu/1836273}
               */
              getLanguage() {
                return null;
              }
  
              /** Override to return URL of the resource being played. */
              getSrc() {
                return this.tag ? this.tag.currentSrc : null;
              }
  
              /** Override to return Playrate (speed) of the video. ie: 1.0, 0.5, 1.25... */
              getPlayrate() {
                return this.tag ? this.tag.playbackRate : null;
              }
  
              /** Override to return True if the video is currently muted. */
              isMuted() {
                return this.tag ? this.tag.muted : null;
              }
  
              /** Override to return True if the video is currently fullscreen. */
              isFullscreen() {
                return null;
              }
  
              /** Override to return the CDN serving the content. */
              getCdn() {
                return null;
              }
  
              /** Override to return the Name of the player. */
              getPlayerName() {
                return this.getTrackerName();
              }
  
              /** Override to return the Version of the player. */
              getPlayerVersion() {
                return null;
              }
  
              /** Override to return current FPS (Frames per second). */
              getFps() {
                return null;
              }
  
              /**
               * Override to return if the player was autoplayed. By default: this.tag.autoplay
               */
              isAutoplayed() {
                return this.tag ? this.tag.autoplay : null;
              }
  
              /**
               * Override to return the player preload attribute. By default: this.tag.preload
               */
              getPreload() {
                return this.tag ? this.tag.preload : null;
              }
  
              // Only for ads
              /**
               * Override to return Quartile of the ad. 0 before first, 1 after first quartile, 2 after
               * midpoint, 3 after third quartile, 4 when completed.
               */
              getAdQuartile() {
                return null;
              }
  
              /**
               * Override to return the position of the ad. Use {@link Constants.AdPositions} enum
               * to fill this data.
               */
              getAdPosition() {
                if (this.parentTracker) {
                  return this.parentTracker.state.isStarted ? "mid" : "pre";
                } else {
                  return null;
                }
              }
  
              /**
               * Override to return the ad partner. ie: ima, freewheel...
               */
              getAdPartner() {
                return null;
              }
  
              /**
               * Override to return the creative id of the ad.
               */
              getAdCreativeId() {
                return null;
              }
  
              /**
               * Do NOT override. This method fills all the appropiate attributes for tracked video.
               *
               * @param {object} [att] Collection of key value attributes
               * @return {object} Filled attributes
               * @final
               */
              getAttributes(att) {
                att = _tracker__WEBPACK_IMPORTED_MODULE_1__[
                  "default"
                ].prototype.getAttributes.apply(this, arguments);
  
                if (typeof att.isAd === "undefined") att.isAd = this.isAd();
                att.viewSession = this.getViewSession();
                att.viewId = this.getViewId();
                att.playerName = this.getPlayerName();
                att.playerVersion = this.getPlayerVersion();
  
                try {
                  att.pageUrl = window.location.href;
                } catch (err) {
                  /* skip */
                }
  
                if (this.isAd()) {
                  // Ads
                  att.adId = this.getVideoId();
                  att.adTitle = this.getTitle();
                  att.adBitrate = this.getBitrate() || this.getWebkitBitrate();
                  att.adRenditionName = this.getRenditionName();
                  att.adRenditionBitrate = this.getRenditionBitrate();
                  att.adRenditionHeight = this.getRenditionHeight();
                  att.adRenditionWidth = this.getRenditionWidth();
                  att.adDuration = this.getDuration();
                  att.adPlayhead = this.getPlayhead();
                  att.adLanguage = this.getLanguage();
                  att.adSrc = this.getSrc();
                  att.adCdn = this.getCdn();
                  att.adIsMuted = this.isMuted();
                  att.adFps = this.getFps();
                  // ad exclusives
                  att.adQuartile = this.getAdQuartile();
                  att.adPosition = this.getAdPosition();
                  att.adCreativeId = this.getAdCreativeId();
                  att.adPartner = this.getAdPartner();
                } else {
                  // no ads
                  att.contentId = this.getVideoId();
                  att.contentTitle = this.getTitle();
                  att.contentIsLive = this.isLive();
                  att.contentBitrate =
                    this.getBitrate() || this.getWebkitBitrate();
                  att.contentRenditionName = this.getRenditionName();
                  att.contentRenditionBitrate = this.getRenditionBitrate();
                  att.contentRenditionHeight = this.getRenditionHeight();
                  att.contentRenditionWidth = this.getRenditionWidth();
                  att.contentDuration = this.getDuration();
                  att.contentPlayhead = this.getPlayhead();
                  att.contentLanguage = this.getLanguage();
                  att.contentSrc = this.getSrc();
                  att.contentPlayrate = this.getPlayrate();
                  att.contentIsFullscreen = this.isFullscreen();
                  att.contentIsMuted = this.isMuted();
                  att.contentCdn = this.getCdn();
                  att.contentIsAutoplayed = this.isAutoplayed();
                  att.contentPreload = this.getPreload();
                  att.contentFps = this.getFps();
                  if (
                    this.adsTracker != null &&
                    this.adsTracker.state.totalAdPlaytime > 0
                  ) {
                    att.totalAdPlaytime = this.adsTracker.state.totalAdPlaytime;
                  }
                }
  
                this.state.getStateAttributes(att);
  
                for (let key in this.customData) {
                  att[key] = this.customData[key];
                }
  
                return att;
              }
  
              /**
               * Sends custom event and registers a timeSince attribute.
               * @param {Object} [actionName] Custom action name.
               * @param {Object} [timeSinceAttName] Custom timeSince attribute name.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendCustom(actionName, timeSinceAttName, att) {
                att = att || {};
                this.send(actionName, att);
                this.state.setTimeSinceAttribute(timeSinceAttName);
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendPlayerReady(att) {
                if (this.state.goPlayerReady()) {
                  att = att || {};
                  this.send(VideoTracker.Events.PLAYER_READY, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners. Calls
               * {@link startHeartbeat}.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendRequest(att) {
                if (this.state.goRequest()) {
                  this.state.goViewCountUp();
                  let ev = this.isAd()
                    ? VideoTracker.Events.AD_REQUEST
                    : VideoTracker.Events.CONTENT_REQUEST;
                  this.send(ev, att);
                  this.startHeartbeat();
                  this.state.goHeartbeat();
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendStart(att) {
                if (this.state.goStart()) {
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_START;
                    if (this.parentTracker)
                      this.parentTracker.state.isPlaying = false;
                  } else {
                    ev = VideoTracker.Events.CONTENT_START;
                  }
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners. Calls
               * {@link stopHeartbeat}.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendEnd(att) {
                if (this.state.goEnd()) {
                  att = att || {};
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_END;
                    att.timeSinceAdRequested =
                      this.state.timeSinceRequested.getDeltaTime();
                    att.timeSinceAdStarted =
                      this.state.timeSinceStarted.getDeltaTime();
                    if (this.parentTracker)
                      this.parentTracker.state.isPlaying = true;
                  } else {
                    ev = VideoTracker.Events.CONTENT_END;
                    att.timeSinceRequested =
                      this.state.timeSinceRequested.getDeltaTime();
                    att.timeSinceStarted =
                      this.state.timeSinceStarted.getDeltaTime();
                  }
                  this.stopHeartbeat();
                  this.send(ev, att);
                  if (this.parentTracker && this.isAd())
                    this.parentTracker.state.goLastAd();
                  this.state.goViewCountUp();
                  this.state.totalPlaytime = 0;
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendPause(att) {
                if (this.state.goPause()) {
                  let ev = this.isAd()
                    ? VideoTracker.Events.AD_PAUSE
                    : VideoTracker.Events.CONTENT_PAUSE;
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendResume(att) {
                if (this.state.goResume()) {
                  att = att || {};
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_RESUME;
                    att.timeSinceAdPaused =
                      this.state.timeSincePaused.getDeltaTime();
                  } else {
                    ev = VideoTracker.Events.CONTENT_RESUME;
                    att.timeSincePaused =
                      this.state.timeSincePaused.getDeltaTime();
                  }
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendBufferStart(att) {
                if (this.state.goBufferStart()) {
                  att = att || {};
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_BUFFER_START;
                  } else {
                    ev = VideoTracker.Events.CONTENT_BUFFER_START;
                  }
  
                  att = this.buildBufferAttributes(att);
                  this._lastBufferType = att.bufferType;
  
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendBufferEnd(att) {
                if (this.state.goBufferEnd()) {
                  att = att || {};
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_BUFFER_END;
                    att.timeSinceAdBufferBegin =
                      this.state.timeSinceBufferBegin.getDeltaTime();
                  } else {
                    ev = VideoTracker.Events.CONTENT_BUFFER_END;
                    att.timeSinceBufferBegin =
                      this.state.timeSinceBufferBegin.getDeltaTime();
                  }
  
                  att = this.buildBufferAttributes(att);
                  // Set the bufferType attribute of the last BUFFER_START
                  if (this._lastBufferType != null) {
                    att.bufferType = this._lastBufferType;
                  }
  
                  this.send(ev, att);
                  this.state.initialBufferingHappened = true;
                }
              }
  
              buildBufferAttributes(att) {
                if (
                  att.timeSinceStarted == undefined ||
                  att.timeSinceStarted < 100
                ) {
                  att.isInitialBuffering = !this.state.initialBufferingHappened;
                } else {
                  att.isInitialBuffering = false;
                }
  
                att.bufferType = this.state.calculateBufferType(
                  att.isInitialBuffering
                );
  
                att.timeSinceResumed = this.state.timeSinceResumed.getDeltaTime();
                att.timeSinceSeekEnd = this.state.timeSinceSeekEnd.getDeltaTime();
  
                return att;
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendSeekStart(att) {
                if (this.state.goSeekStart()) {
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_SEEK_START;
                  } else {
                    ev = VideoTracker.Events.CONTENT_SEEK_START;
                  }
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendSeekEnd(att) {
                if (this.state.goSeekEnd()) {
                  att = att || {};
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_SEEK_END;
                    att.timeSinceAdSeekBegin =
                      this.state.timeSinceSeekBegin.getDeltaTime();
                  } else {
                    ev = VideoTracker.Events.CONTENT_SEEK_END;
                    att.timeSinceSeekBegin =
                      this.state.timeSinceSeekBegin.getDeltaTime();
                  }
                  this.send(ev, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               * @param {String} att.state Download requires a string to distinguish different states.
               */
              sendDownload(att) {
                att = att || {};
                if (!att.state)
                  _log__WEBPACK_IMPORTED_MODULE_0__["default"].warn(
                    "Called sendDownload without { state: xxxxx }."
                  );
                this.send(VideoTracker.Events.DOWNLOAD, att);
                this.state.goDownload();
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendError(att) {
                att = att || {};
                att.isAd = true;
                this.state.goError();
                let ev = this.isAd()
                  ? VideoTracker.Events.AD_ERROR
                  : VideoTracker.Events.CONTENT_ERROR;
                this.send(ev, att);
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendRenditionChanged(att) {
                att = att || {};
                att.timeSinceLastRenditionChange =
                  this.state.timeSinceLastRenditionChange.getDeltaTime();
                att.shift = this.getRenditionShift(true);
                let ev;
                if (this.isAd()) {
                  ev = VideoTracker.Events.AD_RENDITION_CHANGE;
                } else {
                  ev = VideoTracker.Events.CONTENT_RENDITION_CHANGE;
                }
                this.send(ev, att);
                this.state.goRenditionChange();
              }
  
              /**
               * Sends associated event and changes view state. Heartbeat will automatically be sent every
               * 10 seconds. There's no need to call this manually.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               * @param {number} att.url Url of the clicked ad.
               *
               */
              sendHeartbeat(att) {
                if (this.state.isRequested) {
                  let ev;
                  if (this.isAd()) {
                    ev = VideoTracker.Events.AD_HEARTBEAT;
                  } else {
                    ev = VideoTracker.Events.CONTENT_HEARTBEAT;
                  }
                  this.send(ev, att);
                  this.state.goHeartbeat();
                }
              }
  
              // Only ads
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendAdBreakStart(att) {
                if (this.isAd() && this.state.goAdBreakStart()) {
                  this.state.totalAdPlaytime = 0;
                  if (this.parentTracker)
                    this.parentTracker.state.isPlaying = false;
                  this.send(VideoTracker.Events.AD_BREAK_START, att);
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               */
              sendAdBreakEnd(att) {
                if (this.isAd() && this.state.goAdBreakEnd()) {
                  att = att || {};
                  att.timeSinceAdBreakBegin =
                    this.state.timeSinceAdBreakStart.getDeltaTime();
                  this.send(VideoTracker.Events.AD_BREAK_END, att);
                  // Just in case AD_END not arriving, because of an AD_ERROR
                  if (this.parentTracker)
                    this.parentTracker.state.isPlaying = true;
                  this.stopHeartbeat();
                  if (this.parentTracker && this.isAd())
                    this.parentTracker.state.goLastAd();
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               * @param {number} att.quartile Number of the quartile.
               */
              sendAdQuartile(att) {
                if (this.isAd()) {
                  att = att || {};
                  if (!att.quartile)
                    _log__WEBPACK_IMPORTED_MODULE_0__["default"].warn(
                      "Called sendAdQuartile without { quartile: xxxxx }."
                    );
                  att.timeSinceLastAdQuartile =
                    this.state.timeSinceLastAdQuartile.getDeltaTime();
                  this.send(VideoTracker.Events.AD_QUARTILE, att);
                  this.state.goAdQuartile();
                }
              }
  
              /**
               * Sends associated event and changes view state. An internal state machine will prevent
               * duplicated events. Should be associated to an event using registerListeners.
               * @param {Object} [att] Collection of key:value attributes to send with the request.
               * @param {number} att.url Url of the clicked ad.
               */
              sendAdClick(att) {
                if (this.isAd()) {
                  att = att || {};
                  if (!att.url)
                    _log__WEBPACK_IMPORTED_MODULE_0__["default"].warn(
                      "Called sendAdClick without { url: xxxxx }."
                    );
                  this.send(VideoTracker.Events.AD_CLICK, att);
                }
              }
            }
  
            /**
             * Enumeration of events fired by this class.
             *
             * @static
             * @memberof VideoTracker
             * @enum {String}
             */
            VideoTracker.Events = {
              // Player
              /** The player is ready to start sending events. */
              PLAYER_READY: "PLAYER_READY",
              /** Downloading data. */
              DOWNLOAD: "DOWNLOAD",
              /** An error happened */
              ERROR: "ERROR",
  
              // Video
              /** Content video has been requested. */
              CONTENT_REQUEST: "CONTENT_REQUEST",
              /** Content video started (first frame shown). */
              CONTENT_START: "CONTENT_START",
              /** Content video ended. */
              CONTENT_END: "CONTENT_END",
              /** Content video paused. */
              CONTENT_PAUSE: "CONTENT_PAUSE",
              /** Content video resumed. */
              CONTENT_RESUME: "CONTENT_RESUME",
              /** Content video seek started */
              CONTENT_SEEK_START: "CONTENT_SEEK_START",
              /** Content video seek ended. */
              CONTENT_SEEK_END: "CONTENT_SEEK_END",
              /** Content video beffering started */
              CONTENT_BUFFER_START: "CONTENT_BUFFER_START",
              /** Content video buffering ended */
              CONTENT_BUFFER_END: "CONTENT_BUFFER_END",
              /** Content video heartbeat, en event that happens once every 30 seconds while the video is playing. */
              CONTENT_HEARTBEAT: "CONTENT_HEARTBEAT",
              /** Content video stream qwuality changed. */
              CONTENT_RENDITION_CHANGE: "CONTENT_RENDITION_CHANGE",
              /** Content video error. */
              CONTENT_ERROR: "CONTENT_ERROR",
  
              // Ads only
              /** Ad video has been requested. */
              AD_REQUEST: "AD_REQUEST",
              /** Ad video started (first frame shown). */
              AD_START: "AD_START",
              /** Ad video ended. */
              AD_END: "AD_END",
              /** Ad video paused. */
              AD_PAUSE: "AD_PAUSE",
              /** Ad video resumed. */
              AD_RESUME: "AD_RESUME",
              /** Ad video seek started */
              AD_SEEK_START: "AD_SEEK_START",
              /** Ad video seek ended */
              AD_SEEK_END: "AD_SEEK_END",
              /** Ad video beffering started */
              AD_BUFFER_START: "AD_BUFFER_START",
              /** Ad video beffering ended */
              AD_BUFFER_END: "AD_BUFFER_END",
              /** Ad video heartbeat, en event that happens once every 30 seconds while the video is playing. */
              AD_HEARTBEAT: "AD_HEARTBEAT",
              /** Ad video stream qwuality changed. */
              AD_RENDITION_CHANGE: "AD_RENDITION_CHANGE",
              /** Ad video error. */
              AD_ERROR: "AD_ERROR",
              /** Ad break (a block of ads) started. */
              AD_BREAK_START: "AD_BREAK_START",
              /** Ad break ended. */
              AD_BREAK_END: "AD_BREAK_END",
              /** Ad quartile happened. */
              AD_QUARTILE: "AD_QUARTILE",
              /** Ad has been clicked. */
              AD_CLICK: "AD_CLICK",
            };
  
            // Private members
            function funnelAdEvents(e) {
              this.send(e.type, e.data);
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              VideoTracker;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/src/videotrackerstate.js":
          /*!*******************************************************************!*\
    !*** ./node_modules/newrelic-video-core/src/videotrackerstate.js ***!
    \*******************************************************************/
          /***/ (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
          ) => {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var _chrono__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(
                /*! ./chrono */ "./node_modules/newrelic-video-core/src/chrono.js"
              );
            /* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(
                /*! ./log */ "./node_modules/newrelic-video-core/src/log.js"
              );
  
            /**
             * State machine for a VideoTracker and its monitored video.
             */
            class VideoTrackerState {
              /** Constructor */
              constructor() {
                this.reset();
  
                /**
                 * Time when the VideoTrackerState was initializated.
                 * @private
                 */
                this._createdAt = Date.now();
              }
  
              /** Resets all flags and chronos. */
              reset() {
                /**
                 * Unique identifier of the view.
                 * @private
                 */
                this._viewSession = null;
  
                /**
                 * Number of views seen.
                 * @private
                 */
                this._viewCount = 0;
  
                /**
                 * True if it is tracking ads.
                 * @private
                 */
                this._isAd = false;
  
                /**
                 * Number of errors fired. 'End' resets it.
                 */
                this.numberOfErrors = 0;
  
                /**
                 * Number of ads shown.
                 */
                this.numberOfAds = 0;
  
                /**
                 * Number of videos played.
                 */
                this.numberOfVideos = 0;
  
                /**
                 * The amount of ms the user has been watching content (not paused, not buffering, not ads...)
                 */
                this.totalPlaytime = 0;
  
                /**
                 * The amount of ms the user has been watching ads during an ad break.
                 */
                this.totalAdPlaytime = 0;
  
                /** True if you are in the middle of an ad break. */
                this.isAdBreak = false;
  
                /** True if initial buffering event already happened. */
                this.initialBufferingHappened = false;
  
                this.resetFlags();
                this.resetChronos();
              }
  
              /** Resets flags. */
              resetFlags() {
                /** True once the player has finished loading. */
                this.isPlayerReady = false;
  
                /** True if the video has been user-requested to play. ie: user cicks play. */
                this.isRequested = false;
  
                /** True if the video has starting playing. ie: actual images/audio showing in screen. */
                this.isStarted = false;
  
                /** True if the video is paused. */
                this.isPaused = false;
  
                /** True if the video is performing a seek action. */
                this.isSeeking = false;
  
                /** True if the video is currently buffering. */
                this.isBuffering = false;
  
                /** True if the video is currently playing (not buffering, not paused...) */
                this.isPlaying = false;
              }
  
              /** Resets chronos. */
              resetChronos() {
                /** Chrono that counts time since last requested event. */
                this.timeSinceRequested =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last start event. */
                this.timeSinceStarted = new _chrono__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ]();
  
                /** Chrono that counts time since last pause event. */
                this.timeSincePaused = new _chrono__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ]();
  
                /** Chrono that counts time since last seeking start event. */
                this.timeSinceSeekBegin =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last buffering start event. */
                this.timeSinceBufferBegin =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last ad break start event. */
                this.timeSinceAdBreakStart =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last download event. */
                this.timeSinceLastDownload =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last heartbeat. */
                this.timeSinceLastHeartbeat =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Chrono that counts time since last rendition change. */
                this.timeSinceLastRenditionChange =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Ads only. Chrono that counts time since last ad quartile. */
                this.timeSinceLastAdQuartile =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** Content only. Chrono that counts time since last AD_END. */
                this.timeSinceLastAd = new _chrono__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ]();
  
                /** Chrono that counts time since last *_RESUME. Only for buffering events. */
                this.timeSinceResumed = new _chrono__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ]();
  
                /** Chrono that counts time since last *_SEEK_END. Only for buffering events. */
                this.timeSinceSeekEnd = new _chrono__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ]();
  
                /** Chrono that counts the ammount of time the video have been playing since the last event. */
                this.playtimeSinceLastEvent =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
  
                /** A dictionary containing the custom timeSince attributes. */
                this.customTimeSinceAttributes = {};
              }
  
              /** Returns true if the tracker is currently on ads. */
              isAd() {
                return this._isAd;
              }
  
              /** Sets if the tracker is currenlty tracking ads */
              setIsAd(isAd) {
                this._isAd = isAd;
              }
  
              /**
               * Set the Chrono for the custom attribute
               *
               * @param {object} name Time since attribute name.
               */
              setTimeSinceAttribute(name) {
                this.customTimeSinceAttributes[name] =
                  new _chrono__WEBPACK_IMPORTED_MODULE_0__["default"]();
                this.customTimeSinceAttributes[name].start();
              }
  
              /**
               * Delete a time since attribute
               *
               * @param {object} name Time since attribute name.
               */
              removeTimeSinceAttribute(name) {
                delete this.customTimeSinceAttributes[name];
              }
  
              /**
               * Returns a random-generated view Session ID, useful to sort by views.
               */
              getViewSession() {
                if (!this._viewSession) {
                  let time = new Date().getTime();
                  let random =
                    Math.random().toString(36).substring(2) +
                    Math.random().toString(36).substring(2);
  
                  this._viewSession = time + "-" + random;
                }
  
                return this._viewSession;
              }
  
              /**
               * Returns a random-generated view Session ID, plus a view count, allowing you to distinguish
               * between two videos played in the same session.
               */
              getViewId() {
                return this.getViewSession() + "-" + this._viewCount;
              }
  
              /**
               * Fills given object with state-based attributes.
               *
               * @param {object} att Collection fo key value attributes
               * @return {object} Filled attributes
               */
              getStateAttributes(att) {
                att = att || {};
  
                if (this.isAd()) {
                  // Ads only
                  if (this.isRequested) {
                    att.timeSinceAdRequested =
                      this.timeSinceRequested.getDeltaTime();
                    att.timeSinceLastAdHeartbeat =
                      this.timeSinceLastHeartbeat.getDeltaTime();
                  }
                  if (this.isStarted)
                    att.timeSinceAdStarted = this.timeSinceStarted.getDeltaTime();
                  if (this.isPaused)
                    att.timeSinceAdPaused = this.timeSincePaused.getDeltaTime();
                  if (this.isBuffering)
                    att.timeSinceAdBufferBegin =
                      this.timeSinceBufferBegin.getDeltaTime();
                  if (this.isSeeking)
                    att.timeSinceAdSeekBegin =
                      this.timeSinceSeekBegin.getDeltaTime();
                  if (this.isAdBreak)
                    att.timeSinceAdBreakBegin =
                      this.timeSinceAdBreakStart.getDeltaTime();
                  att.numberOfAds = this.numberOfAds;
                } else {
                  // Content only
                  if (this.isRequested) {
                    att.timeSinceRequested =
                      this.timeSinceRequested.getDeltaTime();
                    att.timeSinceLastHeartbeat =
                      this.timeSinceLastHeartbeat.getDeltaTime();
                  }
                  if (this.isStarted)
                    att.timeSinceStarted = this.timeSinceStarted.getDeltaTime();
                  if (this.isPaused)
                    att.timeSincePaused = this.timeSincePaused.getDeltaTime();
                  if (this.isBuffering)
                    att.timeSinceBufferBegin =
                      this.timeSinceBufferBegin.getDeltaTime();
                  if (this.isSeeking)
                    att.timeSinceSeekBegin =
                      this.timeSinceSeekBegin.getDeltaTime();
                  att.timeSinceLastAd = this.timeSinceLastAd.getDeltaTime();
                  att.numberOfVideos = this.numberOfVideos;
                }
                att.numberOfErrors = this.numberOfErrors;
  
                // Playtime
                if (!this.isAd()) {
                  // Content only
                  if (this.playtimeSinceLastEvent.startTime > 0) {
                    att.playtimeSinceLastEvent =
                      this.playtimeSinceLastEvent.getDeltaTime();
                  } else {
                    att.playtimeSinceLastEvent = 0;
                  }
                  if (this.isPlaying) {
                    this.playtimeSinceLastEvent.start();
                  } else {
                    this.playtimeSinceLastEvent.reset();
                  }
                  this.totalPlaytime += att.playtimeSinceLastEvent;
                  att.totalPlaytime = this.totalPlaytime;
                }
  
                for (const [key, value] of Object.entries(
                  this.customTimeSinceAttributes
                )) {
                  att[key] = value.getDeltaTime();
                }
  
                return att;
              }
  
              /**
               * Calculate the bufferType attribute.
               *
               * @param {boolean} isInitialBuffering Is initial buffering event.
               */
              calculateBufferType(isInitialBuffering) {
                let bufferType = "";
                if (isInitialBuffering) {
                  bufferType = "initial";
                } else if (this.isSeeking) {
                  bufferType = "seek";
                } else if (this.isPaused) {
                  bufferType = "pause";
                } else {
                  // If none of the above is true, it is a connection buffering
                  bufferType = "connection";
                }
                _log__WEBPACK_IMPORTED_MODULE_1__["default"].debug(
                  "Buffer Type = " + bufferType
                );
  
                return bufferType;
              }
  
              /**
               * Augments view count. This will be called with each *_START and *_END.
               */
              goViewCountUp() {
                this._viewCount++;
              }
  
              /**
               * Checks flags and changes state.
               * @returns {boolean} True if the state changed.
               */
              goPlayerReady() {
                if (!this.isPlayerReady) {
                  this.isPlayerReady = true;
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goRequest() {
                if (!this.isRequested) {
                  this.isRequested = true;
                  this.timeSinceLastAd.reset();
                  this.timeSinceRequested.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goStart() {
                if (this.isRequested && !this.isStarted) {
                  if (this.isAd()) {
                    this.numberOfAds++;
                  } else {
                    this.numberOfVideos++;
                  }
                  this.isStarted = true;
                  this.isPlaying = true;
                  this.timeSinceStarted.start();
                  this.playtimeSinceLastEvent.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goEnd() {
                if (this.isRequested) {
                  this.numberOfErrors = 0;
                  this.resetFlags();
                  this.timeSinceRequested.stop();
                  this.timeSinceStarted.stop();
                  this.playtimeSinceLastEvent.stop();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goPause() {
                if (this.isStarted && !this.isPaused) {
                  this.isPaused = true;
                  this.isPlaying = false;
                  this.timeSincePaused.start();
                  this.playtimeSinceLastEvent.stop();
                  this.timeSinceResumed.reset();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goResume() {
                if (this.isStarted && this.isPaused) {
                  this.isPaused = false;
                  this.isPlaying = true;
                  this.timeSincePaused.stop();
                  this.timeSinceResumed.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goBufferStart() {
                if (this.isRequested && !this.isBuffering) {
                  this.isBuffering = true;
                  this.isPlaying = false;
                  this.timeSinceBufferBegin.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goBufferEnd() {
                if (this.isRequested && this.isBuffering) {
                  this.isBuffering = false;
                  this.isPlaying = true;
                  this.timeSinceBufferBegin.stop();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goSeekStart() {
                if (this.isStarted && !this.isSeeking) {
                  this.isSeeking = true;
                  this.isPlaying = false;
                  this.timeSinceSeekBegin.start();
                  this.timeSinceSeekEnd.reset();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goSeekEnd() {
                if (this.isStarted && this.isSeeking) {
                  this.isSeeking = false;
                  this.isPlaying = true;
                  this.timeSinceSeekBegin.stop();
                  this.timeSinceSeekEnd.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goAdBreakStart() {
                if (!this.isAdBreak) {
                  this.isAdBreak = true;
                  this.timeSinceAdBreakStart.start();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Checks flags and changes state
               * @returns {boolean} True if the state changed.
               */
              goAdBreakEnd() {
                if (this.isAdBreak) {
                  this.isRequested = false;
                  this.isAdBreak = false;
                  this.totalAdPlaytime =
                    this.timeSinceAdBreakStart.getDeltaTime();
                  this.timeSinceAdBreakStart.stop();
                  return true;
                } else {
                  return false;
                }
              }
  
              /**
               * Restarts download chrono.
               */
              goDownload() {
                this.timeSinceLastDownload.start();
              }
  
              /**
               * Restarts heartbeat chrono.
               */
              goHeartbeat() {
                this.timeSinceLastHeartbeat.start();
              }
  
              /**
               * Restarts rendition change chrono.
               */
              goRenditionChange() {
                this.timeSinceLastRenditionChange.start();
              }
  
              /**
               * Restarts ad quartile chrono.
               */
              goAdQuartile() {
                this.timeSinceLastAdQuartile.start();
              }
  
              /**
               * Increments error counter.
               */
              goError() {
                this.numberOfErrors++;
              }
  
              /**
               * Restarts last ad chrono.
               */
              goLastAd() {
                this.timeSinceLastAd.start();
              }
            }
  
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              VideoTrackerState;
  
            /***/
          },
  
        /***/ "./node_modules/newrelic-video-core/package.json":
          /*!*******************************************************!*\
    !*** ./node_modules/newrelic-video-core/package.json ***!
    \*******************************************************/
          /***/ (module) => {
            module.exports = /*#__PURE__*/ JSON.parse(
              '{"name":"newrelic-video-core","version":"0.32.2","description":"New Relic video tracking core library","main":"src/index.js","scripts":{"build":"webpack -p","build:dev":"webpack --mode development","watch":"webpack -p --progress --color --watch","watch:dev":"webpack --progress --color --watch","clean":"rm -rf dist coverage doc","test":"nyc --reporter=html --reporter=text mocha --compilers js:babel-core/register","doc":"jsdoc -c jsdoc.json -d documentation","deploy":"node scripts/deploy.js"},"repository":{"type":"git","url":"https://github.com/newrelic/video-core-js"},"author":"Jordi Aguilar","contributors":["Andreu Santarén Llop"],"license":"MIT","devDependencies":{"aws-sdk":"^2.920.0","babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-preset-env":"^1.7.0","chai":"^4.3.4","diff":"^5.0.0","mocha":"^7.2.0","nyc":"^15.1.0","sinon":"^2.4.1","webpack":"^4.46.0","webpack-cli":"^3.3.12"},"dependencies":{}}'
            );
  
            /***/
          },
  
        /***/ "./package.json":
          /*!**********************!*\
    !*** ./package.json ***!
    \**********************/
          /***/ (module) => {
            module.exports = /*#__PURE__*/ JSON.parse(
              '{"name":"newrelic-video-videojs","version":"0.7.0","description":"New relic tracker for Videojs","main":"src/index.js","scripts":{"build":"webpack --mode production","build:dev":"webpack --mode development","watch":"webpack --mode production --progress --color --watch","watch:dev":"webpack --progress --color --watch","prezip":"npm run build","zip":"zip -P newrelic -x \'*.DS_Store\' -x \'samples/agent.js\' -r videojs.zip dist samples README.md CHANGELOG.md EULA.md","clean":"rm -rf dist *.zip","deploy":"node scripts/deploy.js"},"repository":{"type":"git","url":"https://github.com/newrelic/video-videojs-js.git"},"author":"Jordi Aguilar","contributors":["Andreu Santarén Llop"],"license":"MIT","dependencies":{"newrelic-video-core":"github:newrelic/video-core-js"},"devDependencies":{"@babel/core":"^7.24.5","@babel/plugin-transform-modules-commonjs":"^7.24.1","@babel/preset-env":"^7.24.5","aws-sdk":"^2.920.0","babel-loader":"^9.1.3","videojs-ima":"2.1.0","webpack":"^5.91.0","webpack-cli":"^4.9.2"}}'
            );
  
            /***/
          },
  
        /******/
      };
      /************************************************************************/
      /******/ // The module cache
      /******/ var __webpack_module_cache__ = {};
      /******/
      /******/ // The require function
      /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
          /******/ return cachedModule.exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
          /******/ // no module.id needed
          /******/ // no module.loaded needed
          /******/ exports: {},
          /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
          module,
          module.exports,
          __webpack_require__
        );
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
      }
      /******/
      /************************************************************************/
      /******/ /* webpack/runtime/define property getters */
      /******/ (() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
          /******/ for (var key in definition) {
            /******/ if (
              __webpack_require__.o(definition, key) &&
              !__webpack_require__.o(exports, key)
            ) {
              /******/ Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key],
              });
              /******/
            }
            /******/
          }
          /******/
        };
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/hasOwnProperty shorthand */
      /******/ (() => {
        /******/ __webpack_require__.o = (obj, prop) =>
          Object.prototype.hasOwnProperty.call(obj, prop);
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/make namespace object */
      /******/ (() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
          /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, {
              value: "Module",
            });
            /******/
          }
          /******/ Object.defineProperty(exports, "__esModule", { value: true });
          /******/
        };
        /******/
      })();
      /******/
      /************************************************************************/
      /******/
      /******/ // startup
      /******/ // Load entry module and return exports
      /******/ // This entry module is referenced by other modules so it can't be inlined
      /******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
      /******/
      /******/ return __webpack_exports__;
      /******/
    })();
  });
  //# sourceMappingURL=newrelic-video-videojs.min.js.map
  