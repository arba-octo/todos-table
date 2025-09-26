import React, {useCallback, useState} from "react";
import TodoEditTitle from "./todoEditTitle";
import TodoEdit from "./todoEdit";
import ActionsNewTodo from "./actionsNewTodo";

export const NewTodo = React.memo(
    function NewTodo ({ saveNewTodo, deleteNewTodo }) {
        const initialState = {
            title: "",
            completed: false,
            priority: "",
            dueDate: new Date().toISOString()
        };

        const [draft, setDraft] = useState(initialState);

        // Сбрасываем значение полей при клике на Удалить
        const removeNewTodo = useCallback(() => {
            setDraft({title: "", completed: false, priority: "", dueDate: new Date().toISOString()});
            deleteNewTodo()
        }, [deleteNewTodo]);

        return (
            <tr>
                <TodoEditTitle cell={draft.title} onChange={(val) => setDraft(prev => ({ ...prev, title: val }))} />
                <TodoEdit cell={draft.completed} name="completed" onChange={(val) => setDraft(prev => ({ ...prev, completed: val }))} />
                <TodoEdit cell={draft.priority} name="priority" onChange={(val) => setDraft(prev => ({ ...prev, priority: val }))} />
                <TodoEdit cell={draft.dueDate} name="dueDate" onChange={(val) => setDraft(prev => ({ ...prev, dueDate: val }))} />
                <ActionsNewTodo
                    saveNewTodo={() => {
                        saveNewTodo(draft);
                        setDraft(initialState);
                    }}
                    onChancel={removeNewTodo}
                />
            </tr>
        )
    })