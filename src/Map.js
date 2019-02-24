import { h, Component } from 'preact';
import leaflet from 'leaflet';

class Map extends Component {
  componentDidMount() {
    const {
      center = [59.3367, 18.0667],
      zoom = 12,
      ...options
    } = this.getProps({ leafletOptions: true });

    this.setState({
      map: new leaflet.Map(this.ref, options).setView(center, zoom),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.center !== this.props.center) {
      this.state.map.panTo(this.props.center);
    }
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  getProps({ leafletOptions = false } = {}) {
    const mapOptions = [
      'attributionControl',
      'bounceAtZoomLimits',
      'boundsOptions',
      'crs',
      'center',
      'easeLinearity',
      'fadeAnimation',
      'inertia',
      'inertiaDeceleration',
      'inertiaMaxSpeed',
      'keyboard',
      'keyboardPanDelta',
      'markerZoomAnimation',
      'maxBounds',
      'maxBoundsViscosity',
      'maxZoom',
      'minZoom',
      'layers',
      'preferCanvas',
      'renderer',
      'scrollWheelZoom',
      'tap',
      'tapTolerance',
      'touchZoom',
      'transform3DLimit',
      'wheelDebounceTime',
      'wheelPxPerZoomLevel',
      'worldCopyJump',
      'zoom',
      'zoomAnimation',
      'zoomControl',
    ];

    return Object.keys(this.props)
      .filter(prop => (leafletOptions
        ? mapOptions.indexOf(prop) !== -1
        : mapOptions.indexOf(prop) === -1
      ))
      .reduce((props, prop) => ({ ...props, [prop]: this.props[prop] }), {});
  }

  render() {
    const children = this.props.children
      .map(child => Object.assign(
        child,
        { attributes: { ...child.attributes, leafletMap: this.state.map } },
      ));

    return (
      <div {...this.getProps()} ref={(ref) => { this.ref = ref; }}>
        {!!this.state.map && children}
      </div>
    );
  }
}

export default Map;
