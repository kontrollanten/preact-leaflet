import { h, Component } from 'preact';
import leaflet from 'leaflet';

const getProvidedEventListeners = props => Object.keys(props)
  .filter(prop => prop.match(/on[A-Z](.*)/))
  .map(prop => ({
    callback: props[prop],
    event: prop.slice(2).replace(/^[A-Z]/, e => e.slice(0, 1).toLowerCase()),
    prop,
  }));

class Map extends Component {
  componentDidMount() {
    const {
      bounds,
      zoom = 6,
      ...options
    } = this.getProps({ leafletOptions: true });

    const map = new leaflet.Map(this.ref, { zoom, ...options });

    getProvidedEventListeners(this.props)
      .forEach(({ event, callback }) => {
        map.on(event, callback);
      });

    if (bounds) {
      map.fitBounds(bounds);
    }

    this.setState({
      map,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.center !== this.props.center) {
      this.state.map.panTo(this.props.center);
    }

    if (prevProps.bounds !== this.props.bounds) {
      this.state.map.fitBounds(this.props.bounds);
    }

    getProvidedEventListeners(this.props)
      .filter(({ prop }) => !prevProps[prop])
      .forEach(({ event, callback }) => {
        this.state.map.on(event, callback);
      });

    getProvidedEventListeners(prevProps)
      .filter(({ prop }) => !this.props[prop])
      .forEach(({ event, callback }) => {
        this.state.map.off(event, callback);
      });
  }

  componentWillUnmount() {
    getProvidedEventListeners(this.props)
      .forEach(({ callback, event }) => {
        this.state.map.off(event, callback);
      });
    this.state.map.remove();
  }

  getProps({ leafletOptions = false } = {}) {
    const mapOptions = [
      'attributionControl',
      'bounceAtZoomLimits',
      'boundsOptions',
      'bounds',
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
