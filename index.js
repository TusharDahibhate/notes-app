const yargs = require('yargs');
const notesModule = require('./notes');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    description: 'Adds a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notesModule.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    description: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notesModule.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    description: 'Lists a note',
    handler: () => {
        notesModule.listNotes();
    }
});

yargs.command({
    command: 'read',
    description: 'Reads a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notesModule.readNote(argv.title);
    }
});

yargs.parse()
