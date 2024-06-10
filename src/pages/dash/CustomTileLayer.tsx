
// src/pages/dash/CustomTileLayer.tsx

import { TileLayer, useMap } from 'react-leaflet';
import { CRS } from "leaflet";
import CustomTileLayerProps from './CustomTileLayerProps';

console.log(`[CustomTileLayer]: Loaded imports`);

function CustomTileLayer(props: CustomTileLayerProps) {
  const map = useMap();

  const {
    layers = 'CCAR:BCIM_Unidade_Federacao_A',
    styles = '',
    format = 'image/png',
    transparent = true,
    version = '1.1.1',
    crs = CRS.EPSG4326,
    uppercase = true,
    url = 'https://geoservicos.ibge.gov.br/geoserver/wms',
    exceptions = 'application/vnd.ogc.se_xml',
    bgcolor = '0xFEFFFF',
    width = 758,
    height = 698,
    bbox = '-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306',
    customParams = {}
  } = props;

  const wmsParams: { [key: string]: string | boolean | number | undefined } = {
    service: 'WMS',
    request: 'GetMap',
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
    srs: 'EPSG:4326',
    ...customParams
  };

  // Removing undefined properties
  Object.keys(wmsParams).forEach(key => {
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

  const wmsUrl = `${url}?${urlParams.toString()}`;

  return (
    <TileLayer
      url={wmsUrl}
      attribution="&copy; <a href=&quot;https://www.geoserver.org/&quot;>GeoServer</a> contributors"
    />
  );
}

export default CustomTileLayer;