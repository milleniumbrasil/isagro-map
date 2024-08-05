"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// src/Mapa.tsx
var react_1 = require("react");
var pigeon_maps_1 = require("pigeon-maps");
var PersonPinCircle_1 = __importDefault(require("@mui/icons-material/PersonPinCircle"));
function calculateZoomFromBBox(bbox) {
    var _a = bbox.split(',').map(Number), minX = _a[0], minY = _a[1], maxX = _a[2], maxY = _a[3];
    var WORLD_DIM = { width: 256, height: 256 };
    var ZOOM_MAX = 21;
    function latRad(lat) {
        var sin = Math.sin((lat * Math.PI) / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }
    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }
    var latFraction = (latRad(maxY) - latRad(minY)) / Math.PI;
    var lngDiff = maxX - minX;
    var lngFraction = lngDiff < 0 ? lngDiff + 360 : lngDiff / 360;
    var latZoom = zoom(WORLD_DIM.height, 256, latFraction);
    var lngZoom = zoom(WORLD_DIM.width, 256, lngFraction);
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}
function Mapa(_a) {
    var config = _a.config;
    var _b = config.layers, layers = _b === void 0 ? "CCAR:BCIM_Unidade_Federacao_A" : _b, _c = config.styles, styles = _c === void 0 ? "" : _c, _d = config.format, format = _d === void 0 ? "image/png" : _d, _e = config.transparent, transparent = _e === void 0 ? true : _e, _f = config.version, version = _f === void 0 ? "1.1.1" : _f, _g = config.crs, crs = _g === void 0 ? "EPSG:4326" : _g, _h = config.uppercase, uppercase = _h === void 0 ? true : _h, _j = config.url, url = _j === void 0 ? "https://geoservicos.ibge.gov.br/geoserver/wms" : _j, _k = config.exceptions, exceptions = _k === void 0 ? "application/vnd.ogc.se_xml" : _k, _l = config.bgcolor, bgcolor = _l === void 0 ? "0xFEFFFF" : _l, width = config.width, height = config.height, bbox = config.bbox, _m = config.zoom, zoom = _m === void 0 ? 6 : _m, _o = config.customParams, customParams = _o === void 0 ? {} : _o;
    var wmsParams = __assign({ service: "WMS", request: "GetMap", layers: layers, styles: styles, format: format, transparent: transparent, version: version, exceptions: exceptions, bgcolor: bgcolor, width: width, height: height, bbox: bbox, srs: "EPSG:4326" }, customParams);
    // Removing undefined properties
    Object.keys(wmsParams).forEach(function (key) {
        if (wmsParams[key] === undefined) {
            delete wmsParams[key];
        }
    });
    // Converting parameters to string format as required by URL
    var urlParams = new URLSearchParams();
    Object.entries(wmsParams).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            urlParams.append(key, String(value));
        }
    });
    function getCenterFromBBox(bbox) {
        var _a = bbox.split(',').map(Number), minX = _a[0], minY = _a[1], maxX = _a[2], maxY = _a[3];
        var centerX = (minX + maxX) / 2;
        var centerY = (minY + maxY) / 2;
        return [centerY, centerX];
    }
    var wmsUrl = "".concat(url, "?").concat(urlParams.toString());
    var center = getCenterFromBBox(bbox);
    var defaultCenter = center;
    var _p = (0, react_1.useState)(center), currentCenter = _p[0], setCenter = _p[1];
    var _q = (0, react_1.useState)(zoom), currentZoom = _q[0], setZoom = _q[1];
    var _r = (0, react_1.useState)(0), hue = _r[0], setHue = _r[1];
    var color = "hsl(".concat(hue % 360, "deg 39% 70%)");
    // src/Mapa.tsx
    (0, react_1.useEffect)(function () {
        console.log('Config zoom:', config.zoom);
        console.log('Config bbox:', config.bbox);
        setZoom(config.zoom || 6); // Atualize o estado do zoom quando a configuração mudar
        setCenter(getCenterFromBBox(config.bbox)); // Atualize o centro quando a configuração mudar
    }, [config]);
    return ((0, jsx_runtime_1.jsxs)(pigeon_maps_1.Map, { provider: function () { return wmsUrl; }, dprs: [1, 2], height: height, width: width, center: currentCenter, defaultCenter: defaultCenter, zoom: currentZoom, onBoundsChanged: function (_a) {
            var center = _a.center, zoom = _a.zoom;
            setCenter(center);
            setZoom(zoom);
        }, children: [(0, jsx_runtime_1.jsx)(pigeon_maps_1.ZoomControl, {}), (0, jsx_runtime_1.jsx)(pigeon_maps_1.Draggable, { offset: [60, 87], anchor: currentCenter, onDragEnd: setCenter, children: (0, jsx_runtime_1.jsx)(PersonPinCircle_1.default, {}) })] }));
}
exports.default = Mapa;
