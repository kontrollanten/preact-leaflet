import { Polyline as LeafletPolyline } from 'leaflet';
import createLayer from './create-layer';

const Polyline = createLayer(LeafletPolyline, 'positions', { componentName: 'Polyline' });

export default Polyline;
