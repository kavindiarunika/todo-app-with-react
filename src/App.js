import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
    const [isCmpleteScreen, setisCmpleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setnewTitle] = useState("");
    const [newDescription, setnewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        if (newTitle && newDescription) { // Ensure title and description are not empty
            let newTodoItem = {
                title: newTitle,
                description: newDescription
            };
            let updatedTodoArr = [...allTodos, newTodoItem];
            setTodos(updatedTodoArr);
            localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

            // Reset title and description fields
            setnewTitle("");
            setnewDescription("");
        } else {
            alert("Please enter both title and description.");
        }
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);
        setTodos(reducedTodo);
        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    };

    const handleCompleted = (index) => {
        const now = new Date();
        const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        // Get the completed task and add completion time
        const completedTask = { ...allTodos[index], completedOn };

        // Update the completedTodos list
        const updatedCompletedTodos = [...completedTodos, completedTask];
        setCompletedTodos(updatedCompletedTodos);

        // Remove the task from allTodos and update localStorage
        const updatedAllTodos = allTodos.filter((_, i) => i !== index);
        setTodos(updatedAllTodos);

        localStorage.setItem('todolist', JSON.stringify(updatedAllTodos));
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todolist'));
        const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
        if (savedTodos) setTodos(savedTodos);
        if (savedCompletedTodos) setCompletedTodos(savedCompletedTodos);
    }, []);

    return (
        <div className='App'>
            <h1>My Todos</h1>
            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder='What’s the task title?' />
                    </div>
                    <div className='todo-input-item'>
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder='What’s the task description?' />
                    </div>
                    <div className='todo-input-item'>
                        <button type="button" onClick={handleAddTodo} className='primarybtn'>Add</button>
                    </div>
                </div>
                <div className='btn-area'>
                    <button
                        className={`todo-button ${isCmpleteScreen === false && 'active'}`}
                        onClick={() => setisCmpleteScreen(false)}>
                        Todo
                    </button>
                    <button
                        className={`completed-button ${isCmpleteScreen === true && 'active'}`}
                        onClick={() => setisCmpleteScreen(true)}>
                        Completed
                    </button>
                </div>
                <div className='todo-list'>
                    {isCmpleteScreen === false && allTodos.map((item, index) => (
                        <div className='todo-list-item' key={index}>
                            <div className='content'>
                                <h3>{item.title || `Task ${index + 1}`}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className='icons'>
                                <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                                <BsCheckLg className='check-icon' onClick={() => handleCompleted(index)} />
                            </div>
                        </div>
                    ))}
                    {isCmpleteScreen === true && completedTodos.map((item, index) => (
                        <div className='todo-list-item' key={index}>
                            <div className='content'>
                                <h3>{item.title || `Completed Task ${index + 1}`}</h3> {/* Display the completed task title */}
                                <p>{item.description}</p>
                                <p><small>Completed On: {item.completedOn}</small></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
