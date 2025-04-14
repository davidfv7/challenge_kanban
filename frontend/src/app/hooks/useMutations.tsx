import React from 'react';
import { gql, useMutation } from '@apollo/client';
import createApolloClient from "../apollo_client";
import {UPDATE_TASK, UPDATE_TASK_STATUS, DELETE_TASK, CREATE_TASK, CREATE_PROJECT} from './mutations/mutations'
const client = createApolloClient();

function useUpdateStatusTask(): [Function, any, Function] {
    const [updateStatus, { error, reset }] = useMutation(UPDATE_TASK_STATUS, { client: client });
    return [updateStatus,  error, reset]
}

function useCreateTask(): [Function, any, any, any] {
    const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, { client: client });
    return [createTask,  data, loading, error]
}
function useUpdateTask(): [Function, any, any, any] {
    const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK, { client: client });
    return [updateTask, data, loading, error]
}

function useCreateProject(): [Function, any, any, any] {
    const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT, { client: client });
    return [createProject,  data, loading, error]
}
function useDeleteTask(): [Function, any, any] {
    const [deleteTask, { data, loading }] = useMutation(DELETE_TASK, { client: client });
    return [deleteTask,  data, loading]
}

export {
    useUpdateStatusTask,
    useCreateTask,
    useDeleteTask,
    useCreateProject,
    useUpdateTask
}