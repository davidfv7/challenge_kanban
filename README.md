# challenge_kanban

```bash
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
```

Create a new project to start creating tasks
```bash
mutation CreateProject {
    createProject(name: "Test project") {
        id
        name
    }
}
```
