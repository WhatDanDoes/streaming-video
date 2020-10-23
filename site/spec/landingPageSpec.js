const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;
Browser.localhost('example.com', PORT);
const app = require('../app');

describe('landing page', () => {
  const browser = new Browser();

//  beforeEach(done => {
//    done();
//  });
//
//  afterEach(() => {
//  });

  it('displays the page title set in .env', done => {
    browser.visit('/', (err) => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.text('body header h1', process.env.TITLE);
      done();
    });
  });

  it('sets up the flv media player', done => {
    browser.visit('/', (err) => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.element('head script[src="/flv/flv.min.js"]');
      browser.assert.element('video');
      browser.assert.element('body script:last-child');
      browser.assert.evaluate('flvjs.isSupported()');
      done();
    });
  });
});
