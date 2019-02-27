import { Component } from 'preact';
import { control } from 'leaflet';

export default class ZoomControl extends Component {
  componentDidMount() {
    const { leafletMap, ...options } = this.props;
    // eslint-disable-next-line new-cap
    this.control = new control.zoom(options);
    this.control.addTo(leafletMap);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      this.control.setPosition(this.props.position);
    }
  }

  componentWillUnmount() {
    this.control.remove();
  }

  render() {
    return null;
  }
}
