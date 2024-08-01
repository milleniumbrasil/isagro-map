"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// isgagro-map/src/App.tsx
var react_1 = require("react");
require("./App.css");
var Mapa_1 = __importDefault(require("./Mapa"));
var states_1 = require("./states");
function App() {
    var _a = (0, react_1.useState)(""), selectedState = _a[0], setSelectedState = _a[1];
    var _b = (0, react_1.useState)("CCAR:BCIM_Unidade_Federacao_A"), layers = _b[0], setLayers = _b[1];
    var _c = (0, react_1.useState)(""), styles = _c[0], setStyles = _c[1];
    var _d = (0, react_1.useState)("image/png"), format = _d[0], setFormat = _d[1];
    var _e = (0, react_1.useState)(true), transparent = _e[0], setTransparent = _e[1];
    var _f = (0, react_1.useState)("1.1.1"), version = _f[0], setVersion = _f[1];
    var _g = (0, react_1.useState)("EPSG:4326"), crs = _g[0], setCrs = _g[1];
    var _h = (0, react_1.useState)(true), uppercase = _h[0], setUppercase = _h[1];
    var _j = (0, react_1.useState)("https://geoservicos.ibge.gov.br/geoserver/wms"), url = _j[0], setUrl = _j[1];
    var _k = (0, react_1.useState)("application/vnd.ogc.se_xml"), exceptions = _k[0], setExceptions = _k[1];
    var _l = (0, react_1.useState)("0xFEFFFF"), bgcolor = _l[0], setBgcolor = _l[1];
    var _m = (0, react_1.useState)(758), width = _m[0], setWidth = _m[1];
    var _o = (0, react_1.useState)(698), height = _o[0], setHeight = _o[1];
    var _p = (0, react_1.useState)("-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306"), bbox = _p[0], setBbox = _p[1];
    var _q = (0, react_1.useState)(6), zoom = _q[0], setZoom = _q[1];
    var tileLayerConfig = {
        layers: layers,
        styles: styles,
        format: format,
        transparent: transparent,
        version: version,
        crs: crs,
        uppercase: uppercase,
        url: url,
        exceptions: exceptions,
        bgcolor: bgcolor,
        width: width,
        height: height,
        bbox: bbox,
        zoom: zoom,
        customParams: {},
    };
    var handleStateChange = function (e) {
        var selectedState = e.target.value;
        setSelectedState(selectedState);
        var state = states_1.states.find(function (s) { return s.name === selectedState; });
        if (state) {
            setBbox(state.bbox);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "App", children: [(0, jsx_runtime_1.jsxs)("div", { className: "sidebar", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Estado:", (0, jsx_runtime_1.jsxs)("select", { value: selectedState, onChange: handleStateChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Selecione um estado" }), states_1.states.map(function (state) { return ((0, jsx_runtime_1.jsx)("option", { value: state.name, children: state.name }, state.name)); })] })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Layers:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: layers, onChange: function (e) { return setLayers(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Styles:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: styles, onChange: function (e) { return setStyles(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Format:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: format, onChange: function (e) { return setFormat(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Transparent:", (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: transparent, onChange: function (e) { return setTransparent(e.target.checked); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Version:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: version, onChange: function (e) { return setVersion(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["CRS:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: crs, onChange: function (e) { return setCrs(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Uppercase:", (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: uppercase, onChange: function (e) { return setUppercase(e.target.checked); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["URL:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: url, onChange: function (e) { return setUrl(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Exceptions:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: exceptions, onChange: function (e) { return setExceptions(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["BG Color:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: bgcolor, onChange: function (e) { return setBgcolor(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Width:", (0, jsx_runtime_1.jsx)("input", { type: "number", value: width, onChange: function (e) { return setWidth(Number(e.target.value)); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Height:", (0, jsx_runtime_1.jsx)("input", { type: "number", value: height, onChange: function (e) { return setHeight(Number(e.target.value)); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["BBox:", (0, jsx_runtime_1.jsx)("input", { type: "text", value: bbox, onChange: function (e) { return setBbox(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Zoom:", (0, jsx_runtime_1.jsx)("input", { type: "number", value: zoom, onChange: function (e) { return setZoom(Number(e.target.value)); } })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "map-container", children: (0, jsx_runtime_1.jsx)(Mapa_1.default, { config: tileLayerConfig }) })] }));
}
exports.default = App;
