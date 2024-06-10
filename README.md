# ISAgro-template
Repositorio template para o projeto ISAGRO Dashboards.

# Elementos principais

## Componentes comuns

  - https://mui.com/material-ui/all-components/

## Componente Mapa

  - Utilizar a framework [https://leafletjs.com](https://react-leaflet.js.org), especificamente este aqui: https://react-leaflet.js.org/docs/api-components/#wmstilelayer , este aqui: https://react-leaflet.js.org/docs/api-components/#zoomcontrol e este aqui: https://react-leaflet.js.org/docs/api-components/#scalecontrol
  - Este aqui é o request para preencher o mapa (adicionar no serviço mock)
  - Este é o clique do mouse no mapa (https://react-leaflet.js.org/docs/api-components/#wmstilelayer), que por sua vez deve invocar o https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE
  - 
```Javascript
import { WMSTileLayer } from 'https://cdn.esm.sh/react-leaflet/WMSTileLayer'

// Esta chamada deve retornar um XML que contém um codigo IBGE, que por sua vez, sera utilizado por hooks do React para consultar informações que serão consumidas por outros charts.
/*
function getTileLayerParams(latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'text/html'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return this._url + L.Util.getParamString(params, this._url, true);
  }*/

function CustomTileLayer(params) {
  return (<WMSTileLayer
        layers="params.layers" // 'CCAR:BCIM_Unidade_Federacao_A'
        styles="params.styles"  // sera decidido depois (pode ser SLDBody) 
        format="params.format" // 'image/png'
        transparent="params.transparent" // true
        version="params.version"  // fazer a logica de inversão que esta em getTileLayerParams
        crs="params.crs"  // https://leafletjs.com/reference.html#crs-l-crs-epsg4326
        uppercase="params.uppercase" /> // true
    <LocationMarker params=${getTileLayerParams}/>);
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const scrollWheelZoomConstant = true;
  const centerConstant={{ lat: 51.505, lng: -0.09 }};
  const zoomConstant=6;
/*
  const nexrad = L.tileLayer.wms("https://geoservicos.ibge.gov.br/geoserver/wms", {
    layers: 'CCAR:BCIM_Unidade_Federacao_A',
    format: 'image/png',
    transparent: true,
    attribution: "IBGE"
  });
*/
  // Não vamos usar o URL direto, pois utilizaremos o WMSTileLayer
  // const requestParaoPNG = 'https://geoservicos.ibge.gov.br/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-73.6319866139999703591457,-32.6441463967387832667555,-34.7928849718691139969451,3.09228646100007198427306&WIDTH=758&HEIGHT=698&LAYERS=CCAR:BCIM_Unidade_Federacao_A&STYLES&EXCEPTIONS=application/vnd.ogc.se_xml&FORMAT=image/png&BGCOLOR=0xFEFFFF&TRANSPARENT=TRUE';
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

render(
  <MapContainer
    center=${centerConstant}
    zoom=${zoomConstant}
    scrollWheelZoom=${scrollWheelZoomConstant}>
    {/*<TileLayer
      attribution="html a ser adicionado no rodapé">Brasil</a> contributors'
      url="${requestParaoPNG}"
    />*/}
    <CustomTileLayer params=${paramsConstant} /> 
    <LocationMarker params=${getTileLayerParams}/>
  </MapContainer>,
)
```
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
