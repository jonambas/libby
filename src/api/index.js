import qs from 'qs';
import createBus from 'page-bus';

function makeKey(name, kind) {
  return `${kind}__${name.toLowerCase().split(' ').join('-')}`;
}

function nameToTitle(name) {
  return name.split('/').pop();
}

export const bus = createBus();
bus.setMaxListeners(100);

export class Libra {
  constructor() {
    this.source = [];
    this.formatted = {};
  }

  start(config) {
    ((context) => {
      context.keys().forEach((key) => {
        context(key);
      });
    })(config.stories);
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

  formatEntries() {
    this.formatted = this.source.reduce((acc, entry) => {
      if (!acc[entry.kind]) {
        acc[entry.kind] = [entry];
      } else {
        acc[entry.kind].push(entry);
      }
      return acc;
    }, {});
  }

  getEntries() {
    this.formatEntries();
    return this.formatted;
  }
}
