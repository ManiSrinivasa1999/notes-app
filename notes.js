const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  debugger
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('New Note added!'));
  } else {
    console.log(chalk.red('Note title taken!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length === notesToKeep.length) {
    console.log(chalk.red('No Note found!'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green('Note removed!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green('Your notes'));
  notes.forEach((note) => console.log(chalk.blue(note.title)));
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green(note.title));
    console.log(chalk.gray(note.body));
  } else {
    console.log(chalk.red('No note was found'));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
