'use client'
import React from 'react';

import {Droppable} from './Droppable';

export function Columns(props:any) {
  return Object.entries(props.columns).map(([key, value]) => {
    const tasks = props.children.filter((item:any) => item.props.task.status == key)
    return (<Droppable key={key} title={value} status={key} items={tasks}></Droppable>)
  })

  
}
