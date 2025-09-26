import React, { useCallback } from "react";

const ActionsNewTodo = React.memo(
    function ActionsNewTodo({ saveNewTodo, onChancel }) {

        // Кнопка удаления todo:
        const handleClickDelete = useCallback( () => {
            onChancel();
        }, [onChancel]);

        return (
            <td className="actions">
                <button onClick={handleClickDelete}>Х</button>
                <button onClick={saveNewTodo} className="button-wrapper"><img src="/images/save.png" alt="Сохранить" className="action__img"/></button>
            </td>
        )
    }
)

export default ActionsNewTodo;