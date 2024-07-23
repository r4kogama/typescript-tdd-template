import { TaskStatus as State } from "../values/taskStatus";

export class Note{
    constructor(
        public name: string, 
        public content: string, 
        public status: string | undefined = "pending"
    ){}

    asignStatusNote(current: string):string | undefined{
        if(current === "completed"){
            return this.status = State.COMPLETED;
        }else if(current === "incompleted"){
            return this.status = State.INCOMPLETE;
        }else if(current === "pending"){
            return this.status = State.PENDING;
        }else{
            return this.status = State.PENDING;
        }
    }
}