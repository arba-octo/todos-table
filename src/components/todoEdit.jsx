import {completedValues} from "../libs/const";

function TodoEdit ({ cell, name, onChange }) {
    let result = null;
    switch (name) {
        case "completed":
                result = <select
                    value={String(cell)}
                    onChange={(e) => onChange(e.target.value === "true")} // Сравнение необходимо для того, чтобы в localSt уходило булевое знаечние true / false, а не тсрока "true" / "false"
                >
                    <option value="false">в работе</option>
                    <option value="true">завершен</option>
                </select>;
                break;
        case "priority":
                    result = <select
                        value={cell}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>;
                    break;
        case "dueDate":
                        result = <input
                            type="date"
                            value={cell}
                            onChange={(e) => onChange(e.target.value)}
                            required
                        />;
                        break;
        default: result = null;
    }

    return (
        <td>
            {result}
        </td>
    )
}

export default TodoEdit;