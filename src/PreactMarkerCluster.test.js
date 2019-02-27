import { h } from 'preact';
import { expect } from 'chai';
import sinon from 'sinon';
import { Map } from 'leaflet';
import { mount } from '../test/enzyme';
import { Marker, MarkerCluster } from '.';

describe('MarkerCluster', () => {
  let leafletMap;

  beforeEach(() => {
    leafletMap = new Map(document.createElement('div'));
  });

  it('should add layer to map', () => {
    const wrapper = mount(<MarkerCluster leafletMap={leafletMap} />);

    expect(leafletMap.hasLayer(wrapper.instance().layer)).to.equal(true);
  });

  it('should add children to cluster', () => {
    const markers = [
      [12, 10],
      [23, 25],
    ];
    const wrapper = mount(
      <MarkerCluster leafletMap={leafletMap}>
        {markers.map(position => <Marker leafletMap={leafletMap} position={position} />)}
      </MarkerCluster>,
    );

    const layersCount = wrapper.instance().layer.getLayers().length;

    expect(layersCount).to.equal(markers.length);

    let index = layersCount - 1;
    wrapper.instance().layer.eachLayer((layer) => {
      expect(layer.getLatLng()).to.contain({
        lat: markers[index][0],
        lng: markers[index][1],
      });
      index -= 1;
    });
  });

  it('should add event listener when prop is updated', () => {
    const wrapper = mount(<MarkerCluster leafletMap={leafletMap} />);

    const onHappening = sinon.spy();
    wrapper.setProps({ onHappening });

    const event = new Event('happening');
    wrapper.instance().layer.fire('happening', event);

    expect(onHappening).to.have.been.calledWith(sinon.match({
      type: 'happening',
    }));
  });

  it('should remove event listeners when prop is removed', () => {
    const onChristmas = sinon.spy();
    const wrapper = mount(<MarkerCluster leafletMap={leafletMap} onChristmas={onChristmas} />);

    wrapper.setProps({ onChristmas: undefined });

    wrapper.instance().layer.fire('christmas', new Event('claus'));

    expect(onChristmas).to.not.have.been.called;
  });

  it('should remove children from cluster upon unmount', () => {
    const markers = [
      [12, 13],
      [21, 22],
    ];
    const wrapper = mount(
      <MarkerCluster leafletMap={leafletMap}>
        {markers.map(position => <Marker position={position} />)}
      </MarkerCluster>,
    );
    const cluster = wrapper.instance().layer;
    wrapper.unmount();

    expect(leafletMap.hasLayer(cluster)).to.equal(false);
  });
});
