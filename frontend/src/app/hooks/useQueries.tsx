import React, {useEffect, useState} from 'react';

import { gql, useQuery } from "@apollo/client";
import createApolloClient from "../apollo_client";
import {FETCH_PROJECTS, FETCH_TASKS} from './queries/queries'
const client = createApolloClient();

function useFetchTasks(id:string): [any, any, any] {
  const {data, refetch} = useQuery(FETCH_TASKS, { variables: {
    projectId: id
  }, client: client });
  const [tasks, updateTasks] = useState([])
  useEffect(() => {
    if(data) {
      updateTasks(data.tasks)
    }
  }, [data])
  return [ tasks, refetch, updateTasks]
}

function useFetchProjects(): [any, any, any] {
  const {data, refetch} = useQuery(FETCH_PROJECTS, { client: client });
  const [projects, updateProjects] = useState([])
  useEffect(() => {
    if(data) {
      updateProjects(data.projects)
    }
  }, [data])
  return [ projects, refetch, updateProjects]
}

export { useFetchTasks, useFetchProjects }