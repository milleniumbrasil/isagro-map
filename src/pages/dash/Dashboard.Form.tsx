
// src/pages/login/Form.tsx

import * as React from "react";
import { DashboardTheme } from "./Dashboard.Theme";
import { MapContainer, Marker, Popup } from 'react-leaflet'
import { useTheme } from "../../components/ext/styles/StylesExt";
import Paper from "../../components/ext/surfaces/PaperExt";
import { CRS } from "leaflet";
import CustomTileLayer from "./CustomTileLayer";
import CustomTileLayerProps from "./CustomTileLayerProps";

console.log(`[Dashboard]: Loaded imports`);

const Dashboard: React.FC<any> = () => {
  const currentTheme = useTheme();
  const paperStyles = DashboardTheme(currentTheme);

  console.log(`[Dashboard]: Loaded useState data, navitage and theme`);
  // TODO: Recuperar os valores do objeto `params` do serviço de mapas.
  // URL reference: https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE
  const params: CustomTileLayerProps = {
    layers: 'CCAR:BCIM_Unidade_Federacao_A',
    styles: 'SLDBody',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    crs: CRS.EPSG4326, 
    uppercase: true,
    url: 'https://geoservicos.ibge.gov.br/geoserver/wms'
  };

  console.log("Dashboard component is rendering");
  return (
      <>
        <Paper sx={paperStyles} elevation={3}>
          <MapContainer center={[51.505, -0.09]} zoom={6} scrollWheelZoom={true}>
            <CustomTileLayer {...params} />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Paper>
      </>
      );
}
export default Dashboard;
