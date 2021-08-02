
///Referencias al html

import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const inputNewtodo = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const filtros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo)=>{
    const htmlTodo = `
    <li class="${(todo.compleatdo) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
		    <input class="toggle" type="checkbox" ${(todo.compleatdo) ? 'checked' : ''}>
		    <label>${todo.tarea}</label>
		    <button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

///eventos

inputNewtodo.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13 && inputNewtodo.value.length > 0){
        console.log(inputNewtodo.value);
        const nuevoTodo = new Todo( inputNewtodo.value);
        todoList.nuevoTodo(nuevoTodo);
        
        inputNewtodo.value='';
        crearTodoHTML(nuevoTodo);
    }
});

divTodoList.addEventListener('click', (event)=>{
    const NombreElemnto = event.target.localName; /// input - label - button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    console.log(NombreElemnto);

    if(NombreElemnto.includes('input')){
        todoList.todoCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(NombreElemnto.includes('button')){
        todoList.eliminartodo(todoId); //elimina la tarea del arreglo.
        divTodoList.removeChild(todoElemento); //elimina el div.
    }
    console.log(todoList)
});

btnEliminarCompletados.addEventListener('click', (event)=>{
    todoList.eliminarCompleatados();
    console.log(todoList);  

    for(let i = divTodoList.children.length -1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click', (event)=>{
    const filtro= event.target.text;
    if(!filtro){return;}

    filtros.forEach(element => element.classList.remove('selected'));

    event.target.classList.add('selected');
    
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;

        }
    }


})