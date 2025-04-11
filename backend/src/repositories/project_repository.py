from typing import List
from models import Project, Page, default_page
from uuid import uuid4
from boto3.resources.base import ServiceResource


class ProjectRepository:
    def __init__(self, db: ServiceResource):
        self.db_client = db.Table("Projects")

    def create(self, project_name: str) -> Project:
        uuid = str(uuid4())
        item = {"id": uuid, "name": project_name}
        self.db_client.put_item(Item=item)
        return Project.model_validate(item)

    def list(self, page: Page = default_page) -> List[Project]:
        page = (
            self.db_client.scan(Limit=page.size)
            if not page.last_key
            else self.db_client.scan(
                Limit=page.size, ExclusiveStartKey={"id": page.last_key}
            )
        )
        return [Project.model_validate(item) for item in page["Items"]]

    def get_by_id(self, project_id: str) -> Project:
        response = self.db_client.get_item(Key={"id": project_id})
        return Project.model_validate(response["Item"])