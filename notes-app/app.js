// const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const {
  addNote,
  getNotes,
  removeNote,
  listNotes,
  readNote,
} = require('./notes.js');

// customize yargs version
// yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

// create  remove command
yargs.command({
  command: 'remove',
  describe: 'Removing a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List all notes',
  builder: {},
  handler: (argv) => {
    listNotes(argv.title);
  },
});

yargs.command({
  command: 'read',
  describe: 'reading a note',
  builder: {
    title: {
      demandOption: true,
    },
  },
  handler: (argv) => readNote(argv.title),
});

yargs.parse();
