import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDolist} from './ToDolist';
import {v1} from 'uuid';
import {AddNewTodolist} from "./components/AddNewTodolist";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = { id: string, title: string, filter: FilterValuesType };
type taskGeneralType = { [key: string]: Array<TaskType> }


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Juice", isDone: true},
            {id: v1(), title: "Apple", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Hleb", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Sok", isDone: false},
        ]
    });

    function removeTask(todoListId: string, id: string) {
        let currentTask = tasks[todoListId];
        console.log(currentTask)
        if (currentTask) {
            tasks[todoListId] = currentTask.filter(t => t.id != id)
        }
        setTasks({...tasks})
    }
    function removeTodolist(todoListId: string) {
        let currentTodolist = todolists.filter( f => f.id !== todoListId)
        setTodolists(currentTodolist)
    }
    function addTask(todoListId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todoListId] = [task, ...tasks[todoListId]]
        setTasks({...tasks})
    }
    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        let currentStatus = tasks[todoListId];
        let task = currentStatus.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks})
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        let currentTodoList = todolists.find(t => t.id === todoListId)
        console.log(value)
        if (currentTodoList) {
            currentTodoList.filter = value
        }
        setTodolists([...todolists])
    }
    function addNewTodolist(title: string) {
        let newTodolistID = v1()
        let newTodolist: todolistsType = {id: newTodolistID, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    function updateTaskTitle(todoListId: string, id: string, title: string) {
        let currentTask = tasks[todoListId]
        if (currentTask) {
            let editableTask = currentTask.find( f => f.id === id )
            if (editableTask) {
                editableTask.title = title
            }
            setTasks({...tasks})
        }
    }
    function updateTodolist(todoListId: string, id: string, title: string) {
        let currentTodolist = todolists.find( f => f.id === todoListId)
        if (currentTodolist ? currentTodolist.title = title : title)
        setTodolists([...todolists])
    }

    return (
        <div className="App">
            <AddNewTodolist addNewTodolist={addNewTodolist} />

            {todolists.map((t) => {
                    let tasksForTodolist = tasks[t.id];
                    if (t.filter === "active") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                    }
                    // debugger
                    return (
                        <ToDolist
                            key={t.id}
                            todoListId={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            removeTodolist={removeTodolist}
                            addNewTodolist={addNewTodolist}
                            updateTaskTitle={updateTaskTitle}
                            updateTodolist={updateTodolist}

                        />
                    )
                }
            )}
        </div>
    );
}

export default App;
