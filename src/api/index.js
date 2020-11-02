import { Libby, bus as pagebus } from './api';
import config from '__LIBBY_CONFIG__';

export const api = new Libby();
export const add = api.add.bind(api);
export const describe = api.describe.bind(api);
export const bus = pagebus;

api.configure(config.entries());
