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

    // helper: привести любую опцию к {value,label}
    const toNorm = (opt) =>
        typeof opt === "object" && opt !== null
        ? { value: opt.value, label: opt.label ?? String(opt.value) }
        : { value: opt, label: String(opt) }

    const normOpt = optionsArr.map((item) => toNorm(item));
    // Для отображения выбранной опции фильтра в заголовке:
    const [filterHeader, setFilterHeader] = useState("");

    // После выбора пункта из выпадашки сама выпадашка закрывается
    const choose = (v, l) => {
        onChange(v);
        setOpenFilter(false);
        setFilterHeader(l)
    };

    return (
        <div className="filter-column" ref={ref}>
            <div className="filter-column__header">
                <span>{name}</span>
                <button className="button-wrapper" onClick={toOpenFilter}>
                    <img src={imgSrc} alt={imgAlt}/>
                </button>
            </div>
            {filterHeader && <div className="filter-column__value">{filterHeader}</div>}
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
                    { normOpt.map(optObj =>
                        <li
                            role="option"
                            key={optObj.value}
                            tabIndex={0}
                            aria-selected={value === optObj.value}
                            onClick={() => choose(optObj.value, optObj.label)}
                            onKeyDown={(e) =>
                                (e.key === "Enter" || e.key === " ") && choose(optObj.value, optObj.label)
                            }
                        >{optObj.label}</li>
                    )}
                </ul>
            }
        </div>
    )
};
export default FilterColumn;