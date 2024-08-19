# News App

This repository contains a React application that can be easily containerized and run using Docker.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- A terminal or command-line interface.

### Installation

1. **Clone the repository**:

   First, clone the repository from GitHub to your local machine.

   ```sh
   git clone https://github.com/TalhaSoftPlace/news-aggregator.git

2. **Clone the repository**:
    cd your-repo-name

1. **Build the Docker image**:
    ```sh
    docker build -t t-news-app . 

2. **Run the Docker container**:
    After the image is built, run the container using the following command:
    
    ```sh
    docker run -p 3000:80 t-news-app
    
    This command maps port 3000 on your local machine to port 80 in the Docker container (where the application is served by Nginx).

3. **Access the application**:
    Once the container is running, open your web browser and go to:
    ```sh
    http://localhost:3000

    Your React application should now be up and running.

**Stopping the Container**:
To stop the running Docker container, press Ctrl + C in the terminal where the container is running.

Alternatively, you can list all running containers and stop a specific container using its ID:
    
    
    docker ps
    docker stop <container_id>


**Stopping the Container**:
    Cleaning Up
    If you want to remove the Docker image after you're done, you can do so with the following command:
    
    
    docker rmi t-news-app
