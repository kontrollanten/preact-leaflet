import { Component } from 'preact';
import leaflet from 'leaflet';

class TileLayer extends Component {
  componentDidMount() {
    const { leafletMap, url, ...options } = this.props;

    if (!leafletMap) {
      throw Error('TileLayer: Couldn\'t find leafletMap prop');
    }

    if (!url) {
      throw Error('TileLayer: url prop is required.');
    }

    this.layer = new leaflet.TileLayer(url, options);
    this.layer.addTo(leafletMap);
  }

  componentWillUnmount() {
    this.layer.removeFrom(this.props.leafletMap);
  }

  render() {
    return null;
  }
}

export default TileLayer;
