export default function TaskModal(props:any) {
    const { task, isEdit } = props
    const { title, description, timestamp } = props.task
    const date = new Date(timestamp)
    const created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    function updateTask() {
        props.updateTaskHandler(task)
        props.closeModal()
    }

    function createTask() {
        props.createTaskHandler(task)
        props.closeModal()
    }
    return (
        <div className="bg-black/75 z-999 w-[100%] fixed flex h-screen top-[0] min-h-[100vh]">
            
            <div className="m-auto text-black  bg-white w-[40%] min-h-[400px] relative p-[25px]">
                <button onClick={() => props.closeModal()} className="cursor-pointer absolute top-[10px] right-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
                <div className="relative w-full min-w-[200px] mt-[40px]">
                <textarea
                    value={title} onChange={e =>props.setModalTask({...task,title: e.target.value})}
                    className="peer h-full min-h-[40px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" ">
                    </textarea>
                    <label
                    className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Title
                    </label>
                </div>
                <div className="relative w-full min-w-[200px] mt-[10px]">
                    <textarea
                    value={description} onChange={e =>props.setModalTask({...task,description: e.target.value})}
                    className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" ">
                    </textarea>
                    <label
                    className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                    </label>
                </div>
                { isEdit ? (<p>Created at: {created_at}</p>): '' }
                { isEdit ? (<button
                onClick={() => updateTask()}
                className='absolute cursor-pointer bottom-[10px] bg-[#BF5700] text-white p-[15px] rounded-md right-[20px]'>Update Task</button>):
                (<button
                    onClick={() => createTask()}
                    className='absolute cursor-pointer bottom-[10px] bg-[#BF5700] text-white p-[15px] rounded-md right-[20px]'>Create Task</button>) }
                
            </div>
        </div>
    )

}