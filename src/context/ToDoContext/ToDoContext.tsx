import { createContext, FC, PropsWithChildren, ReactNode, useState } from "react";
import { getLocalStorage } from "../../utils";



export type ToDoStateType = 'to-do' | 'in-progress' | 'done';

export interface IToDoItem {
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

export interface IToDoContextValues {
    toDoItems: IToDoItem[];
    addToDoItem: AddToDoItemType;
    updateToDoItem: UpdateToDoItemType;
    getById: GetByIdType;
    getByState: GetByStateType;
    removeFromToDoList: RemoveFromToDoListType;
}

export const ToDoContext = createContext<IToDoContextValues | undefined>(undefined);

interface IToDoContextProvider {
    children: (args: IToDoContextValues) => ReactNode;
    initialToDoItems: IToDoItem[];
}

export const ToDoContextProvider: FC<IToDoContextProvider> = ({children, initialToDoItems}) => {
    const [toDoItems, setToDoItems] = useState<IToDoItem[]>(initialToDoItems);
    
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
            return item.state === state;
        })
    }

    const removeFromToDoList: RemoveFromToDoListType = (id) => {
        setToDoItems((prev) => {
            return prev.filter(item => item.id !== id);
        });
    }

    const contextValues = {
        toDoItems,
        addToDoItem,
        updateToDoItem,
        getById,
        getByState,
        removeFromToDoList,
    }

    return (
        <ToDoContext.Provider value={contextValues}>
            {children(contextValues)}
        </ToDoContext.Provider>
    )
}