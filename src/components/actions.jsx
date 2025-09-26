import React, {useCallback, useState} from "react";

const Actions = React.memo(
    function Actions({ isEditing, id, doEdit, saveEdit, deleteTodo }) {

        // Кнопка удаления todo:
        const handleClickDelete = useCallback( () => {
            deleteTodo(id);
        }, [id, deleteTodo]);

        const handleClickDoEdit = useCallback(() => { doEdit(id) }, [doEdit, id]);
        const handleClickSave = useCallback(() => {saveEdit(id) }, [saveEdit, id]);

        return (
            <td className="actions">
                <button onClick={handleClickDelete}>Х</button>
                {isEditing
                    ? <button onClick={handleClickSave} className="button-wrapper"><img src="/images/save.png" alt="Сохранить" className="action__img"/></button>
                    : <button onClick={handleClickDoEdit} className="button-wrapper"><img src="/images/edit.png" alt="Редактировать" className="action__img"/></button>
                }
            </td>
        )
    }
)

export default Actions;