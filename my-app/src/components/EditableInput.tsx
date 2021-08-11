import React, {ChangeEvent, MouseEventHandler, useState} from "react";

type EditableInputType = {
    title: string
    updateTaskTitle: (todoListId: string, id: string, title: string) => void
    todoListId: string
    id: string
}

export function EditableInput(props: EditableInputType) {
    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(false)

    function changeSetEditMode(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function onEditMode() {
        setEditMode(true)
    }
    function offEditMode() {
        setEditMode(false)
        props.updateTaskTitle(props.todoListId, props.id, title)
    }

    return (
        editMode
            ? <input autoFocus
                     value={title}
                     onChange={changeSetEditMode}
                     onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
