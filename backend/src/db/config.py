import os
import boto3
import pathlib
from dotenv import load_dotenv
from boto3.resources.base import ServiceResource
from boto3 import Session

load_dotenv()

class Config:
    AWS_REGION_NAME = os.getenv('AWS_REGION_NAME')
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    DYNAMODB_URL: str = os.getenv("DYNAMODB_URL")

def initialize_db() -> ServiceResource:
    ddb = boto3.resource('dynamodb',
                         region_name=Config.AWS_REGION_NAME,
                         aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
                         aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
                         endpoint_url=Config.DYNAMODB_URL)

    return ddb

ddb = initialize_db()