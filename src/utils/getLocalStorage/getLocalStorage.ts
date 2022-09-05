


interface ILocalStorageValues {
    toDoItems?: [],
}

type UpdatableKeysType = 'toDoItems';

const get = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) return undefined;
    return JSON.parse(value);
};

export const getLocalStorage = () => {
    const values: ILocalStorageValues = {
        toDoItems: get('toDoItems'),
    };

    const set = (key: UpdatableKeysType, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const clear = () => {
        localStorage.clear();
    };

    return {
        values,
        set,
        clear,
    };
};