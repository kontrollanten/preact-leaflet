import { h } from 'preact';
import { Map, TileLayer } from 'preact-leaflet';
import 'leaflet/dist/leaflet.css';

export default () => (
  <div>
    <h1>preact-leaflet</h1>
    <Map center={[59.3367, 18.0667]} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </Map>
  </div>
);
