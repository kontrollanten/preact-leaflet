import { h } from 'preact';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import leaflet from 'leaflet';
import TileLayer from './TileLayer';
import Map from './Map';

describe('Map', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should render a leaflet map', () => {
    const wrapper = mount(<Map />);

    expect(!!wrapper.getDOMNode()._leaflet_id).to.be.true;
  });

  it('should map accurate props to map options', () => {
    const mapOptions = {
      boundsOptions: { paddingTopLeft: [0, 1] },
    };
    sandbox.stub(leaflet, 'Map').returns({ setView: () => null });
    mount(<Map {...mapOptions} nonMapOption />);

    expect(leaflet.Map).to.have.been.calledWithExactly(sinon.match.any, sinon.match(mapOptions));
  });

  it('should destroy the map upon unmount', () => {
    sandbox.spy(leaflet.Map.prototype, 'remove');
    const wrapper = mount(<Map />);
    wrapper.unmount();

    expect(leaflet.Map.prototype.remove).to.have.been.called;
  });

  it('should pass arbitrary props to DOM node', () => {
    const wrapper = mount(<Map arbitrary />);

    expect(wrapper.children().props().arbitrary).to.equal(true);
  });

  it('should add leafletMap prop TileLayer children to make it attach to map', () => {
    sandbox.spy(leaflet, 'TileLayer');
    const wrapper = mount(<Map><TileLayer url="url" /></Map>);

    expect(wrapper.html()).to.contain('leaflet-tile-pane');
  });
});
