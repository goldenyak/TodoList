import {Button} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";

type AddNewTodolistType = {
    addNewTodolist: (title: string) => void
}

export function AddNewTodolist(props: AddNewTodolistType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    function onTitleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    function onTitleKeyPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') addNewTodolist()
    }

    function addNewTodolist() {
        if (title.trim() !== '') {
            props.addNewTodolist(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const errorMessage = error ? <div className={'error-message'}> Title is required</div> : null

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onTitleChangeHandler}
                onKeyPress={onTitleKeyPressHandler}
            />
            {/*<button onClick={addNewTodolist}>+</button>*/}
            <Button variant="contained"
                    color="secondary"
                    onClick={addNewTodolist}>
                +
            </Button>
            {errorMessage}
        </div>
    )
}