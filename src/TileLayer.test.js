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
    expect(() => mount(<TileLayer {...defaultProps} leafletMap={undefined} />)).to.throw(/leafletMap/);
  });

  it('should throw an describing error if no url prop is given', () => {
    expect(() => mount(<TileLayer {...defaultProps} url="" />)).to.throw(/url/i);
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
    sandbox.spy(leaflet, 'TileLayer');
    mount(<TileLayer {...defaultProps} {...options} />);

    expect(leaflet.TileLayer).to.have.been
      .calledWithExactly(sinon.match.string, sinon.match(options));
  });

  it('should remove TileLayer from map upon unmount', () => {
    const leafletMap = new leaflet.Map(document.createElement('div'));
    const wrapper = mount(<TileLayer {...defaultProps} leafletMap={leafletMap} />);
    const { layer } = wrapper.instance();

    wrapper.unmount();

    expect(leafletMap.hasLayer(layer)).to.equal(false);
  });
});
