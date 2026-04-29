pipeline {
    agent any

    environment {
        REGISTRY = "10.0.2.13:5000"
        IMAGE = "app-iky"
        TAG = "${BUILD_NUMBER}"
        FULL_IMAGE = "${REGISTRY}/${IMAGE}:${TAG}"
        KEY = "/root/server-1.pem"
    }

    stages {

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE:$TAG ./app'
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag $IMAGE:$TAG $FULL_IMAGE
                docker tag $IMAGE:$TAG $REGISTRY/$IMAGE:latest
                '''
            }
        }

        stage('Push to Local Registry') {
            steps {
                sh '''
                docker push $FULL_IMAGE
                docker push $REGISTRY/$IMAGE:latest
                '''
            }
        }

        stage('Sync Config to VM1') {
            steps {
                sh '''
                scp -i $KEY -o StrictHostKeyChecking=no docker-compose.yml ubuntu@10.0.1.11:/home/ubuntu/dckr11/
                scp -i $KEY -o StrictHostKeyChecking=no docker-compose.monitor.yml ubuntu@10.0.1.11:/home/ubuntu/dckr11/
                scp -i $KEY -o StrictHostKeyChecking=no -r nginx ubuntu@10.0.1.11:/home/ubuntu/dckr11/
                scp -i $KEY -o StrictHostKeyChecking=no -r monitoring ubuntu@10.0.1.11:/home/ubuntu/dckr11/
                '''
            }
        }

        stage('Sync Config to VM2') {
            steps {
                sh '''
                scp -i $KEY -o StrictHostKeyChecking=no docker-compose.yml ubuntu@10.0.1.12:/home/ubuntu/dckr12/
                scp -i $KEY -o StrictHostKeyChecking=no -r nginx ubuntu@10.0.1.12:/home/ubuntu/dckr12/
                '''
            }
        }

        stage('Deploy to VM1') {
            steps {
                sh '''
                ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@10.0.1.11 "
                cd /home/ubuntu/dckr11 &&
                docker-compose pull || true &&
                docker-compose -f docker-compose.yml -f docker-compose.monitor.yml up -d --remove-orphans
                "
                '''
            }
        }

        stage('Deploy to VM2') {
            steps {
                sh '''
                ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@10.0.1.12 "
                cd /home/ubuntu/dckr12 &&
                docker-compose pull || true &&
                docker-compose up -d --remove-orphans
                "
                '''
            }
        }
    }
}