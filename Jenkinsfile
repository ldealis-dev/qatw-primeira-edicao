pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network qatw-primeira-edicao_skynet '
        } 
    }

    stages {
        stage('Nodejs dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }        
    }
}
