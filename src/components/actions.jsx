import React, {useCallback, useState} from "react";

const Actions = React.memo(
    function Actions({ isEditing, id, doEdit, saveEdit, deleteTodo }) {

        // Кнопка удаления todo:
        const [active, setActive] = useState(true);
        const handleClickDelete = useCallback( () => {
            setActive(false);
            deleteTodo(id);
        }, [id, deleteTodo]);

        const handleClickEdit = useCallback(() => { doEdit(id) }, [doEdit, id])

        return (
            <td className="actions">
                <button onClick={handleClickDelete}>Х</button>
                {isEditing
                    ? <button onClick={saveEdit} className="button-wrapper"><img src="/images/save.png" alt="Сохранить" className="action__img"/></button>
                    : <button onClick={handleClickEdit} className="button-wrapper"><img src="/images/edit.png" alt="Редактировать" className="action__img"/></button>
                }
            </td>
        )
    }
)

export default Actions;