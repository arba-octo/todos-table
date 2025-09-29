import {useEffect, useState, useCallback, useMemo} from "react";

const LocSt_KEY = "todos";

export function useTodos (initialTodos) {


    // ------------------------------ Все состояния ------------------------------------
    // В data хранятся все актуальные дела!
    const [data, setData] = useState(() => {
        const todos = localStorage.getItem(LocSt_KEY);
        return todos ? JSON.parse(todos) : initialTodos;
    });
    const [editId, setEditId] = useState(null); // id редактируемого todo
    const [drafts, setDrafts] = useState([]); // все черновики
    const [viewAddTodo, setViewAddTodo] = useState(false); // Отображение поля для добавления нового todo
    // Активация фильтров
    const [filters, setFilters] = useState({
        priority: "",
        completed: null
    });


    // ---------------- Побочные эффекты (синхронизация с localSt) ----------------------
    useEffect(() => {
        localStorage.setItem(LocSt_KEY, JSON.stringify(data))
    }, [data]);


    // ---------------------- Все действия с состояниями (actions) ----------------------------

    // Выносим колбэки для их стабилизации
    const doEdit = useCallback((id) => {
        setEditId(id);
        setDrafts(prev => {
            if (prev.some(item => item.id === id)) return prev; // Если в черновиках редактируемая строка уже есть, то новую не создаем
            const newDraft = data.find(t => t.id === id); // создаем новый черновик по id
            return newDraft ? [...prev, { ...newDraft }] : prev;
        })
    }, []);

    const saveEdit = useCallback((id) => {
        setDrafts(prev => {
            const draft = prev.find((draft) => draft.id === id);
            if (!draft) return prev;
            setData(prev => prev.map(item => item.id === id ? ({...item, ...draft, id: item.id}) : item));
            setEditId(null);
            return prev.filter((item) => item.id !== id)
        })
    }, []);

    const saveNewTodo = useCallback((draft) => {
        setData(prev => {
            const newTodo = { ...draft, id: crypto.randomUUID() }; return [ ...prev, newTodo ];
        });
        setViewAddTodo(false);
    }, [])

    const removeTodo = useCallback(id => setData(prev => prev.filter((todo) => todo.id !== id) ), []);

    const addTodo = useCallback(() => setViewAddTodo(!viewAddTodo), []);

    const deleteNewTodo = useCallback(() => setViewAddTodo(false), []);

    const changeDraft = useCallback((id, field, value) => {
        setDrafts(prev => prev.map(draft => draft.id === id ? ({ ...draft, [field]: value }) : draft));
    }, []) ;

    const toChooseFilterValue = useCallback((f, v) => {
        setFilters(prev => ({ ...prev, [f]: v }));
    }) ;


    // ------------------------- Производное: отфильтровываем строки -------------------------------
    const filteredData = useMemo(() => {
        return data.filter((todo) => {
            // Если фильтр priority задан и его значение не равно значению в todo - данный todo не попадает в результат
            if (filters.priority && todo.priority !== filters.priority) return false;
            if (filters.completed !== null) {
                const bool = typeof filters.completed === "string" // если значение comleted строка
                    ? filters.completed === "true" // то переводим ее зачение в булевое
                    : filters.completed; // иначе оставляем как есть
                if (todo.completed !== bool) return false
            }
            return true;
        })
    }, [data, filters]);


    // ----------------------- Возвращаем сгруппировано (чтобы референсы были стабильными) ----------
    return {
        state: {data, filteredData, editId, drafts, viewAddTodo, filters},
        actions: {doEdit, saveEdit, saveNewTodo, removeTodo, addTodo, deleteNewTodo, changeDraft, toChooseFilterValue}
    }
}