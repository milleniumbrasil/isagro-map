
// src/pages/dash/CustomTileLayer.tsx

import { WMSTileLayer } from 'react-leaflet'
import { CRS } from "leaflet";
import CustomTileLayerProps from './CustomTileLayerProps';

console.log(`[CustomTileLayer]: Loaded imports`);

function CustomTileLayer(params: CustomTileLayerProps) {
  const {
    layers = 'CCAR:BCIM_Unidade_Federacao_A',
    styles = 'SLDBody',
    format = 'image/png',
    transparent = true,
    version = '1.1.1',
    crs = CRS.EPSG4326, 
    uppercase = true,
    url = 'https://geoservicos.ibge.gov.br/geoserver/wms'
  } = params;

  return (
      <WMSTileLayer
        layers={layers}
        styles={styles}
        format={format}
        transparent={transparent}
        version={version}
        crs={crs}
        uppercase={uppercase}
        url={url}
      />
  );
}

export default CustomTileLayer;