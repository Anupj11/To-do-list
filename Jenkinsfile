// Define a declarative pipeline
pipeline {
    // Agent specifies where the pipeline or a stage will run.
    // 'any' means Jenkins will allocate an available agent.
    agent any

    // Environment variables that can be used throughout the pipeline
    environment {
        // Defines the Docker image name and tag.
        // It's tagged with the Jenkins BUILD_NUMBER for uniqueness.
        DOCKER_IMAGE = "my-todo-app:${env.BUILD_NUMBER}"

        // Define the Docker container name for consistent access/management.
        // THIS MUST MATCH THE NAME OF YOUR CURRENTLY RUNNING APPLICATION CONTAINER
        // (from your 'docker ps' output, which was 'todo-website').
        CONTAINER_NAME = "todo-website"

        // Define the host port you want to use for the app (e.g., 8000).
        // This is the port you'll use in your browser (http://localhost:8000).
        HOST_PORT = "8000"

        // The port your Node.js application actually listens on inside the Docker container (3000).
        APP_PORT = "3000"
    }

    // Stages define a series of steps to be executed in the pipeline.
    stages {
        // Stage 1: Checkout the source code from GitHub.
        stage('Checkout') {
            steps {
                // Check out the repository.
                // Replace <your-username> with your actual GitHub username.
                // 'credentialsId' refers to the ID of the GitHub Personal Access Token (PAT)
                // you configured in Jenkins credentials.
                git branch: 'main', credentialsId: 'github-pat-credential', url: 'https://github.com/<your-username>/my-todo-cicd.git'
                echo "Code checked out from GitHub."
            }
        }

        // Stage 2: Build the Docker image for the application.
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile located in the current directory.
                    // The '-t' flag tags the image with the name and build number defined in DOCKER_IMAGE.
                    // The '.' indicates that the Dockerfile is in the current directory (workspace).
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    echo "Docker image ${DOCKER_IMAGE} built successfully."
                }
            }
        }

        // Stage 3: (Optional) Run tests.
        // In a real application, you'd execute your unit, integration, or linting tests here.
        stage('Test') {
            steps {
                echo "Running application tests (this is a placeholder for actual tests like 'npm test')."
                // Example: sh "npm test" (if you had a 'test' script in your package.json)
            }
        }

        // Stage 4: Deploy the Docker image.
        // This stage stops and removes the old running container and starts a new one with the fresh image.
        stage('Deploy') {
            steps {
                script {
                    echo "Checking for existing container '${CONTAINER_NAME}'..."
                    // Stop the old container gracefully. '|| true' ensures the command doesn't fail the build
                    // if the container doesn't exist (e.g., first deployment).
                    sh "docker stop ${CONTAINER_NAME} || true"
                    // Remove the stopped container.
                    sh "docker rm ${CONTAINER_NAME} || true"
                    echo "Previous container stopped and removed (if it existed)."

                    // Run the new Docker container in detached mode (-d).
                    // -p: Maps the host port (HOST_PORT) to the container's application port (APP_PORT).
                    // --name: Assigns a specific name to the container for easy management.
                    sh "docker run -d -p ${HOST_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}"
                    echo "New container '${CONTAINER_NAME}' started on port ${HOST_PORT}."
                    echo "The To-Do app should now be accessible at http://<YourJenkinsHostIP>:${HOST_PORT}"
                }
            }
        }
    }

    // Post-build actions: These blocks execute after all stages complete, regardless of their success.
    post {
        // This block always executes.
        always {
            echo 'Pipeline finished.'
        }
        // This block executes only if all stages completed successfully.
        success {
            echo 'Pipeline successfully completed!'
        }
        // This block executes if any stage in the pipeline failed.
        failure {
            echo 'Pipeline failed. Check console output for errors.'
        }
    }
}
