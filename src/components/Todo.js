import React, {useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import {useFormInput} from "../hooks/forms";
import List from './List';

const todo = props => {
    const [inputIsValid, setInputIsValid] = useState(false);
    //const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);
    //const [submittedTodo, setSubmittedTodo] = useState(null)
    //   const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  //  const todoInputRef = useRef();
    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        axios.get('https://test-project-f986f.firebaseio.com//todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({id: key, name: todoData[key].name});
            }
            dispatch({type: 'SET', payload: todos});
        });
        return () => {
            console.log('Cleanup');
        };
    }, []);


    const inputValidationHandler = event =>{
        if(event.target.value.trim()===''){
            setInputIsValid(false)
        }else{
            setInputIsValid(true)
        }
    }
    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    };

/*    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    });*/

/*    useEffect(() => {
        if (submittedTodo) {
            dispatch({type: 'ADD', payload: submittedTodo})
        }
    }, [submittedTodo]);*/

/*    const inputChangeHandler = event => {
        // setTodoState({
        //   userInput: event.target.value,
        //   todoList: todoState.todoList
        // });
        setTodoName(event.target.value);
    };*/

    const todoAddHandler = () => {
        // setTodoState({
        //   userInput: todoState.userInput,
        //   todoList: todoState.todoList.concat(todoState.userInput)
        // });

        const todoName = todoInput.value;
        axios
            .post('https://test-project-f986f.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                setTimeout(() => {
                    const todoItem = {id: res.data.name, name: todoName};
                    dispatch({type: 'ADD', payload: todoItem})
                }, 3000)

            })
            .catch(err => {
                console.log(err);
            });
    };

    const removeHandler = (todoId) => {
        axios.delete(`https://test-project-f986f.firebaseio.com/todos/${todoId}.json`).then().catch(err => console.log(err))
        dispatch({type: 'REMOVE', payload: todoId})
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Todo"
                onChange={todoInput.onChange}
                value={ todoInput.value}
                style={{backgroundColor: todoInput.validity ===true ? 'transparent':'red'}}
            />
            <button type="button"
                    onClick={todoAddHandler}>
                Add
            </button>
            {useMemo(()=><List onClickHandler={removeHandler} items={todoList}/>, [todoList])}
        </React.Fragment>
    );
};

export default todo;
