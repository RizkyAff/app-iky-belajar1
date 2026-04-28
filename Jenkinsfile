pipeline {
    agent any

    environment {
        IMAGE = "app-iky:latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Save Image') {
            steps {
                sh 'docker save $IMAGE > app.tar'
            }
        }

        stage('Deploy to VM1') {
            steps {
                sh '''
                scp app.tar ubuntu@10.0.1.11:/home/ubuntu/
                ssh ubuntu@10.0.1.11 "
                docker load < app.tar &&
                docker stop app || true &&
                docker rm app || true &&
                docker run -d -p 3000:3000 --name app $IMAGE
                "
                '''
            }
        }

        stage('Deploy to VM2') {
            steps {
                sh '''
                scp app.tar ubuntu@10.0.1.12:/home/ubuntu/
                ssh ubuntu@10.0.1.12 "
                docker load < app.tar &&
                docker stop app || true &&
                docker rm app || true &&
                docker run -d -p 3000:3000 --name app $IMAGE
                "
                '''
            }
        }
    }
}
