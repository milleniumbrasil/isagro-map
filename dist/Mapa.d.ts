import { TileLayerConfig } from "./imapa";
export interface MapaProps {
    config: TileLayerConfig;
    onConfigChange: (config: TileLayerConfig) => void;
}
declare function Mapa({ config, onConfigChange }: MapaProps): import("react/jsx-runtime").JSX.Element;
export default Mapa;
