import { h, Component } from 'preact';
import { divIcon } from 'leaflet';
import {
  Map, Marker, Polyline, TileLayer,
} from '../src';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import route from './long-route';

const getRouteConfig = (hash) => {
  switch (hash) {
    case '#polyline':
      return {
        mapCenter: [63.83919, 20.15069],
        markers: [
          [59.3367, 18.0667],
          [63.8374896962485, 20.163206074534],
        ],
        polylines: [
          route,
        ],
        zoom: 5,
      };
    default:
      return {
        mapCenter: [59.3367, 18.0667],
        markers: [],
        polylines: [],
        zoom: 10,
      };
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = getRouteConfig(window.location.hash);
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState(getRouteConfig(window.location.hash));
    });
  }

  render(props, {
    mapCenter, markers, polylines, zoom,
  }) {
    return (
      <div>
        <h1>preact-leaflet in</h1>
        <ul className="menu">
          <li>
            <a href="#simple">Show simple</a>
          </li>
          <li>
            <a href="#polyline">Show polyline and markers</a>
          </li>
        </ul>
        <Map center={mapCenter} style={{ height: '100%' }} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map(position => (
            <Marker icon={divIcon()} position={position} />
          ))}
          {polylines.map(positions => (
            <Polyline positions={positions} />
          ))}
        </Map>
      </div>
    );
  }
}
