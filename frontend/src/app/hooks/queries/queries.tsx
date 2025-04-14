import { gql } from '@apollo/client';

const FETCH_PROJECTS = gql`
  query Projects {
    projects {
        id
        name
    }
}
`;

const FETCH_TASKS = gql`
query Projects ($projectId: String!){
    tasks(projectId: $projectId) {
        id
        status
        description
        title
        timestamp
    }
}
`;


export {
    FETCH_PROJECTS,
    FETCH_TASKS
}