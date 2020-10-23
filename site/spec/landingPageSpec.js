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

  it('sets up the flv media player elements', done => {
    browser.visit('/', (err) => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.element('head script[src="/flv/flv.min.js"]');
      browser.assert.element('video#viewer[muted="true"][autoplay="true"][poster="/images/waiting.svg"]');
      browser.assert.element('body script:last-child');
      // I guess zombie doesn't support the video component...
      // This does prove, however, that the flv script is loaded
      browser.assert.evaluate('flvjs.isSupported()', undefined);
      done();
    });
  });

  it('toggles muted setting on viewer', done => {
    browser.visit('/', (err) => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.element('video#viewer[muted="true"]');
      browser.assert.elements('video#viewer[muted="false"]', 0);

      browser.click('video#viewer', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('video#viewer[muted="true"]', 0);
        browser.assert.element('video#viewer[muted="false"]');

        browser.click('video#viewer', (err) => {
          if (err) return done.fail(err);
          browser.assert.element('video#viewer[muted="true"]');
          browser.assert.elements('video#viewer[muted="false"]', 0);

          done();
        });
      });
    });
  });
});
