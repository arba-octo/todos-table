import {useCallback, useEffect, useRef, useState} from "react";

function FilterColumn({ name, imgSrc, imgAlt, optionsArr, onChange, value }) {
    const [openFilter, setOpenFilter] = useState(false);
    const ref = useRef(null);

    const toOpenFilter = useCallback(() => {
        setOpenFilter(prev => !prev);
    }, [])

    // Закрываем по клику вне его выпадающий список
    useEffect(() => {
        const closeClickOut = (e) => {
            // Если ref загружен и он находится НЕ внутри объекта клика (e.target) - закрываем выпадашку
            if (ref.current && !ref.current.contains(e.target)) setOpenFilter(false);
        };
        document.addEventListener("pointerdown", closeClickOut);
        // при размонтировании -
        return () => document.removeEventListener("pointerdown", closeClickOut);
    }, []);

    // После выбора пункта из выпадашки сама выпадашка закрывается
    const choose = (v) => { onChange(v); setOpenFilter(false) };

    return (
        <div className="filter-column" ref={ref}>
            <div className="filter-column__header">
                <span>{name}</span>
                <button className="button-wrapper" onClick={toOpenFilter}>
                    <img src={imgSrc} alt={imgAlt}/>
                </button>
            </div>
            {value && <div className="filter-column__value">{value}</div>}
            {openFilter &&
                <ul
                    role="listbox"
                    className="filter-column__list"
                    onClick={(e) => e.stopPropagation(e)}
                >
                    <li
                        role="option"
                        className="filter-column__option"
                        tabIndex={0}
                        aria-selected={!value}
                        onClick={() => choose("")}
                        onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") && choose("")
                        }
                    >
                        Все
                    </li>
                    { optionsArr.map(opt =>
                        <li
                            role="option"
                            key={opt}
                            tabIndex={0}
                            aria-selected={value === opt}
                            onClick={() => choose(opt)}
                            onKeyDown={(e) =>
                                (e.key === "Enter" || e.key === " ") && choose(opt)
                            }
                        >{opt}</li>
                    )}
                </ul>
            }
        </div>
    )
};
export default FilterColumn;