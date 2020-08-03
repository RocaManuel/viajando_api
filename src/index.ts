import { App } from './app';
import t = require('terminal-kit');

const app = new App();
const port = process.env.PORT || 3000

app.getApp().listen(port, () => {
  t.terminal('App runing and listen port', port);
});