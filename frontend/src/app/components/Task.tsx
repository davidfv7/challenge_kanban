import { Draggable } from "../Draggable"
import { EditButton } from "./EditButton"
import { DeleteButton } from "./DeleteButton"

export default function Task(props:any) {
    return (
        <Draggable id={props.task.id} status={props.task.status}>
            <div  className='bg-white w-[100%] min-h-[150px] rounded-md mt-[5px] relative p-[7px]'>
                <h2 className='text-xl text-black'>
                    {props.task.title}
                </h2>
                <DeleteButton deleteHandler={props.deleteHandler} id={props.task.id} />
                <EditButton openModal={props.openModal} task={props.task}/>
            </div>
        </Draggable>
    )

}