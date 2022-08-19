(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EntryPageLinkCheckerBundle = {}));
})(this, (function (exports) { 'use strict';

  function testQueries() {
    const { links } = document;

    Array.from(links).forEach((link) => {
      // console.log(`link: ${link}, type: ${typeof link}`);
      if (link.href.includes('opac-search.pl?q=')) {
        const [, query] = link.href.split('?q=');
        const decodedQuery = window.decodeURIComponent(query);

        const headers = new Headers({
          Accept: 'application/marc-in-json',
        });

        const options = {
          method: 'GET',
          headers,
        };

        const response = fetch(`/api/v1/public/biblios?q_ccl=${decodedQuery}`, options);
        response.then((result) => {
          console.log(result.json());
        });
      }
    });
  }

  exports.testQueries = testQueries;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
