import {useState, useCallback} from "react";
import './App.css';
import {initialTodos} from "./libs/const";
import Todo from "./components/todo";
import TodoEdit from "./components/todoEdit";
import TodoEditTitle from "./components/todoEditTitle";
import Actions from "./components/actions";

function App() {
    // В data хранятся все актуальные дела!
    const [data, setData] = useState(() => {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : initialTodos;
    });
    const toUpDateTodos = (id, field, newVal) => {
        setData(prev => {
            const updatedTodos = prev.map(todo => todo.id === id ? { ...todo, [field]: newVal } : todo);
            localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Обновили новый массив todos в localStorage
            return updatedTodos;
        });
    };

    const [editId, setEditId] = useState(null);

    // Выносим колбэки для их стабилизации
    const doEdit = useCallback((id) => { setEditId(id) }, []);
    const saveEdit = useCallback(() => { setEditId(null) }, []);

    const removeTodo = useCallback((id) => {
        setData(prev => {
            const updateData = prev.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(updateData));
            return updateData;
        })
    }, []);

    const addTodo = () => {
        return (
            <tr>
                <TodoEditTitle cell="" />
                <TodoEdit cell="" name="completed" />
                <TodoEdit cell="" name="priority" />
                <TodoEdit cell={new Date()} name="dueDate" />
            </tr>
        )
    };

    return (
        <div>
            <table>
                <caption>Todos Таблица</caption>
                <colgroup>
                    <col width="300px"/>
                    <col width="200px"/>
                    <col width="200px"/>
                    <col width="200px"/>
                    <col width="200px"/>
                </colgroup>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Приоритет</th>
                    <th>Дедлайн</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((todo) => {
                    const isEditing = editId === todo.id; //  Проверяем редактируется ли эта строка
                    return (
                        <tr key={todo.id}>
                            {isEditing
                                ? <TodoEditTitle cell={todo.title}
                                                 onChange={(newValue) => toUpDateTodos(todo.id, "title", newValue)}/>
                                : <Todo cell={todo.title}/>
                            }
                            {isEditing
                                ? <TodoEdit
                                    cell={todo.completed}
                                    name="completed"
                                    onChange={(newValue) => toUpDateTodos(todo.id, "completed", newValue)}
                                />
                                : <Todo cell={todo.completed ? "завершена" : "в работе"}/>
                            }
                            {isEditing
                                ? <TodoEdit
                                    cell={todo.priority}
                                    id={todo.id}
                                    name="priority"
                                    onChange={(newValue) => toUpDateTodos(todo.id, "priority", newValue)}
                                />
                                : <Todo cell={todo.priority}/>
                            }
                            {isEditing
                                ? <TodoEdit cell={todo.dueDate} name="dueDate"
                                            onChange={(newValue) => toUpDateTodos(todo.id, "dueDate", newValue)}/>
                                : <Todo cell={todo.dueDate}/>}
                            <Actions
                                isEditing={isEditing}
                                id={todo.id}
                                doEdit={doEdit}
                                saveEdit={saveEdit}
                                deleteTodo={removeTodo}
                            />
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <button
                className="add-new-todo"
                onClick={addTodo}
            >
                Добавить новое Todo в таблицу!
            </button>
        </div>

    );
}

export default App;