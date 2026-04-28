pipeline {
    agent any

    environment {
        IMAGE = "rizkyaff/app-iky"
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/RizkyAff/app-iky-belajar1.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop app || true
                docker rm app || true
                docker run -d -p 3000:3000 --name app $IMAGE
                '''
            }
        }
    }
}
