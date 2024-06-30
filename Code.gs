
/**
 * Renders the web app UI.
 * @return {HtmlOutput} The HTML output.
 *
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
/**
 * Log debug messages based on the specified debug level.
 * @param {number} level - The debug level of the message. 0 = None, 1 = Normal, 2 = Heavy.
 * @param {string} message - The debug message to log.
 * @param {...any} args - Additional arguments to include in the log message.
 */
function logDebug(level, message, ...args) {
    if (level <= DEBUG_LEVEL) { // Log if level is less than or equal to DEBUG_LEVEL
        console.log(`[DEBUG ${level}] ${message}`, ...args);
    }
}





/**
 * Gets the list of notes.
 * @return {Array} List of notes.
 */
function getNotes() {
  const userProperties = PropertiesService.getUserProperties();
  const notes = JSON.parse(userProperties.getProperty('notes') || '[]');
  return notes;
}

/**
 * Gets a note by its ID.
 * @param {number} id - The ID of the note.
 * @return {Object} The note object.
 */
function getNoteById(id) {
  const notes = getNotes();
  return notes.find(note => note.id === id);
}

/**
 * Adds a new note.
 * @return {Array} Updated list of notes.
 */
function addNote() {
  const userProperties = PropertiesService.getUserProperties();
  const notes = getNotes();
  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title: 'New Note',
    content: ''
  };
  notes.push(newNote);
  userProperties.setProperty('notes', JSON.stringify(notes));
  return notes;
}

/**
 * Edits the title of a note.
 * @param {number} id - The ID of the note.
 * @param {string} newTitle - The new title of the note.
 */
function editNoteTitle(id, newTitle) {
    const userProperties = PropertiesService.getUserProperties();
    const notes = getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex].title = newTitle;
        userProperties.setProperty('notes', JSON.stringify(notes));
    }
}

/**
 * Edits the content of a note.
 * @param {number} id - The ID of the note.
 * @param {string} newContent - The new content of the note.
 */
function editNoteContent(id, newContent) {
    const userProperties = PropertiesService.getUserProperties();
    const notes = getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex].content = newContent;
        userProperties.setProperty('notes', JSON.stringify(notes));
    }
}


function saveNote(note) {
    const userProperties = PropertiesService.getUserProperties();
    const notes = JSON.parse(userProperties.getProperty('notes')) || [];

    const noteIndex = notes.findIndex(n => n.id === note.id);
    if (noteIndex !== -1) {
        notes[noteIndex] = note;
    } else {
        notes.push(note);
    }

    userProperties.setProperty('notes', JSON.stringify(notes));
}




/**
 * Deletes a note.
 * @param {number} id - The ID of the note.
 * @return {Array} Updated list of notes.
 */
function deleteNote(id) {
  const userProperties = PropertiesService.getUserProperties();
  let notes = getNotes();
  notes = notes.filter(note => note.id !== id);
  userProperties.setProperty('notes', JSON.stringify(notes));
  return notes;
}


