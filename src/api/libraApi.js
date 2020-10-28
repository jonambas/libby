import createBus from 'page-bus';

function makeKey(name, kind) {
  return `${kind}__${name.toLowerCase().split(' ').join('-')}`;
}

export const bus = createBus();
bus.setMaxListeners(100);

export class Libra {
  constructor() {
    this.source = [];
    this.formatted = {};
  }

  configure(config) {
    ((context) => {
      context.keys().forEach((key) => {
        context(key);
      });
    })(config.stories);

    this._formatEntries();
    this._startEvents();
  }

  add(name, render) {
    this.source.push({
      kind: this.kind,
      key: makeKey(name, this.kind),
      name,
      render
    });
  }

  describe(kind, cb) {
    this.kind = kind;
    cb();
    this.kind = 'root';
  }

  _formatEntries() {
    this.formatted = this.source.reduce((acc, entry) => {
      if (!acc[entry.kind]) {
        acc[entry.kind] = [entry];
      } else {
        acc[entry.kind].push(entry);
      }
      return acc;
    }, {});
  }

  getEntry() {
    const activeKey = window.location.search.replace('?path=', '');
    const kind = activeKey.split('__').shift();

    if (kind && this.formatted[kind]) {
      return this.formatted[kind].find(({ key }) => key === activeKey);
    }

    return null;
  }

  _getFirstEntry() {
    const firstKind = this.formatted[Object.keys(this.formatted)[0]];
    return firstKind[0];
  }

  _getMetadata() {
    const toEmit = Object.keys(this.formatted).map((key) => {
      return this.formatted[key].map(({ render, ...entry }) => entry);
    });
    return toEmit;
  }

  _startEvents() {
    bus.emit('set_entries', this._getMetadata());
    bus.on('load_entry', (search) => {
      if (search && window.location.search !== search) {
        window.location.search = search;
      }
    });
  }
}
