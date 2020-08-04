import { App } from './app';
import t = require('terminal-kit');
import { createConnection } from 'typeorm';
import { config } from '../ormconfig';
const app = new App();
const port = process.env.PORT || 3000


createConnection(config).then(async (_connection) => {
  app.getApp().listen(port, () => {
    t.terminal('App runing and listen port', port);
  });
  }).catch(error => console.log(error));