import * as utils from './utils';
import * as strategies from './strategies';

// initialize the strategies
const initAuthentication = (app) => {
  utils.setup();
  strategies.JWTStrategy();
  strategies.FacebookStrategy();
};

export { utils, initAuthentication, strategies };
