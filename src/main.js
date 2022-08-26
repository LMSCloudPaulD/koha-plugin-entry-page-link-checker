export async function testQueries() {
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
    .map((result, idx) => ({
      tag: linkTags[idx],
      status: result.status,
      url: result.url,
      response: result.json(),
    }));

  console.table(linkData);
}

export function test() {

}
