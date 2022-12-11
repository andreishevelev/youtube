pipeline {
    agent any
    tools {nodejs "jenkinsnodejs"}
    triggers { cron('H/30 * * * *') }

    stages {
        stage('Checkout external proj') {
            steps {
                checkout([$class: 'GitSCM',
                branches: [[name: '*/master']],
                userRemoteConfigs: [[credentialsId: 'ashevelevGIT',
                url: 'https://github.com/andreishevelev/youtube.git']]])
            }
         }
        stage('like ivdeo') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    wrap([$class: 'Xvfb', screen : '1920x1080x24', installationName: 'jenkinsXvfb']) {
                        sh 'npm install'
                        sh 'npm test'    
                    }
                }
            }
        }
        stage('reports') {
            steps {
                script {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }
    }
}