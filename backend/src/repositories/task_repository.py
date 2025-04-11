from typing import List
from models import TaskStatus, Task, CreateTask, UpdateTaskStatus, UpdateTask
from boto3.dynamodb.conditions import Key
from uuid import uuid4
from datetime import datetime
from boto3.resources.base import ServiceResource


class TaskRepository:

    def __init__(self, db: ServiceResource):
        self.db_client = db.Table("Tasks")
            
    def create(self, createTask: CreateTask) -> Task:
        uuid = str(uuid4())
        timestamp = int(datetime.now().timestamp() * 1000)
        item = {
            "id": uuid,
            "title": createTask.title,
            "description": createTask.description,
            "project_id": createTask.project_id,
            "status": TaskStatus.Backlog,
            "timestamp": timestamp,
        }
        self.db_client.put_item(Item=item)
        return Task.model_validate(item)

    def list_by_project_id(self, project_id: str) -> List[Task]:
        page = self.db_client.query(
            IndexName="project_id_index",
            KeyConditionExpression=Key("project_id").eq(project_id),
        )
        return [Task.model_validate(item) for item in page["Items"]]

    def update_task_status(self, updateTaskStatus: UpdateTaskStatus) -> Task:
        page = self.db_client.update_item(
            Key={"id": updateTaskStatus.id},
            UpdateExpression="SET #st = :status_value",
            ExpressionAttributeValues={
                ":status_value": updateTaskStatus.status,
            },
            ExpressionAttributeNames={"#st": "status"},
            ReturnValues="ALL_NEW",
        )
        return Task.model_validate(page["Attributes"])

    def update_task(self, update_task: UpdateTask) -> List[Task]:
        page = self.db_client.update_item(
            Key={"id": update_task.id},
            UpdateExpression="SET #st = :status_value, title=:title_value, description=:description_value",
            ExpressionAttributeValues={
                ":status_value": update_task.status,
                ":title_value": update_task.title,
                ":description_value": update_task.description,
            },
            ExpressionAttributeNames={"#st": "status"},
            ReturnValues="ALL_NEW",
        )
        return Task.model_validate(page["Attributes"])

    def delete_task(self, id: str) -> None:
        self.db_client.delete_item(Key={"id": id})