import './App.css';
import {completedValues, initialTodos, priorityValues} from "./libs/const";
import {NewTodo} from "./components/newTodo";
import FilterColumn from "./components/filterColumn";
import { useTodos } from "./libs/useTodos";
import {TableBody} from "./components/tableBody";

function App() {
    const {
        state: {filteredData, editId, drafts, viewAddTodo, filters},
        actions: {doEdit, saveEdit, saveNewTodo, removeTodo, addTodo, deleteNewTodo, changeDraft, toChooseFilterValue}
    } = useTodos(initialTodos);

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
                    <th>
                        <FilterColumn
                            name="Статус"
                            imgSrc="/images/arr-down.svg"
                            imgAlt="Выбор фильтра-статуса"
                            optionsArr={completedValues}
                            value={filters.completed}
                            onChange={(v) => toChooseFilterValue("completed", v)}
                        />
                    </th>
                    <th>
                        <FilterColumn
                            name="Приоритет"
                            imgSrc="/images/arr-down.svg"
                            imgAlt="Выбор фильтра-приоритета"
                            optionsArr={priorityValues}
                            value={filters.priority}
                            onChange={(v) => toChooseFilterValue("priority", v)}
                        />
                    </th>
                    <th>Дедлайн</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <TableBody
                    filteredData={filteredData}
                    editId={editId}
                    drafts={drafts}
                    changeDraft={changeDraft}
                    doEdit={doEdit}
                    saveEdit={saveEdit}
                    removeTodo={removeTodo}
                />
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