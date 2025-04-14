import { gql } from '@apollo/client';

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: String!, $status: String!) {
    updateTaskStatus(
        id: $id
        status: $status
    ) {
        id
        status
        description
        title
        timestamp
    }
}
`;

const CREATE_TASK = gql`
mutation CreateTask($description: String!, $projectId: String!, $title: String!) {
    createTask(description: $description, projectId: $projectId, title: $title) {
        id
        status
        description
        title
        timestamp
    }
}
`;

const DELETE_TASK = gql`
mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
        id
    }
}

`;

const UPDATE_TASK = gql`
mutation UpdateTask($description: String!, $id: String!, $status: String!, $title: String!) {
    updateTask(description: $description, id: $id, status: $status, title: $title) {
        id
        status
        description
        title
    }
}
`;


const CREATE_PROJECT = gql`
mutation CreateProject($name: String!) {
    createProject(name: $name) {
        id
        name
    }
}
`;

export {
    UPDATE_TASK_STATUS,
    CREATE_TASK,
    DELETE_TASK,
    CREATE_PROJECT,
    UPDATE_TASK
}