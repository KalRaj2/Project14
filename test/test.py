import time
from locust import HttpUser, task, between

class TestFile(HttpUser):
    wait_time = between(1, 5)
    host= "http://localhost:8089/"

    @task
    def hello_world(self):
        self.client.get("https://docs.locust.io/en/stable/quickstart.html")
        #self.client.get("/world")