import { Component } from 'preact';
import leaflet from 'leaflet';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';

export default class Marker extends Component {
  componentDidMount() {
    const { leafletMap, position, ...options } = this.props;

    if (!leafletMap) {
      throw Error('No leafletMap prop provided.');
    }

    if (!position) {
      throw Error('No position prop provided.');
    }

    this.marker = new leaflet.Marker(position, options);
    this.marker.addTo(leafletMap);

    addListenersFromProps(this.marker, this.props);
  }

  componentDidUpdate(prevProps) {
    addListenersFromProps(this.marker, this.props, {
      filter: ({ prop }) => !prevProps[prop],
    });

    removeListenersFromProps(this.marker, prevProps, {
      filter: ({ prop }) => !this.props[prop],
    });
  }

  componentWillUnmount() {
    removeListenersFromProps(this.marker, this.props);
    this.marker.removeFrom(this.props.leafletMap);
  }

  render() {
    return null;
  }
}
