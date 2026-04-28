pipeline {
    agent any

    environment {
        REGISTRY = "10.0.2.13:5000"
        IMAGE = "app-iky:latest"
        FULL_IMAGE = "${REGISTRY}/${IMAGE}"
        KEY = "/root/server-1.pem"
    }

    stages {

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag $IMAGE $FULL_IMAGE'
            }
        }

        stage('Push to Local Registry') {
            steps {
                sh 'docker push $FULL_IMAGE'
            }
        }

        stage('Deploy to VM1') {
            steps {
                sh '''
                ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@10.0.1.11 "
                cd /home/ubuntu &&
                docker compose pull &&
                docker compose up -d --remove-orphans
                "
                '''
            }
        }

        stage('Deploy to VM2') {
            steps {
                sh '''
                ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@10.0.1.12 "
                cd /home/ubuntu &&
                docker compose pull &&
                docker compose up -d --remove-orphans
                "
                '''
            }
        }
    }
}