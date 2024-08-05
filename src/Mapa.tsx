
// src/Mapa.tsx

import { useEffect, useState } from 'react';
import { Map, ZoomControl, Draggable } from "pigeon-maps";
import { TileLayerConfig } from "./imapa";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

export interface MapaProps {
  config: TileLayerConfig;
}

function calculateZoomFromBBox(bbox: string): number {
  const [minX, minY, maxX, maxY] = bbox.split(',').map(Number);
  const WORLD_DIM = { width: 256, height: 256 };
  const ZOOM_MAX = 21;

  function latRad(lat: number) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx: number, worldPx: number, fraction: number) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const latFraction = (latRad(maxY) - latRad(minY)) / Math.PI;
  const lngDiff = maxX - minX;
  const lngFraction = lngDiff < 0 ? lngDiff + 360 : lngDiff / 360;
  const latZoom = zoom(WORLD_DIM.height, 256, latFraction);
  const lngZoom = zoom(WORLD_DIM.width, 256, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
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

  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

// src/Mapa.tsx

  useEffect(() => {
    console.log('Config zoom:', config.zoom);
    console.log('Config bbox:', config.bbox);
    
    setZoom(config.zoom || 6); // Atualize o estado do zoom quando a configuração mudar
    setCenter(getCenterFromBBox(config.bbox)); // Atualize o centro quando a configuração mudar
  }, [config]);

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
        console.log('Bounds changed - center:', center);
        console.log('Bounds changed - zoom:', zoom);
        setCenter(center); 
        setZoom(zoom); 
      }} 
    >
      <ZoomControl />
      <Draggable offset={[60, 87]} anchor={currentCenter} onDragEnd={setCenter}>
        <PersonPinCircleIcon />
      </Draggable>
    </Map>
  );
}

export default Mapa;