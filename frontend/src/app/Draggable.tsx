import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props:any) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: props.id,
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
  
    
    return (
        <div className='w-[100%] cursor-move' style={style} {...listeners} {...attributes}>
            <div className='w-[100%]' ref={setNodeRef} >
                {props.children}

            </div>
        </div>
    );
  }