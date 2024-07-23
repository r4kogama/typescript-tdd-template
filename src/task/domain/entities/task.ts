import { Note } from "./note";

export class Task  {
    private note : Note;
    constructor(name: string, description: string){
        this.note = new Note(name, description);
    }
     
    getNote(): Note {
        return this.note;
    }

}


