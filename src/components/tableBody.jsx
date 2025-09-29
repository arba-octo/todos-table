// Данный компонент выделяется в отдельный, чтобы при активации фильтра не происходило перерисовки всей таблицы

import React from "react";
import TodoEditTitle from "./todoEditTitle";
import Todo from "./todo";
import TodoEdit from "./todoEdit";
import Actions from "./actions";

export const TableBody = React.memo(function TableBody(
    { filteredData, editId, drafts, changeDraft, doEdit, saveEdit, removeTodo }
) {
    return (
        <tbody>
        {filteredData.map((todo) => {
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
    )
})