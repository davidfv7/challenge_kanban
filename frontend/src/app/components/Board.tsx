'use client'
import React, {useState, useEffect} from 'react';
import {DndContext, closestCorners, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';

import { useFetchTasks} from '../hooks/useQueries'
import { useUpdateTask, useCreateTask, useDeleteTask, useUpdateStatusTask } from '../hooks/useMutations'
import {Columns} from '../Columns'
import Task from './Task';
import TaskModal from './TaskModal';
import { useParams } from 'next/navigation'

enum Statuses {
    Backlog = "Backlog",
    To_Do = "To Do",
    In_Progress = "In Progress",
    Testing = "Testing",
    Done = "Done"
}

export function Board() {
    const params = useParams<{ id: string; }>()
    const [tasks, fetchTasks, updateTasks] = useFetchTasks(params.id);
    const [updateStatusTask, error, reset] =  useUpdateStatusTask();
    const [updateTask, dataUpdate, errorUpdate] =  useUpdateTask();
    const [createTask, data, loading] =  useCreateTask();
    const [deleteTask, deleteData] =  useDeleteTask();
    const [modalTask, setModalTask] = useState({});
    const [createModalTask, setCreateModalTask] = useState({
        title: "",
        description: "",
        projectId: params.id
        });
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          distance: 20,
        },
    });

    const sensors = useSensors(
        mouseSensor
    );

    function deleteTaskHandler(variables: object) {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask({variables})
        } 
    }

    function openModal(task:any, isEditModal:any) {
        setIsActiveModal(true)
        setModalTask(task)
        setIsEdit(isEditModal)
    }

    function closeModal(task:any) {
        setIsActiveModal(false)
        setModalTask({})
    }
    function createTaskHandler(variables: object) {
        createTask({variables})
    }
    function updateTaskHandler(variables: object) {
        updateTask({variables})
    }
    useEffect(() => {
        fetchTasks()
    }, [])

    useEffect(() => {
        if(error) {
            reset()
            fetchTasks()
        }
    }, [error])

    useEffect(() => {
        if(data || deleteData || dataUpdate) {
            fetchTasks()
        }
    }, [data, deleteData, dataUpdate])

    const draggableTasks = tasks.map((task:any) => {
        return (
            <Task task={task} deleteHandler={deleteTaskHandler}  openModal={openModal} />
        )
    })
  return (
    <div>
        <div className='w-[90%] m-auto min-h-[70px]'>
            <button
             disabled={loading ? true : false}
             onClick={() => openModal(createModalTask, false)
                } 
                className='cursor-pointer float-right bg-[#BF5700] text-white p-[15px] rounded-md'>Create Task</button>
        </div>
    
        <div className='w-[90%] grid grid-cols-5 gap-10 m-auto mt-[10px]'>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
                <Columns columns = {Statuses}>
                    {draggableTasks}
                </Columns>
            </DndContext>
        </div>
        {isActiveModal ? (<TaskModal task={modalTask} createTaskHandler={createTaskHandler} updateTaskHandler={updateTaskHandler} setModalTask={setModalTask} closeModal={closeModal} isEdit={isEdit} />) : '' }
    </div>
  );
  
  function handleDragEnd(event:any) {
    updateTasks(
        tasks.map((task:any) => (task.id === event.active.id) ? { ...task, status: event.over.id} : task)
    )
    updateStatusTask({
        variables: {
          id: event.active.id,
          status: event.over.id
        },
      })
  }
}
