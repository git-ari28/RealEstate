pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker images') {
            steps {
                // Build images for api, client, mongo (mongo uses image)
                sh 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Deploy stack') {
            steps {
                // Stop old containers (ignore error if none running)
                sh 'docker compose -f docker-compose.yml down || true'

                // Start everything in background
                sh 'docker compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful – stack is up!'
        }
        failure {
            echo '❌ Deployment failed – check Jenkins console log.'
        }
    }
}
