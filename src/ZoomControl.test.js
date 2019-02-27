import { h } from 'preact';
import { expect } from 'chai';
import { Map } from 'leaflet';
import { mount } from '../test/enzyme';
import ZoomControl from './ZoomControl';

describe('ZoomControl', () => {
  let leafletMap;

  beforeEach(() => {
    leafletMap = new Map(document.createElement('div'));
  });

  it('should add zoom control to map', () => {
    const controlElem = mount(<ZoomControl leafletMap={leafletMap} />)
      .instance().control.getContainer();
    const leafletElem = leafletMap.getContainer();

    expect(leafletElem.contains(controlElem)).to.equal(true);
  });

  it('should update position upon position prop is updated', () => {
    const wrapper = mount(<ZoomControl leafletMap={leafletMap} position="topleft" />);

    const position = 'bottomleft';
    wrapper.setProps({ position });

    expect(wrapper.instance().control.getPosition()).to.equal(position);
  });

  it('should remove zoom control from map upon unmount', () => {
    const wrapper = mount(<ZoomControl leafletMap={leafletMap} />);
    const controlElem = wrapper.instance().control.getContainer();
    wrapper.unmount();

    const leafletElem = leafletMap.getContainer();

    expect(leafletElem.contains(controlElem)).to.equal(false);
  });
});
