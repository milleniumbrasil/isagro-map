
// src/pages/dash/Map.tsx

import * as React from "react";
import { DashboardTheme } from "./Map.Theme";
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { useTheme } from "../../components/ext/styles/StylesExt";
import Paper from "../../components/ext/surfaces/PaperExt";
import { CRS, LatLngTuple } from "leaflet";
import CustomTileLayer from "./CustomTileLayer";
import CustomTileLayerProps from "./CustomTileLayerProps";

console.log(`[Dashboard]: Loaded imports`);

const Map: React.FC<any> = () => {
  const currentTheme = useTheme();
  const paperStyles = DashboardTheme(currentTheme);

  console.log(`[Dashboard]: Loaded useState data, navitage and theme`);
  const params: CustomTileLayerProps = {
    layers: 'CCAR:BCIM_Unidade_Federacao_A',
    styles: '',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    crs: CRS.EPSG4326,
    uppercase: true,
    url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
    exceptions: 'application/vnd.ogc.se_xml',
    bgcolor: '0xFEFFFF',
    width: 758,
    height: 698,
    bbox: '-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306',
    customParams: {}
  };

  const center: LatLngTuple = [51.505, -0.09];
  const zoom = 6;
  const position: LatLngTuple = [51.505, -0.09];
  const content = 'A pretty CSS3 popup. <br /> Easily customizable.';

  console.log("Dashboard component is rendering");
  return (
    <Paper sx={paperStyles} elevation={3}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <CustomTileLayer {...params} />
        <Marker position={position}>
          <Popup>
            {content}
          </Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default Map;