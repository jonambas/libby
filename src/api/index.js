import React from 'react';
import createBus from 'page-bus';

function titleToKey(title) {
  return title.split(' ').join('-');
}

export const bus = createBus();

export class Libra {
  constructor() {
    this.source = [];
  }

  start(config) {
    ((context) => {
      context.keys().forEach((key) => {
        context(key);
      });
    })(config.stories);
  }

  add(title, render) {
    this.source.push({ key: titleToKey(title), title, render });
  }

  getEntries() {
    return this.source;
  }
}
