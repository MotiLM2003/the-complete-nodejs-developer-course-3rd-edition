const fs = require('fs');
const chalk = require('chalk');
const { completion } = require('yargs');

// file name
const fileName = './notes.json';

// get notes
const getNotes = (note) => `Your notes ${note}`;

// add note
const addNote = (title, body) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!notes.find((note) => note.title === title)) {
    notes.push({ title, body });
    saveNotes(notes);
  } else {
    console.log('note already exists');
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(fileName, JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    const notes = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(notes);
  } catch (err) {
    console.log('error');
    return [];
  }
};

const validator = () => {
  console.log('information is required, please fill the require data');
};

const removeNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    saveNotes(notes.filter((x) => x.title !== note.title));
    console.log(chalk.green.inverse(`${note.title} has been removed`));
  } else {
    console.log(chalk.red.inverse('no note has been found'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your Notes:'));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const note = loadNotes().find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.green.inverse(note.body));
  } else {
    console.log(chalk.red.inverse('note not found'));
  }
};
module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
