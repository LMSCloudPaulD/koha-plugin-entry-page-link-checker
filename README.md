# koha-plugin-entry-page-link-checker

Since it's always a hassle to check links on our entry pages by hand, why not automate it with the awesome new /public/biblios endpoint?

## Installation

Just install it like any other plugin.

## Usage

Open the browser console on a page with entry page links. For example OPACEntryPageChildto9*.
If you refresh the page, you'll see a large amount of fetch requests to those links.
In their response you'll find the JSON payload and are able to inspect whether a link returns sane results or not.

If you're done testing remove or disable the plugin as it executes those requests on every page refresh.

###

Still very much work in progress. Now only proof of concept.
