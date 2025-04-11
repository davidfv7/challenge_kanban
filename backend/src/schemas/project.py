from graphene import ObjectType, String, List, Mutation, Field
from db import ddb
from repositories import ProjectRepository


class ProjectType(ObjectType):
    id = String()
    name = String()


class ProjectQuery(ObjectType):
    projects = List(ProjectType)
    project = Field(ProjectType, project_id=String())

    def resolve_projects(root, info):
        repo = ProjectRepository(ddb)
        return repo.list()

    def resolve_project(root, info, project_id):
        repo = ProjectRepository(ddb)
        return repo.get_by_id(project_id)


class CreateProject(Mutation):
    class Arguments:
        name = String()

    id = String()
    name = String()

    def mutate(root, info, name):
        repo = ProjectRepository(ddb)
        project = repo.create(name)
        return CreateProject(**project.model_dump())


class ProjectMutations(ObjectType):
    create_project = CreateProject.Field()