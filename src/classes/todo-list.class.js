import { Todo } from "./todo.class";

export class TodoList{
    
    constructor(){

        //this.todos = [];
        this.cargarLocal();
    }

    nuevoTodo(todo){

        this.todos.push(todo);
        this.guardarLocal();
    }

    eliminartodo(id){
        this.todos = this.todos.filter(todo => todo.id != id); ///hace una compia del arreglo omitiendo a que queresmo eliminar y retorna nuevo arreglo
        this.guardarLocal();
    }

    todoCompletado(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
            }
        }
        this.guardarLocal();
    }

    eliminarCompleatados(){
        this.todos = this.todos.filter(todo => !todo.completado); 
        this.guardarLocal();
    }

    guardarLocal(){
        localStorage.setItem('todo', JSON.stringify( this.todos));
    }

    cargarLocal(){
         this.todos = (localStorage.getItem('todo')) ?  JSON.parse(localStorage.getItem('todo')) : [];  

         this.todos =   this.todos.map(obj => Todo.fromjson(obj));
    }

}