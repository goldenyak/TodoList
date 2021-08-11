import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ButtonPropsType = {
    removeTodolist: (todoListId: string) => void
    todoListId: string
}

export const ButtonRemoveTodolist = (props: ButtonPropsType) => {
    return (
        <>
            {/*<button onClick={ () => {props.removeTodolist(props.todoListId)} }>X</button>*/}
            {/*<IconButton aria-label="delete"*/}
            {/*            onClick={ () => {props.removeTodolist(props.todoListId)} }>*/}
            {/*    <Delete fontSize="small" style={ {color: "darkgrey"} } />*/}
            {/*</IconButton>*/}

            <Tooltip title="Удалить эту таску" arrow>
                <IconButton aria-label="delete"
                            onClick={ () => {props.removeTodolist(props.todoListId)} }>
                    <Delete fontSize="small" style={ {color: "darkgrey"} } />
                </IconButton>
            </Tooltip>

        </>
    )
}