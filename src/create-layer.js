import { Component } from 'preact';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';

const createLayer = (LayerType, firstArgProp) => {
  class Layer extends Component {
    componentDidMount() {
      const { children, leafletMap, ...props } = this.props;

      if (!leafletMap) {
        throw Error('Couldn\'t find leafletMap prop');
      }

      if (!props[firstArgProp]) {
        throw Error(`${firstArgProp} prop is required.`);
      }

      const options = Object.keys(props)
        .filter(p => (p !== firstArgProp && !p.match(/^on/)))
        .reduce((acc, val) => ({ ...acc, [val]: props[val] }), {});

      this.layer = new Layer.LayerType(props[firstArgProp], options);
      this.layer.addTo(leafletMap);

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
      return null;
    }
  }

  Layer.LayerType = LayerType;

  return Layer;
};

export default createLayer;
