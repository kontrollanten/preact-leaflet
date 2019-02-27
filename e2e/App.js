import { h } from 'preact';
import { divIcon } from 'leaflet';
import {
  Map, Marker, Polyline, TileLayer,
} from '../src';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import route from './long-route';

export default () => (
  <div>
    <h1>preact-leaflet</h1>
    <Map center={[59.3367, 18.0667]} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={divIcon()} position={[59.3367, 18.0667]} />
      <Marker icon={divIcon()} position={[63.8374896962485, 20.163206074534]} />
      <Polyline positions={route} />
    </Map>
  </div>
);
