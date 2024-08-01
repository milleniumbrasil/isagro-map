
// isgagro-map/src/interfaces.d.ts

export interface TileLayerConfig {
    layers?: string;
    styles?: string;
    format?: string;
    transparent?: boolean;
    version?: string;
    crs?: string;
    uppercase?: boolean;
    url?: string;
    exceptions?: string;
    bgcolor?: string;
    width: number;
    height: number;
    bbox: string;
    zoom?: number;
    customParams?: { [key: string]: string | boolean | number | undefined };
  }