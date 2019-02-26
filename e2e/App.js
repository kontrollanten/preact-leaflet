import { h } from 'preact';
import { divIcon } from 'leaflet';
import { Map, Marker, TileLayer } from '../src';
import 'leaflet/dist/leaflet.css';
import './styles.css';

export default () => (
  <div>
    <h1>preact-leaflet</h1>
    <Map center={[59.3367, 18.0667]} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={divIcon()} position={[59.3367, 18.0667]} />
    </Map>
  </div>
);
