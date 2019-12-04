import { h } from 'preact';
import { expect } from 'chai';
import sinon from 'sinon';
import leaflet from 'leaflet';
import { mount } from '../test/enzyme';
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
      attributionControl: true,
      bounceAtZoomLimits: true,
      boundsOptions: { paddingTopLeft: [0, 1] },
      crs: [],
      easeLinearity: false,
      fadeAnimation: false,
      inertia: false,
      inertiaDeceleration: 300,
      inertiaMaxSpeed: Infinity,
      keyboard: true,
      keyboardPanDelta: 10,
      layers: [],
      markerZoomAnimation: true,
      maxBounds: 12,
      maxBoundsViscosity: 0.1,
      maxZoom: 3,
      minZoom: 2,
      preferCanvas: true,
      renderer: false,
      scrollWheelZoom: false,
      tap: true,
      tapTolerance: 10,
      touchZoom: false,
      transform3DLimit: true,
      wheelDebounceTime: 200,
      wheelPxPerZoomLevel: 1,
      worldCopyJump: true,
      zoomAnimation: false,
      zoomControl: false,
    };
    sandbox.stub(leaflet, 'Map').returns({ on: () => null, setView: () => null });
    mount(<Map {...mapOptions} nonMapOption />);

    expect(leaflet.Map).to.have.been.calledWithExactly(sinon.match.any, sinon.match(mapOptions));
  });

  it('should call setBounds if bounds are given', () => {
    const bounds = leaflet.latLngBounds(
      leaflet.latLng(59.362774, 18.116663116961718),
      leaflet.latLng(59.34308605870865, 18.081772942096),
    );
    sandbox.stub(leaflet.Map.prototype, 'fitBounds');
    mount(<Map bounds={bounds} center={[59.35, 18.10]} />);

    expect(leaflet.Map.prototype.fitBounds).to.have.been.calledWithExactly(bounds);
  });

  it('should update bounds when changing bounds prop', () => {
    const wrapper = mount(<Map center={[59.35, 18.10]} />);
    const bounds = leaflet.latLngBounds(
      leaflet.latLng(59.362774, 18.116663116961718),
      leaflet.latLng(59.34308605870865, 18.081772942096),
    );

    sandbox.stub(leaflet.Map.prototype, 'fitBounds');
    wrapper.setProps({ bounds });

    expect(leaflet.Map.prototype.fitBounds).to.have.been.calledWithExactly(bounds);
  });

  it('should update the center position upon changing center prop', () => {
    const wrapper = mount(<Map />);

    const center = { lat: 56.38, lng: 17.98 };
    wrapper.setProps({ center });

    expect(wrapper.state('map').getCenter()).to.deep.include(center);
  });

  it('should update the zoom upon changing zoom prop', () => {
    const wrapper = mount(<Map center={[12, 13]} zoom={12} />);

    const zoom = 2;
    wrapper.setProps({ zoom });

    expect(wrapper.state('map').getZoom()).to.equal(zoom);
  });

  it('should add event listeners for each prop prefixed with on upon mount', () => {
    const onSomething = () => null;
    sandbox.spy(leaflet.Map.prototype, 'on');
    mount(<Map onSomething={onSomething} />);

    expect(leaflet.Map.prototype.on).to.have.been.calledWith('something', onSomething);
  });

  xit('should add event listeners for each prop prefixed with on upon update', () => {
    const wrapper = mount(<Map />);

    sandbox.spy(wrapper.state('map'), 'on');
    const onSomething = () => null;
    wrapper.setProps({ onSomething });

    expect(wrapper.state('map').on).to.have.been.calledWith('something', onSomething);
  });

  xit('should remove event listeners when a prop is removed', () => {
    const onElse = () => null;
    const wrapper = mount(<Map onElse={onElse} />);

    sandbox.spy(wrapper.state('map'), 'off');
    wrapper.setProps({ onElse: undefined });

    expect(wrapper.state('map').off).to.have.been.calledWith('else', onElse);
  });

  xit('should remove event listeners upon unmount', () => {
    const onZoom = () => null;
    sandbox.spy(leaflet.Map.prototype, 'on');
    const wrapper = mount(<Map onZoom={onZoom} />);

    expect(leaflet.Map.prototype.on.getCalls().length).to.be.greaterThan(0);

    sandbox.spy(leaflet.Map.prototype, 'off');
    wrapper.unmount();

    expect(leaflet.Map.prototype.off).to.have.been.calledWithExactly('zoom', onZoom);
  });

  xit('should destroy the map upon unmount', () => {
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
