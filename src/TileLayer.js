import { TileLayer as LeafletTileLayer } from 'leaflet';
import createLayer from './create-layer';

const TileLayer = createLayer(LeafletTileLayer, 'url', { componentName: 'TileLayer' });

export default TileLayer;
