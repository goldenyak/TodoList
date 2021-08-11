import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {ButtonRemoveTodolist} from "./ButtonRemoveTodolist";
import {AddNewTodolist} from "./components/AddNewTodolist";
import {EditableInput} from "./components/EditableInput";
import {Button, Checkbox, Fade, Grid, Icon, IconButton, Paper, Popper, TextField, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import classes from "*.module.css";

export type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    todoListId: string
    addTask: (todoListId: string, title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todoListId: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todoListId: string) => void
    addNewTodolist: (title: string) => void
    updateTaskTitle: (todoListId: string, id: string, title: string) => void
    updateTodolist: (todoListId: string, id: string, title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ToDolist(props: ToDoListPropsType) {


    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    // Методом .мар перебираем массив и засовываем каждый элемент в разметку
    const tasksJSXElements = props.tasks.map(elem => {
        const removeTask = () => props.removeTask(props.todoListId, elem.id);
        return (
            <li key={elem.id}>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={elem.isDone}*/}
                {/*    onChange={(event) => props.changeTaskStatus(props.todoListId, elem.id, event.currentTarget.checked)}*/}
                {/*/>*/}
                <Checkbox
                    checked={elem.isDone}
                    onChange={(event) => props.changeTaskStatus(props.todoListId, elem.id, event.currentTarget.checked)}
                    defaultChecked
                    size={"small"}
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                <EditableInput title={elem.title} updateTaskTitle={props.updateTaskTitle} todoListId={props.todoListId}
                               id={elem.id}/>
                {/*<span>{elem.title}</span>*/}
                <button onClick={removeTask}>x</button>
            </li>)
    })

    function addTask() {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todoListId, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    function onAllClickHandler() {
        props.changeFilter(props.todoListId, 'all')
    }

    function onActiveClickHandler() {
        props.changeFilter(props.todoListId, 'active')
    }

    function onCompletedClickHandler() {
        props.changeFilter(props.todoListId, 'completed')
    }

    function onTitleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    function onTitleKeyPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') addTask()
    }

    const errorMessage = error ? <div className={'error-message'}> Title is required</div> : null

    return (
        <Paper elevation={3} style={{padding: '10px'}}>
            <h3>
                <EditableInput title={props.title} updateTaskTitle={props.updateTodolist} todoListId={props.todoListId}
                               id={'заглушка'}/>
                <ButtonRemoveTodolist removeTodolist={props.removeTodolist} todoListId={props.todoListId}/>
            </h3>
            <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                <TextField label="Enter task name"
                           id="outlined-size-small"
                           defaultValue="Small"
                           variant="outlined"
                           size="small"
                           className={error ? 'error' : ''}
                           value={title}
                           onChange={onTitleChangeHandler}
                           onKeyPress={onTitleKeyPressHandler}
                />
                <IconButton aria-label="delete">
                    <AddIcon
                        onClick={addTask}>
                    </AddIcon>
                </IconButton>
                {errorMessage}
            </Grid>
            <ul>
                {/*Засунули елемент в разметку, который перебирали методом .мар*/}
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </Paper>
    )
}