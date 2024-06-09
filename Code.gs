/**
 * Based on https://github.com/pwillia7/Text_Bookmarklet
 */

/**
 * Handles HTTP GET requests to the web app, rendering the main page.
 *
 * @returns {HtmlOutput} The HTML output for the main page of the web app.
 */
function doGet(e) {
	const template = HtmlService.createTemplateFromFile('index');
	return template
		.evaluate()
		.setTitle("Notepad")
		.addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
/**
 * Includes the specified file content in the HTML template.
 *
 * @param {string} filename - The name of the file to include.
 * @returns {string} The content of the included file.
 */
function include(filename) {
	return HtmlService.createHtmlOutputFromFile(filename)
			.getContent();
}

function saveEntriesToProperties(entriesJSON) {
  PropertiesService.getScriptProperties().setProperty('entries', entriesJSON);
}

function loadEntriesFromProperties() {
  return PropertiesService.getScriptProperties().getProperty('entries');
}
