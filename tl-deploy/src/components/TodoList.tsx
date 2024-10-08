import { useCallback, useReducer, useState } from "react"
import { reducerFunction,ListState} from "@/reducer/FunctionReducer";
import { v4 as uuidv4 } from "uuid";

    //custom Hook
const useItemCount = (items: ListState[]) => {
    return items.length > 1? ` ${items.length} tarefas` :`${items.length} tarefa`
};
    //type do Input
type InputState = React.ChangeEvent<HTMLInputElement>

const TodoList = () => {
        //States
    const [state,dispatch] = useReducer(reducerFunction,[]);
    const [task, setTask] = useState("");
    const itemCount = useItemCount(state);
        
        //Mudança de stado
    const inputState = useCallback((text:InputState) => setTask(text.target.value),[])

        //Eventos
    const handleAddItem = useCallback(() => {
        if (task.trim() !== "") {
            dispatch({
                type: "Add",
                id: uuidv4(),
                nameTask: task,
                checkbox: false
            });
            setTask(""); // Limpa o input
        }
    },[task])
    
    const handleRemoveItem = (id: string) => {
        dispatch({ type: "Remove", id });
    };

    const handleToggleCheckbox = (id: string) => {
        dispatch({ type: "Toggle", id});
    };
        //jsx
    return(
        <div className="flex flex-col justify-start items-center">
            <div className="flex flex-col gap-3 mt-2 absolute">
                <h1 className="ps-14 text-xl font-semibold">Todo-List</h1>
                <div className="flex gap-4">
                    <input 
                        className="text-center rounded-md text-black"
                        type="text" 
                        placeholder="Adicionar item"
                        value={task}
                        onChange={(text) => inputState(text)}
                        />
                    <button
                        onClick={handleAddItem}
                        className="bg-blue-500 text-white rounded-md p-2 mt-2"
                    >Adicionar</button>
                </div>
                <div className=" mt-4 relative">
                    {state.length > 0 ? itemCount : "Não tem nenhuma tarefa"}
                </div>
            <div className=" mt-4 relative ">
                {state.length > 0 && (
                    <ul className="">
                        {state.map((item: ListState) => (
                            <li key={item.id} className="flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={item.checkbox}
                                        onChange={() => handleToggleCheckbox(item.id)}
                                    />
                                    <span>{item.nameTask}</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:underline"
                                > Deletar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            </div>

        </div>
    )
}
/** 
 *  
 *  
 */


export {TodoList}