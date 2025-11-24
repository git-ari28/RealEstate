pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                // Uses the repo you configured in the Jenkins job (SCM section)
                checkout scm
            }
        }

        stage('Build Docker images') {
            steps {
                sh 'docker compose -f ${COMPOSE_FILE} build'
            }
        }

        stage('Deploy stack') {
            steps {
                // Stop old containers
                sh 'docker compose -f ${COMPOSE_FILE} down'
                // Start updated stack in background
                sh 'docker compose -f ${COMPOSE_FILE} up -d'
            }
        }
    }

    post {
        success {
            echo '✅ RealEstate MERN app deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed – check Jenkins console log.'
        }
    }
}

