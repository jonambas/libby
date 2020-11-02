import { Libra, bus as pagebus } from './api';
import config from '__LIBRA_CONFIG__';

export const api = new Libra();
export const add = api.add.bind(api);
export const describe = api.describe.bind(api);
export const bus = pagebus;

api.configure(config.entries);
