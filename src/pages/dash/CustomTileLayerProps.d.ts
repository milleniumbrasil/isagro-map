
// src/pages/dash/CustomTileLayerProps.d.ts
import { CRS } from "leaflet";

interface CustomTileLayerProps {
  layers?: string;
  styles?: string;
  format?: string;
  transparent?: boolean;
  version?: string;
  crs?: CRS;
  uppercase?: boolean;
  url?: string;
  exceptions?: string;
  bgcolor?: string;
  width?: number;
  height?: number;
  bbox?: string;
  customParams?: { [key: string]: string | boolean | number | undefined };
}

export default CustomTileLayerProps;