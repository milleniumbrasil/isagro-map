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
  - Este é o clique do mouse no mapa (https://react-leaflet.js.org/docs/api-components/#wmstilelayer), que por sua vez deve invocar o https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE
  - 
  - 
  - Como controlar o mapa por eventos externos: https://react-leaflet.js.org/docs/example-external-state/
  - Utilizar WMS (preferencialmente) https://www.sentinel-hub.com/develop/integrate/onlinegis/#web ou GEOJson https://geojson.org
  - Adicionar um seletor com auto-complete (typing) para estados ou cidades (codigos IBGE) https://mui.com/material-ui/react-select/

#### Requisitos Mapa

*TODO*: Criar o contrado do serviço que contenha os parametros de request para os mapas.
  - Exibir inicialmente Brazil, ou recuperar da sessão
  - Ao selecionar o codigo IBGE no seletor, exibir apenas a regiao do mapa conforme o codigo selecionado;
  - Utilizar modo tiled

## Componente Pizza

  - https://observablehq.com/@d3/pie-chart/2?intent=fork

## Componente Barras

  - https://observablehq.com/@d3/horizontal-bar-chart/2?intent=fork
  - https://observablehq.com/@d3/diverging-bar-chart/2?intent=fork
    
## Componente Serie Temporal

*TODO*: Criar o contrado do serviço que contenha os parametros de request para os time-lines.

  - https://d3js.org
    
  - Exibir inicialmente carregada do response, ou recuperar da sessão
  
  - https://observablehq.com/@d3/multi-line-chart/2?intent=fork
  - https://observablehq.com/@d3/line-chart/2?intent=fork
  - https://d3js.org/d3-axis (Exemplo de redimencionamento de eixos)
  - https://observablehq.com/@d3/normalized-stacked-area-chart/2?intent=fork
  - https://observablehq.com/@d3/stacked-area-chart/2?intent=fork
