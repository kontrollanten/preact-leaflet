import { h, Component } from 'preact';
import leaflet from 'leaflet';
import { TileLayer } from './TileLayer';

class Map extends Component {
  componentDidMount() {
    const { center, zoom, ...options } = {
      center: [59.3367, 18.0667],
      zoom: 12,
      ...this.getProps({ leafletOptions: true }),
    };

    this.setState({
      map: new leaflet.Map(this.ref, options).setView(center, zoom),
    });
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  getProps({ leafletOptions = false } = {}) {
    const mapOptions = [
      'boundsOptions',
    ];

    return Object.keys(this.props)
      .filter(prop => (leafletOptions ? mapOptions.indexOf(prop) !== -1 : mapOptions.indexOf(prop) === -1))
      .reduce((props, prop) => ({ ...props, [prop]: this.props[prop] }), {});
  }

  render() {
    const children = this.props.children.map(child => Object.assign(child, { attributes: { ...child.attributes, leafletMap: this.state.map } }));

    return (
      <div {...this.getProps()} ref={(ref) => { this.ref = ref; }}>
        {!!this.state.map && this.props.children}
      </div>
    );
  }
}

export default Map;
