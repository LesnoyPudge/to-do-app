import { FC } from "react";
import { ToDoContextProvider } from "../context";



export const Root: FC = () => {
    return (
        <ToDoContextProvider>
            <div>
                to do
            </div>
        </ToDoContextProvider>
    )
}