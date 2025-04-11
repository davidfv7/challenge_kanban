from enum import Enum
from pydantic import BaseModel


class TaskStatus(str, Enum):
    Backlog = "Backlog"
    To_Do = "To Do"
    In_Progress = "In Progress"
    Testing = "Testing"
    Done = "Done"


class Task(BaseModel):
    id: str
    status: TaskStatus = TaskStatus.Backlog
    description: str
    project_id: str
    timestamp: int
    title: str


class CreateTask(BaseModel):
    description: str
    project_id: str
    title: str


class UpdateTask(BaseModel):
    id: str
    description: str
    title: str
    status: TaskStatus = TaskStatus.Backlog


class UpdateTaskStatus(BaseModel):
    id: str
    status: TaskStatus = TaskStatus.Backlog


class DeleteTask(BaseModel):
    id: str