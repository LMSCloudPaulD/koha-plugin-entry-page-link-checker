(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EntryPageLinkCheckerBundle = {}));
})(this, (function (exports) { 'use strict';

  async function testQueries() {
    const { links } = document;

    const linkTags = [];
    const linkRequests = [];
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

        linkTags.push(link);
        linkRequests.push(fetch(`/api/v1/public/biblios?q_ccl=${decodedQuery}`, options));
      }
    });

    const linkResults = await Promise.allSettled(linkRequests);
    const linkResultsValues = linkResults.map((linkResult) => linkResult.value);
    const linkData = linkResultsValues
      .map(async (result, idx) => ({
        tag: linkTags[idx],
        status: result.status,
        url: result.url,
        response: await result.json(),
      }));

    console.table(linkData);
  }

  function test() {

  }

  exports.test = test;
  exports.testQueries = testQueries;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
