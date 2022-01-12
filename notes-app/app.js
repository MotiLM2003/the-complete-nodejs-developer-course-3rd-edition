// const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

const getNotes = require('./notes.js');

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
    console.log(`Title: ${argv.title}, Body: ${argv.body}`);
  },
});

// create  remove command
yargs.command({
  command: 'remove',

  describe: 'Removing a note',
  handler: () => console.log('Removing an old note.'),
});

// read
yargs.command({
  command: 'list',
  describe: 'get a list of notes',
  handler: () => console.log('showing list of notes'),
});

yargs.command({
  command: 'read',
  describe: 'reading a note',
  handler: () => console.log('reading a specific note'),
});

yargs.parse();
