import { onPropRegex } from './map-listeners';

export default (props, { exclude = 'dontMatchMe22' } = {}) => Object.keys(props)
  .filter(p => (p !== exclude && !p.match(onPropRegex)))
  .reduce((acc, val) => ({ ...acc, [val]: props[val] }), {});
