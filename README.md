# ISAgro-mapa

Repositorio template para o componente Mapa do projeto ISAGRO Dashboards.

# Sumário

O componente mapa é baseado no framework [https://leafletjs.com](https://react-leaflet.js.org). Sua função é requisitar o servidor de mapas do IBGE para exibir o mapa do Brasil e suas regiões. O componente deve permitir a seleção de estados e cidades, e ao selecionar um estado ou cidade, o mapa deve exibir a região correspondente.

# Elementos principais



## Request esperado

### Summary
URL: https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE
Status: 200
Source: Network
Address: 170.84.40.173:443

### Request
GET /geoserver/wms HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en;q=0.9
Connection: keep-alive
Cookie: GS_FLOW_CONTROL=GS_CFLOW_-31cf8b1d:18ff420c46a:-3105; JSESSIONID=CC510F7039ED5BD84E756E7F1EA7383C; TS01681b9d=01b9ac051a1170afb5ed1ca6c4f0d41638d21296fb7128c996da0e32639a377ae866e5f41f998573aaedd38cb871edfa61885542c7ff9f0f2cc4c599db1d4ac74670cf363c7aef5a97e99a58da15a5850a4c34153e; TS01f969ad=01b9ac051abd544ca8e206a2e64485ad30d196438f05954eecf65bb7bd9dc6948d87b6a3747b92fd95ebd870e3491e9a04f32c6a336962327447da6a07135b432382664011; ai_user=9/AzQEzq8hCPSV7JXtI56S|2024-06-07T21:27:00.735Z
Host: geoservicos.ibge.gov.br
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15

### Response
HTTP/1.1 200
Content-Disposition: inline; filename=CCAR-BCIM_Unidade_Federacao_A.png
Content-Type: image/png
Date: Mon, 10 Jun 2024 21:26:43 GMT
Request-Context: appId=f78c288b-ffdc-4bdb-bc6a-3f62ecad3e5f
Set-Cookie: GS_FLOW_CONTROL=GS_CFLOW_-31cf8b1d:18ff420c46a:-3105
Set-Cookie: TS01f969ad=01b9ac051abd544ca8e206a2e64485ad30d196438f05954eecf65bb7bd9dc6948d87b6a3747b92fd95ebd870e3491e9a04f32c6a336962327447da6a07135b432382664011; Path=/; Domain=.geoservicos.ibge.gov.br
Transfer-Encoding: Identity
X-Control-flow-delay-ms: 0
X-Frame-Options: SAMEORIGIN

### Query String Parameters
SERVICE: WMS
VERSION: 1.1.1
REQUEST: GetMap
SRS: EPSG:4326
BBOX: -73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306
WIDTH: 758
HEIGHT: 698
LAYERS: CCAR:BCIM_Unidade_Federacao_A
STYLES
EXCEPTIONS: application/vnd.ogc.se_xml
FORMAT: image/png
BGCOLOR: 0xFEFFFF
TRANSPARENT: TRUE


## Requisitos do componente Mapa

  - Utilizar a framework [https://leafletjs.com](https://react-leaflet.js.org), especificamente este aqui: https://react-leaflet.js.org/docs/api-components/#wmstilelayer , este aqui: https://react-leaflet.js.org/docs/api-components/#zoomcontrol e este aqui: https://react-leaflet.js.org/docs/api-components/#scalecontrol
  - Este aqui é o request para preencher o mapa (adicionar no serviço mock)
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
