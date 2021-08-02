export class Todo{

    static fromjson({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);
        
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea){

        this.tarea = tarea;
        this.id    = new Date().getTime(); //obtiene la hora minuto segundo del timepo actual
        this.completado = false;
        this.creado = new Date();
    }
}