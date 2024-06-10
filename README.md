# ISAgro-map

Repositorio do componente de mapa para o projeto ISAGRO Dashboards.

# Elementos principais

## Componentes comuns

  - https://mui.com/material-ui/all-components/

## Componente Mapa

  - Utilizar a framework [https://leafletjs.com](https://react-leaflet.js.org), especificamente este aqui: https://react-leaflet.js.org/docs/api-components/#wmstilelayer , este aqui: https://react-leaflet.js.org/docs/api-components/#zoomcontrol e este aqui: https://react-leaflet.js.org/docs/api-components/#scalecontrol
  - Este aqui é o request para preencher o mapa (adicionar no serviço mock)
  - Este é o clique do mouse no mapa (https://react-leaflet.js.org/docs/api-components/#wmstilelayer), que por sua vez deve invocar o https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE

  - 
  - Como controlar o mapa por eventos externos: https://react-leaflet.js.org/docs/example-external-state/
  - Utilizar WMS (preferencialmente) https://www.sentinel-hub.com/develop/integrate/onlinegis/#web ou GEOJson https://geojson.org
  - Adicionar um seletor com auto-complete (typing) para estados ou cidades (codigos IBGE) https://mui.com/material-ui/react-select/

#### Requisitos Mapa

*TODO*: Criar o contrado do serviço que contenha os parametros de request para os mapas.
  - Exibir inicialmente Brazil, ou recuperar da sessão
  - Ao selecionar o codigo IBGE no seletor, exibir apenas a regiao do mapa conforme o codigo selecionado;
  - Utilizar modo tiled

**Parâmetros no URL esperado:**
```
https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE
```

**Parâmetros na requisição atual do componente:**
```
https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=CCAR%3ABCIM_Unidade_Federacao_A&STYLES=SLDBody&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&BBOX=-5.625,48.922499263758255,0,52.482780222078226
```

**Diferenças identificadas:**

1. **SRS**: no URL esperado é `SRS=EPSG:4326`, mas na requisição atual está correto.
2. **BBOX**: O valor no URL esperado é uma bbox específica (`-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306`), enquanto na requisição atual é calculada com base nos parâmetros do componente `leaflet`. A BBOX normalmente varia conforme a visualização do mapa, então este pode ser ajustado conforme o contexto.
3. **WIDTH e HEIGHT**: Os valores esperados são `WIDTH=758` e `HEIGHT=698`. No entanto, esses valores podem ser automaticamente gerados pelo `leaflet` com base no tamanho da visualização.
4. **LAYERS**: No URL esperado é `LAYERS=CCAR:BCIM_Unidade_Federacao_A`, enquanto na requisição atual está correto.
5. **STYLES**: No URL esperado é `STYLES` (vazio), mas na requisição atual é `STYLES=SLDBody`. Corrigiremos para vazio.
6. **EXCEPTIONS**: No URL esperado está presente `EXCEPTIONS=application/vnd.ogc.se_xml`, e está ausente na requisição atual.
7. **FORMAT**: No URL esperado é `FORMAT=image/png`, enquanto na requisição atual está correto.
8. **BGCOLOR**: No URL esperado é `BGCOLOR=0xFEFFFF`, e está ausente na requisição atual.
9. **TRANSPARENT**: No URL esperado é `TRANSPARENT=TRUE`, enquanto na requisição atual está correto.
10. **SERVICE e VERSION**: Estão corretos em ambas as requisições.

Vamos ajustar o componente `CustomTileLayer` para incluir os parâmetros corretos.

Aqui está o código atualizado:

```typescript
// src/pages/login/Form.tsx

import * as React from "react";
import { DashboardTheme } from "./Dashboard.Theme";
import { MapContainer, Marker, Popup, WMSTileLayer } from 'react-leaflet';
import { useTheme } from "../../components/ext/styles/StylesExt";
import Paper from "../../components/ext/surfaces/PaperExt';
import { CRS } from "leaflet";

console.log(`[Paper]: Loaded imports`);

interface CustomTileLayerProps {
  service?: string;
  version?: string;
  request?: string;
  srs?: string;
  bbox?: string;
  width?: number;
  height?: number;
  layers?: string;
  styles?: string;
  exceptions?: string;
  format?: string;
  bgcolor?: string;
  transparent?: boolean;
  crs?: CRS;
  uppercase?: boolean;
  url?: string;
}

function CustomTileLayer({
  service = 'WMS',
  version = '1.1.1',
  request = 'GetMap',
  srs = 'EPSG:4326',
  bbox = '-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306',
  width = 758,
  height = 698,
  layers = 'CCAR:BCIM_Unidade_Federacao_A',
  styles = '',
  exceptions = 'application/vnd.ogc.se_xml',
  format = 'image/png',
  bgcolor = '0xFEFFFF',
  transparent = true,
  crs = CRS.EPSG4326,
  uppercase = true,
  url = 'https://geoservicos.ibge.gov.br/geoserver/wms'
}: CustomTileLayerProps) {
  return (
    <WMSTileLayer
      url={url}
      layers={layers}
      styles={styles}
      format={format}
      transparent={transparent}
      version={version}
      crs={crs}
      uppercase={uppercase}
      request={request}
      srs={srs}
      bbox={bbox}
      width={width}
      height={height}
      exceptions={exceptions}
      bgcolor={bgcolor}
      service={service}
    />
  );
}

const Form: React.FC<any> = () => {
  const currentTheme = useTheme();
  const paperStyles = DashboardTheme(currentTheme);
  const params: CustomTileLayerProps = {
    service: 'WMS',
    version: '1.1.1',
    request: 'GetMap',
    srs: 'EPSG:4326',
    bbox: '-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306',
    width: 758,
    height: 698,
    layers: 'CCAR:BCIM_Unidade_Federacao_A',
    styles: '',
    exceptions: 'application/vnd.ogc.se_xml',
    format: 'image/png',
    bgcolor: '0xFEFFFF',
    transparent: true,
    crs: CRS.EPSG4326,
    uppercase: true,
    url: 'https://geoservicos.ibge.gov.br/geoserver/wms'
  };

  console.log(`[Form]: Loaded useState data, navigate and theme`);

  console.log("Form component is rendering");
  return (
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
  );
}

export default Form;
```

Com essas mudanças, os parâmetros devem corresponder exatamente ao URL esperado, e a requisição deve ser gerada corretamente pelo componente `CustomTileLayer`.
