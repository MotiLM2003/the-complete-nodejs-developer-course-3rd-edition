// const validator = require('validator');
const chalk = require('chalk');

const getNotes = require('./notes.js');
// console.log(getNotes('note 1'));

// console.log(validator.isURL('https://mailcom'));

const log = console.log;
log(chalk.blue.inverse('hello', 'world'));

console.log(chalk.green('Success'));
