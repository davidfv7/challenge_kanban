import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {Draggable} from './Draggable';

export function Droppable(props:any) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.status,
    });
    const tasks = props?.items.map((item:any) => {
        return (
            <Draggable key={item + 'key'} id={item}>
                <div  className='bg-white w-[100%] min-h-[150px] rounded-md mt-[5px]'>
                    <h2 className='text-xl text-black'>
                    {item}
                    </h2>
                </div>
            </Draggable>
        )
})

    return (
      <div ref={setNodeRef} className='bg-[#BF5700] w-[100%] !p-[20px] rounded-md' >
        <h1 className='text-3xl font-bold'>
            {props?.title}
        </h1>
        {props.items}
        
      </div>
    );
  }