const fs = require('fs');
const chalk = require('chalk');

var addNote = (title, body) => {
    var notes = fetchNotes();

    var duplicateNote = notes.find((note) => {
        return note.title === title
    })

    if (!duplicateNote) {
        notes.push({ title: title, body: body });
        writeNotes(notes);
        console.log(chalk.green('SUCCESS! The note has been added'));
    } else {
        console.log(chalk.red('ERROR: Duplicate Note'));
    }
};

var fetchNotes = () => {
    try {
        notes = JSON.parse(fs.readFileSync('notes.json').toString());
        return notes;
    }
    catch (e) {
        return [];
    }
}

var writeNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const removeNote = (title) => {
    var notes = fetchNotes();

    var newNotes = notes.filter((note) => {
        return note.title != title;
    });

    if (notes.length === newNotes.length) {
        console.log(chalk.red('Title is not present!'));
    } else {
        console.log(chalk.green('SUCCESS! The note has been removed'));
        writeNotes(newNotes);
    }
}

const listNotes = () => {

    notes = fetchNotes();
    console.log('---------------------------------');
    console.log(chalk.green('NOTES:'));
    console.log('---------------------------------');

    notes.forEach((note) => {
        console.log(chalk.bold.blue(note.title + ': ') + chalk.yellow(note.body));
    });
}

const readNote = (title) => {
    var notes = fetchNotes();
    var note = notes.find((note) => {
        return note.title === title;
    });

    if (note) {
        console.log(chalk.green.bold(note.title + ': ') + chalk.yellow(note.body));
    } else {
        console.log(chalk.red('ERROR: Note not found!'));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}