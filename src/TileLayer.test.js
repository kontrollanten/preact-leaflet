import { h } from 'preact';
import { expect } from 'chai';
import sinon from 'sinon';
import leaflet from 'leaflet';
import { mount } from '../test/enzyme';
import TileLayer from './TileLayer';

describe('TileLayer', () => {
  const sandbox = sinon.createSandbox();
  const defaultProps = {
    leafletMap: new leaflet.Map(document.createElement('div')),
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw an error if no leafletMap prop is given', () => {
    sandbox.stub(console, 'error');
    try {
      mount(<TileLayer {...defaultProps} leafletMap={undefined} />);
    } catch (error) {}

    expect(console.error).to.have.been.calledWith(sinon.match(/leafletMap/));
  });

  it('should throw an describing error if no url prop is given', () => {
    sandbox.stub(console, 'error');
    try {
      mount(<TileLayer {...defaultProps} url="" />);
    } catch (error) {}

    expect(console.error).to.have.been.calledWith(sinon.match(/url/));
  });

  it('add layer to map', () => {
    const leafletMap = new leaflet.Map(document.createElement('div'));
    const wrapper = mount(<TileLayer {...defaultProps} leafletMap={leafletMap} />);

    expect(leafletMap.hasLayer(wrapper.instance().layer)).to.equal(true);
  });

  it('should map accurate props to Leaflet TileLayer', () => {
    const options = {
      attribution: 'hell',
    };
    sandbox.spy(TileLayer, 'LayerType');
    mount(<TileLayer {...defaultProps} {...options} />);

    expect(TileLayer.LayerType).to.have.been.called;
    expect(TileLayer.LayerType).to.have.been
      .calledWith(sinon.match.string, sinon.match(options));
  });

  it('should remove TileLayer from map upon unmount', () => {
    const leafletMap = new leaflet.Map(document.createElement('div'));
    const wrapper = mount(<TileLayer {...defaultProps} leafletMap={leafletMap} />);
    const { layer } = wrapper.instance();

    wrapper.unmount();

    expect(leafletMap.hasLayer(layer)).to.equal(false);
  });
});
