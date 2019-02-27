import { Marker as LeafletMarker } from 'leaflet';
import createLayer from './create-layer';

const Marker = createLayer(LeafletMarker, 'position', { componentName: 'Marker' });

export default Marker;
