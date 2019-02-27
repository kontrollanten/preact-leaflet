const onPropRegex = /on[A-Z](.*)/;

const getProvidedEventListeners = props => Object.keys(props)
  .filter(prop => prop.match(onPropRegex))
  .map(prop => ({
    callback: props[prop],
    event: prop.slice(2).replace(/^[A-Z]/, e => e.slice(0, 1).toLowerCase()),
    prop,
  }));

const manageListeners = (inst, props, { filter, type }) => {
  let listeners = getProvidedEventListeners(props);

  if (filter) {
    listeners = listeners.filter(filter);
  }

  listeners
    .forEach(({ event, callback }) => {
      inst[type](event, callback);
    });
};

const addListenersFromProps = (inst, props, { filter } = {}) => {
  manageListeners(inst, props, { filter, type: 'on' });
};

const removeListenersFromProps = (inst, props, { filter } = {}) => {
  manageListeners(inst, props, { filter, type: 'off' });
};

export {
  addListenersFromProps,
  onPropRegex,
  removeListenersFromProps,
};
