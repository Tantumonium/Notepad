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




// Function to save content to Script Properties
function saveContentToScriptProperties(name, content) {
	const timestamp = new Date().toISOString(); // Add timestamp
	const key = `${name} (${timestamp})`; // Construct key
	
	// Save data to Script Properties
	const properties = PropertiesService.getScriptProperties(); // Get the Properties object first
	properties.setProperty(key, content);
	
	return key; // Return the key for reference
}

// Function to load content from Script Properties
function loadContentFromScriptProperties(key) {
	// Load data from Script Properties
	const properties = PropertiesService.getScriptProperties(); // Get the Properties object first
	return properties.getProperty(key);
}

// Function to get all keys from Script Properties
function getAllKeysFromScriptProperties() {
	const properties = PropertiesService.getScriptProperties(); // Get the Properties object first
	return properties.getProperties();
}

// Function to delete content from Script Properties
function deleteContentFromScriptProperties(key) {
	// Delete data from Script Properties
	const properties = PropertiesService.getScriptProperties(); // Get the Properties object first
	properties.deleteProperty(key);
}
