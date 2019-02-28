# preact-leaflet [![codecov](https://codecov.io/gh/kontrollanten/preact-leaflet/branch/master/graph/badge.svg)](https://codecov.io/gh/kontrollanten/preact-leaflet) [![CircleCI](https://circleci.com/gh/kontrollanten/preact-leaflet.svg?style=svg)](https://circleci.com/gh/kontrollanten/preact-leaflet)

Supporting following Leaflet components:
* [Map](https://leafletjs.com/reference-1.4.0.html#map-example)
* [Marker](https://leafletjs.com/reference-1.4.0.html#marker)
* [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)
* [Polyline](https://leafletjs.com/reference-1.4.0.html#polyline)
* [TileLayer](https://leafletjs.com/reference-1.4.0.html#tilelayer)
* [ZoomControl](https://leafletjs.com/reference-1.4.0.html#control-zoom)

## Example

```
import { Map, TileLayer } from 'preact-leaflet';

<Map center={[63.83919, 20.15069]} style={{ height: '100%' }} zoom={10}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</Map>
```

For more advanced examples, look into the [e2e App](e2e/App.js) and it's [published version](https://preact-leaflet.netlify.com/).

## API
This is just a thin wrapper, checkout [Leaflet API](https://leafletjs.com/reference-1.4.0.html) for usage.

### Options
All props, except for `on` prefixed, are passed to Leaflet.

### Event listeners
Props prefixed with `on` are handled as event listeners, e.g. `onZoom` will listen for the `zoom` event.
