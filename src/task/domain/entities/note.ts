const Status = require('../values/taskStatus');

class Note{
    constructor(
        public name: string, 
        public content: string, 
        public status: string | undefined = "pending"
    ){}

    asignStatusNote(current: string):string | undefined{
        if(current === "completed"){
            return this.status = Status.COMPLETED;
        }else if(current === "incompleted"){
            return this.status = Status.INCOMPLETE;
        }else if(current === "pending"){
            return this.status = Status.PENDING;
        }else{
            return this.status = Status.PENDING;
        }
    }
}
module.exports = Note;
