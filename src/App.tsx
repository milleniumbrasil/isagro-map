
// isgagro-map/src/App.tsx

import { useState } from 'react';
import './App.css';
import { TileLayerConfig } from "./imapa";
import Mapa from "./Mapa";
import { states } from "./states";

function App() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [layers, setLayers] = useState("CCAR:BCIM_Unidade_Federacao_A");
  const [styles, setStyles] = useState("");
  const [format, setFormat] = useState("image/png");
  const [transparent, setTransparent] = useState(true);
  const [version, setVersion] = useState("1.1.1");
  const [crs, setCrs] = useState("EPSG:4326");
  const [uppercase, setUppercase] = useState(true);
  const [url, setUrl] = useState("https://geoservicos.ibge.gov.br/geoserver/wms");
  const [exceptions, setExceptions] = useState("application/vnd.ogc.se_xml");
  const [bgcolor, setBgcolor] = useState("0xFEFFFF");
  const [width, setWidth] = useState(758);
  const [height, setHeight] = useState(698);
  const [bbox, setBbox] = useState("-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306");
  const [zoom, setZoom] = useState(6);

  const tileLayerConfig: TileLayerConfig = {
    layers,
    styles,
    format,
    transparent,
    version,
    crs,
    uppercase,
    url,
    exceptions,
    bgcolor,
    width,
    height,
    bbox,
    zoom,
    customParams: {},
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const state = states.find((s) => s.name === selectedState);
    if (state) {
      setBbox(state.bbox);
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <label>
          Estado:
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Selecione um estado</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Layers:
          <input type="text" value={layers} onChange={(e) => setLayers(e.target.value)} />
        </label>
        <label>
          Styles:
          <input type="text" value={styles} onChange={(e) => setStyles(e.target.value)} />
        </label>
        <label>
          Format:
          <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} />
        </label>
        <label>
          Transparent:
          <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} />
        </label>
        <label>
          Version:
          <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
        </label>
        <label>
          CRS:
          <input type="text" value={crs} onChange={(e) => setCrs(e.target.value)} />
        </label>
        <label>
          Uppercase:
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
        </label>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <label>
          Exceptions:
          <input type="text" value={exceptions} onChange={(e) => setExceptions(e.target.value)} />
        </label>
        <label>
          BG Color:
          <input type="text" value={bgcolor} onChange={(e) => setBgcolor(e.target.value)} />
        </label>
        <label>
          Width:
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <label>
          BBox:
          <input type="text" value={bbox} onChange={(e) => setBbox(e.target.value)} />
        </label>
        <label>
          Zoom:
          <input type="number" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
        </label>
      </div>
      <div className="map-container">
        <Mapa config={tileLayerConfig} />
      </div>
    </div>
    );
}

export default App;