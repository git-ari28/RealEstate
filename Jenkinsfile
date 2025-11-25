pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                // Stop old containers if they exist (don't fail if they don't)
                sh 'docker compose -f docker-compose.yml down || true'

                // Build images for api and client
                sh 'docker compose -f docker-compose.yml build'

                // Start everything in background
                sh 'docker compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        success {
            echo ' Deployment successful – frontend at http://localhost:5173, backend at http://localhost:5000'
        }
        failure {
            echo ' Deployment failed – check Jenkins console log.'
        }
    }
}
