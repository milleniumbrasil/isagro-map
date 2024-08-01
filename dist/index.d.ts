import { TileLayerConfig } from "./imapa";
export interface MapaProps {
    config: TileLayerConfig;
}
declare function Mapa({ config }: MapaProps): import("react/jsx-runtime").JSX.Element;
export default Mapa;
export { default as Mapa } from './Mapa';
