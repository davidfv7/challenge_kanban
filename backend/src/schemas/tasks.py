from graphene import ObjectType, String, Mutation, List, BigInt
from db import ddb
from repositories import TaskRepository
from models import (
    CreateTask,
    UpdateTaskStatus,
    TaskStatus,
    UpdateTask,
    DeleteTask,
)


class TaskType(ObjectType):
    id = String()
    status = String()
    description = String()
    title = String()
    timestamp = BigInt()


class TaskQuery(ObjectType):
    tasks = List(TaskType, project_id=String())

    def resolve_tasks(root, info, project_id):
        repo = TaskRepository(ddb)
        return repo.list_by_project_id(project_id)


class CreateTaskAction(Mutation):
    class Arguments:
        description = String()
        title = String()
        project_id = String()

    id = String()
    status = String()
    description = String()
    title = String()
    timestamp = BigInt()

    def mutate(root, info, description: str, title: str, project_id: str):
        repo = TaskRepository(ddb)
        task = repo.create(
            CreateTask(description=description, title=title, project_id=project_id)
        )
        return CreateTaskAction(**task.model_dump(exclude={"project_id"}))


class UpdateTaskStatusAction(Mutation):
    class Arguments:
        status = String()
        id = String()

    id = String()
    status = String()
    description = String()
    title = String()
    timestamp = BigInt()

    def mutate(root, info, status: str, id: str):
        repo = TaskRepository(ddb)
        task = repo.update_task_status(
            UpdateTaskStatus(id=id, status=TaskStatus[status])
        )
        return UpdateTaskStatusAction(**task.model_dump(exclude={"project_id"}))


class DeleteTaskAction(Mutation):
    class Arguments:
        id = String()

    id = String()

    def mutate(root, info, id: str):
        repo = TaskRepository(ddb)
        repo.delete_task(id)
        return DeleteTask(id=id)


class UpdateTaskAction(Mutation):
    class Arguments:
        status = String()
        id = String()
        description = String()
        title = String()

    id = String()
    status = String()
    description = String()
    title = String()

    def mutate(root, info, status: str, id: str, description: str, title: str):
        repo = TaskRepository(ddb)
        task = repo.update_task(
            UpdateTask(
                id=id, status=TaskStatus[status], title=title, description=description
            )
        )
        return UpdateTaskStatusAction(**task.model_dump(exclude={"project_id"}))


class TaskMutations(ObjectType):
    create_task = CreateTaskAction.Field()
    update_task_status = UpdateTaskStatusAction.Field()
    update_task = UpdateTaskAction.Field()
    delete_task = DeleteTaskAction.Field()