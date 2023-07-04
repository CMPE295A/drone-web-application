pipeline {
    agent any 

    environment {
        MONGODB_URL = "${MONGODB_URL}"
        JWT_SECRET = "${JWT_SECRET}"
      
        AWS_CERTIFICATE_PATH = "${AWS_CERTIFICATE_PATH}"
        AWS_PRIVATE_KEY_PATH = "${AWS_PRIVATE_KEY_PATH}"
        AWS_IOT_CLIENT_ID = "${AWS_IOT_CLIENT_ID}"
        AWS_IOT_HOST_ENDPOINT = "${AWS_IOT_HOST_ENDPOINT}"

        REACT_APP_GOOGLE_MAP_API_KEY = "${REACT_APP_GOOGLE_MAP_API_KEY}"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building Docker images...'
                    sh 'docker-compose build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo 'Testing...'
                    sh 'docker-compose -f docker-compose.yml up --exit-code-from backend'
                }
            }
        }
        stage('Push images') {
            steps {
                script {
                    echo 'Pushing docker images...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-id', 
                                                        usernameVariable: 'DOCKER_USER', 
                                                        passwordVariable: 'DOCKER_PW')]) {
                        sh 'echo $DOCKER_PW | docker login --username $DOCKER_USER --password-stdin'
                        sh 'docker push aj09/drone-react'
                        sh 'docker push aj09/drone-nodejs'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying... todo'
                }
            }
        }
    }
    post {
        always {  
            sh 'docker-compose down'
            // sh 'docker logout'           
        }   
    }
}
