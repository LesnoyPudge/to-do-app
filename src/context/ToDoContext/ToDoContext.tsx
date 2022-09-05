import { createContext, FC, PropsWithChildren, useState } from "react";
import { getLocalStorage } from "../../utils";



type ToDoStateType = 'to-do' | 'in-progress' | 'done';

interface IToDoItem {
    id: string;
    state: ToDoStateType;
    title: string;
    description: string;
}

type AddToDoItemType = (toDoItem: IToDoItem) => void;
type UpdateToDoItemType = (toDoItem: {id: string} & Partial<IToDoItem>) => void;
type GetByIdType = (id: string) => IToDoItem | undefined;
type GetByStateType = (state: ToDoStateType) => IToDoItem[];
type RemoveFromToDoListType = (id: string) => void;

interface IToDoContextValues {
    toDoItems: IToDoItem[];
    addToDoItem: AddToDoItemType;
    updateToDoItem: UpdateToDoItemType;
    getById: GetByIdType;
    getByState: GetByStateType;
    removeFromToDoList: RemoveFromToDoListType;
}

const ToDoContext = createContext<IToDoContextValues | undefined>(undefined);

export const ToDoContextProvider: FC<PropsWithChildren> = ({children}) => {
    const {values} = getLocalStorage();
    const [toDoItems, setToDoItems] = useState<IToDoItem[]>(values.toDoItems || []);
    
    const addToDoItem: AddToDoItemType = (toDoItem) => {
        setToDoItems(prev => [...prev, toDoItem])
    }

    const updateToDoItem: UpdateToDoItemType = (toDoItem) => {
        setToDoItems((prev) => {
            const updatedValues = prev.map((item) => {
                if (item.id !== toDoItem.id) return item;

                return Object.assign(item, toDoItem) as IToDoItem;
            })
            return updatedValues
        })
    }

    const getById: GetByIdType = (id) => {
        return toDoItems.find((item) => {
            item.id === id;
        })
    }

    const getByState: GetByStateType = (state) => {
        return toDoItems.filter((item) => {
            item.state === state;
        })
    }

    const removeFromToDoList: RemoveFromToDoListType = (id) => {
        setToDoItems((prev) => {
            return prev.filter(item => item.id !== id);
        });
    }

    return (
        <ToDoContext.Provider value={{
            toDoItems,
            addToDoItem,
            updateToDoItem,
            getById,
            getByState,
            removeFromToDoList,
        }}>
            {children}
        </ToDoContext.Provider>
    )
}