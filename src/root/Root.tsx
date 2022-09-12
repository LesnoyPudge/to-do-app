import { FC, useContext } from "react";
import { IToDoContextValues, IToDoItem, ToDoContext, ToDoContextProvider, ToDoStateType } from "../context";
import { getLocalStorage } from "../utils";
import './style.scss';



const initialToDoItems = [
    {
        id: '1',
        title: 'first',
        state: 'to-do',
        description: 'amazing'
    }
] as IToDoItem[];

export const Root: FC = () => {
    // const {values} = getLocalStorage();

    return (
        <ToDoContextProvider initialToDoItems={initialToDoItems}>
            {({toDoItems}) => (
                <div className="flex h-screen w-screen">
                    <div className="m-auto bg-sky-700 p-7 rounded-2xl">
                        <div className="flex gap-5">
                            <ToDoCollumn state="to-do"/>  

                            <ToDoCollumn state="in-progress"/>

                            <ToDoCollumn state="done"/>
                        </div>

                        <div className="">
                            some
                        </div>
                    </div>
                </div>
            )}
        </ToDoContextProvider>
    )
}

const ToDoCollumn: FC<{state: ToDoStateType}> = ({state}) => {
    const {updateToDoItem, getByState, removeFromToDoList} = useContext(ToDoContext) as IToDoContextValues;
    const filtredToDoItems = getByState(state);
    console.log(filtredToDoItems);
    
    return (
        <div className="flex flex-col w-[200px] shrink-0">
            {
                filtredToDoItems.map((toDoItem) => {
                    const changeState = (state: ToDoStateType) => {
                        if (toDoItem.state === state) return;
                        updateToDoItem({id: toDoItem.id, state});
                    }

                    return (
                        <div
                            className='flex flex-col gap-4 items-start backdrop:blur-sm' 
                            key={toDoItem.id}
                        >
                            <div className="font-bold">title: {toDoItem.title}</div>

                            <div>state: {toDoItem.state}</div>

                            <div>description: {toDoItem.description}</div>

                            <button onClick={() => changeState('to-do')}>
                                move to to-do
                            </button>

                            <button onClick={() => changeState('in-progress')}>
                                move to in progress
                            </button>

                            <button onClick={() => changeState('done')}>
                                mark as finished
                            </button>

                            <button onClick={() => removeFromToDoList(toDoItem.id)}>
                                delete
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}