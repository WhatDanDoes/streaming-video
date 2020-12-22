const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;
Browser.localhost('example.com', PORT);
const app = require('../app');

describe('landing page', () => {
  const browser = new Browser();

  it('displays the page title set in .env', done => {
    browser.visit('/', err => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.text('body header h1', process.env.TITLE);
      done();
    });
  });

  it('sets up the flv media player elements', done => {
    browser.visit('/', err => {
      if (err) return done.fail(err);
      browser.assert.success();
      browser.assert.element('head script[src="/flv/flv.min.js"]');
      browser.assert.element('video#viewer[autoplay="true"][poster="/images/waiting.svg"]');
      browser.assert.element('body script:last-child');
      // I guess zombie doesn't support the video component...
      // This does prove, however, that the flv script is loaded
      browser.assert.evaluate('flvjs.isSupported()', undefined);
      done();
    });
  });

  describe('with no stream', () => {
    beforeEach(done => {
      browser.visit('/', err => {
        if (err) return done.fail(err);
        browser.assert.success();

        done();
      });
    });

    it('doesn\'t show muted icon', () => {
      browser.assert.element('#muted-icon[style="display: none;"]');
    });

    it('doesn\'t toggle muted icon visibility', done => {
      browser.click('video#viewer', err => {
        if (err) return done.fail(err);
        browser.assert.element('#muted-icon[style="display: none;"]');

        browser.click('video#viewer', err => {
          if (err) return done.fail(err);
          browser.assert.element('#muted-icon[style="display: none;"]');

          done();
        });
      });
    });
  });

  describe('while streaming', () => {

    beforeEach(done => {
      browser.visit('/', err => {
        if (err) return done.fail(err);
        browser.assert.success();
        browser.assert.element('#muted-icon');

        const target = browser.querySelector('video#viewer');
        browser.fire(target, 'onloadstart', () => {
          done();
        });
      });
    });

    it('toggles muted setting on viewer', done => {
      expect(browser.document.getElementById('viewer').muted).toBe(true);

      browser.click('video#viewer', (err) => {
        if (err) return done.fail(err);
        expect(browser.document.getElementById('viewer').muted).toBe(false);

        browser.click('video#viewer', (err) => {
          if (err) return done.fail(err);
          expect(browser.document.getElementById('viewer').muted).toBe(true);

          done();
        });
      });
    });

    it('hides and reveals muted icon when clicking video element', done => {
      browser.assert.element('#muted-icon[style="display: block;"]');

      browser.click('video#viewer', err => {
        if (err) return done.fail(err);
        browser.assert.element('#muted-icon[style="display: none;"]');

        browser.click('video#viewer', err => {
          if (err) return done.fail(err);
          browser.assert.element('#muted-icon[style="display: block;"]');

          done();
        });
      });
    });

    it('hides and reveals muted icon when clicking said icon', done => {
      browser.click('#muted-icon', err => {
        if (err) return done.fail(err);
        browser.assert.element('#muted-icon[style="display: none;"]');

        browser.click('#muted-icon', err => {
          if (err) return done.fail(err);
          browser.assert.element('#muted-icon[style="display: block;"]');

          done();
        });
      });
    });
  });
});
