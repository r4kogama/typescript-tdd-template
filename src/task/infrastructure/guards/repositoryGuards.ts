const Note = require('../../domain/entities/note');

 export function isObject(obj: typeof Note | undefined ): obj is typeof Note  {
   if(obj !== undefined){
    return obj instanceof Note;
  }
  return false;
}
  
