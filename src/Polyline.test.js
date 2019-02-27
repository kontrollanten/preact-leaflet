import { h } from 'preact';
import { expect } from 'chai';
import sinon from 'sinon';
import { Map } from 'leaflet';
import { mount } from '../test/enzyme';
import Polyline from './Polyline';

describe('Polyline', () => {
  const sandbox = sinon.createSandbox();
  const defaultProps = {
    leafletMap: new Map(document.createElement('div')),
    positions: [[1, 2]],
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should log an error if no positions are given', () => {
    sandbox.stub(console, 'error');
    try {
      mount(<Polyline {...defaultProps} positions={undefined} />);
    } catch (error) {}

    expect(console.error).to.have.been.calledWith(sinon.match(/positions/));
  });

  it('should log an error if no leafletMap prop are given', () => {
    sandbox.stub(console, 'error');

    expect(() => mount(<Polyline {...defaultProps} leafletMap={undefined} />)).to.throw();

    expect(console.error).to.have.been.calledWith(sinon.match(/leafletMap/));
  });

  it('should add polyline to map', () => {
    const leafletMap = new Map(document.createElement('div'));
    const wrapper = mount(<Polyline {...defaultProps} leafletMap={leafletMap} />);

    expect(leafletMap.hasLayer(wrapper.instance().layer)).to.be.true;
  });
});
