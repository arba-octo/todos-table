import {useState, useCallback, useEffect} from "react";
import './App.css';
import {initialTodos} from "./libs/const";
import Todo from "./components/todo";
import TodoEdit from "./components/todoEdit";
import TodoEditTitle from "./components/todoEditTitle";
import Actions from "./components/actions";
import {NewTodo} from "./components/newTodo";

function App() {
    // В data хранятся все актуальные дела!
    const [data, setData] = useState(() => {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : initialTodos;
    });
    const [editId, setEditId] = useState(null);
    const [drafts, setDrafts] = useState([]); // Все черновики

    // Выносим колбэки для их стабилизации
    const doEdit = useCallback((id) => {
        setEditId(id);
        setDrafts(prev => {
            if (prev.some(item => item.id === id)) return prev; // Если в черновиках редактируемая строка уже есть, то новую не создаем
            const newDraft = data.find(t => t.id === id); // создаем новый черновик по id
            return newDraft ? [...prev, { ...newDraft }] : prev;
        })
    }, []);

    const saveEdit = useCallback((id) => {
        setDrafts(prev => {
            const draft = prev.find((draft) => draft.id === id);
            if (!draft) return prev;
            setData(prev => prev.map(item => item.id === id ? ({...item, ...draft, id: item.id}) : item));
            setEditId(null);
            return prev.filter((item) => item.id !== id)
        })
    }, []);

    const saveNewTodo = useCallback((draft) => {
        setData(prev => {
            const newTodo = { ...draft, id: crypto.randomUUID() }; return [ ...prev, newTodo ];
        });
        setViewAddTodo(false);
    }, [])

    const removeTodo = useCallback(id => setData(prev => prev.filter((todo) => todo.id !== id) ), []);

    const [viewAddTodo, setViewAddTodo] = useState(false);
    const addTodo = () => { setViewAddTodo(!viewAddTodo) };
    const deleteNewTodo = () => { setViewAddTodo(false) }

    const changeDraft = (id, field, value) => {
        setDrafts(prev => prev.map(draft => draft.id === id ? ({ ...draft, [field]: value }) : draft));
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(data))
    }, [data]);

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
                   const draft = isEditing ? drafts?.find(d => d.id === todo.id) : undefined;
                   const v = draft ?? todo; // если есть dfart, то v = draft, а если нет, то v = todo

                    return (
                        <tr key={todo.id}>
                            {isEditing
                                ? <TodoEditTitle cell={v.title} onChange={(newValue) => changeDraft(v.id, "title", newValue)}/>
                                : <Todo cell={v.title}/>
                            }
                            {isEditing
                                ? <TodoEdit
                                    cell={v.completed}
                                    name="completed"
                                    onChange={(newValue) => changeDraft(v.id, "completed", newValue)}
                                />
                                : <Todo cell={v.completed ? "завершена" : "в работе"}/>
                            }
                            {isEditing
                                ? <TodoEdit
                                    cell={v.priority}
                                    id={v.id}
                                    name="priority"
                                    onChange={(newValue) => changeDraft(v.id, "priority", newValue)}
                                />
                                : <Todo cell={v.priority}/>
                            }
                            {isEditing
                                ? <TodoEdit cell={v.dueDate} name="dueDate"
                                            onChange={(newValue) => changeDraft(v.id, "dueDate", newValue)}/>
                                : <Todo cell={v.dueDate}/>}
                            <Actions
                                isEditing={isEditing}
                                id={v.id}
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
            {viewAddTodo &&
                <table>
                    <colgroup>
                        <col width="300px"/>
                        <col width="200px"/>
                        <col width="200px"/>
                        <col width="200px"/>
                        <col width="200px"/>
                    </colgroup>
                    <NewTodo saveNewTodo={saveNewTodo} deleteNewTodo={deleteNewTodo} />
                </table>
            }
        </div>

    );
}

export default App;