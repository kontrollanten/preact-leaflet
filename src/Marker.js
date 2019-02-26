import { Marker as LeafletMarker } from 'leaflet';
import createLayer from './create-layer';

const Marker = createLayer(LeafletMarker, 'position');

export default Marker;
