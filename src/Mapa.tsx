
// isgagro-map/src/Mapa.tsx

import { useState } from 'react';
import { Map } from "pigeon-maps";
import { TileLayerConfig } from "./interfaces";

interface MapaProps {
  config: TileLayerConfig;
}

function Mapa({ config }: MapaProps) {
  const {
    layers = "CCAR:BCIM_Unidade_Federacao_A",
    styles = "",
    format = "image/png",
    transparent = true,
    version = "1.1.1",
    crs = "EPSG:4326",
    uppercase = true,
    url = "https://geoservicos.ibge.gov.br/geoserver/wms",
    exceptions = "application/vnd.ogc.se_xml",
    bgcolor = "0xFEFFFF",
    width,
    height,
    bbox,
    zoom = 6,
    customParams = {},
  } = config;

  const wmsParams: { [key: string]: string | boolean | number | undefined } = {
    service: "WMS",
    request: "GetMap",
    layers,
    styles,
    format,
    transparent,
    version,
    exceptions,
    bgcolor,
    width,
    height,
    bbox,
    srs: "EPSG:4326",
    ...customParams,
  };

  // Removing undefined properties
  Object.keys(wmsParams).forEach((key) => {
    if (wmsParams[key] === undefined) {
      delete wmsParams[key];
    }
  });

  // Converting parameters to string format as required by URL
  const urlParams = new URLSearchParams();
  Object.entries(wmsParams).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, String(value));
    }
  });

  function getCenterFromBBox(bbox: string): [number, number] {
    const [minX, minY, maxX, maxY] = bbox.split(',').map(Number);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    return [centerY, centerX];
  }
  
  const wmsUrl = `${url}?${urlParams.toString()}`;
  const center = getCenterFromBBox(bbox);
  const defaultCenter = center;
  
  const [currentCenter, setCenter] = useState(center);
  const [currentZoom, setZoom] = useState(zoom);

  return (
    <Map
      provider={() => wmsUrl}
      dprs={[1, 2]} 
      height={height}
      width={width}
      center={currentCenter}
      defaultCenter={defaultCenter}
      zoom={currentZoom} 
      onBoundsChanged={({ center, zoom }) => { 
        setCenter(center); 
        setZoom(zoom); 
      }} 
    />
  );
}

export default Mapa;