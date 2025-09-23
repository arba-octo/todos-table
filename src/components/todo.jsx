import React from "react";

// Мемонизииируем компонент, тчобы он не перерисовывался каждый раз при изменении состояния родителя (editId)
const Todo = React.memo(
    function Todo ({ cell }) {
        return (
            <td>
                {cell}
            </td>
        )
    }
)

export default Todo;