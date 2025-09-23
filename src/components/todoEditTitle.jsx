import {useEffect, useState} from "react";

function TodoEditTitle ({ cell, onChange }) {
    const [valTitle, setValTitle] = useState(cell); // При первом рендере в valTitle попали данные из props
    useEffect(() => {setValTitle(cell)}, [cell]); // Обновит val при изменении cell из props

    return (
        <td>
            <input
                type="text"
                value={valTitle ? valTitle : ""}
                placeholder={cell}
                onFocus={ () => {if (valTitle === cell) setValTitle("")} } // При первом фокусе (когда значение в input = cell) очистили input
                onChange={ (e) => {
                    const v = e.target.value;
                    setValTitle(v);
                    onChange(v);
                } }
            />
        </td>
    )
}

export default TodoEditTitle;