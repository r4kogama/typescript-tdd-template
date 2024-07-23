const Note = require('./note');

export class Task  {
    private note : typeof Note;
    constructor(name: string, description: string){
        this.note = new Note(name, description);
    }
     
    getNote(): typeof Note {
        return this.note;
    }

}


