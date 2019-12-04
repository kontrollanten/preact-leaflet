import { h, Component, toChildArray } from 'preact';
import leaflet from 'leaflet';
import 'leaflet.markercluster';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';
import getOptions from './helpers/get-options';

export default class MarkersCluster extends Component {
  constructor(props) {
    super(props);
    this.layer = leaflet.markerClusterGroup(getOptions(props));
  }

  componentDidMount() {
    this.layer.addTo(this.props.leafletMap);
    addListenersFromProps(this.layer, this.props);
  }

  componentDidUpdate(prevProps) {
    addListenersFromProps(this.layer, this.props, {
      filter: ({ prop }) => !prevProps[prop],
    });

    removeListenersFromProps(this.layer, prevProps, {
      filter: ({ prop }) => !this.props[prop],
    });
  }

  componentWillUnmount() {
    removeListenersFromProps(this.layer, this.props);
    this.layer.removeFrom(this.props.leafletMap);
  }

  render() {
    const children = toChildArray(this.props.children)
      .filter(c => c)
      .map(child => (
        {
          ...child,
          props: { ...child.props, leafletMap: this.layer },
        }
      ));

    return <div>{children}</div>;
  }
}
