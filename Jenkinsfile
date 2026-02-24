pipeline{
    agent any
    triggers{
        pollSCM("* * * * *")
    }
    tools{
        nodejs "Node18"
    }
    stages{
        stage('checkout'){
            steps{
                git url: 'https://github.com/Naresh1770/fullstack-cicd-app.git',
                    branch: 'main'
            }
        }
        stage('Build Images (Parallel)'){
            parallel{

                stage('Build Backend'){
                    steps{
                    sh 'docker build -t naresh1770/backend:v2 ./backend'
                }
                }
                stage('Build Frontend'){
                    steps{
                        sh 'docker build -t naresh1770/forntend:v2 ./frontend'
                    }
                }
            }
        }
        stage('Docker login'){
            steps{
                withCredentials([usernamepassword(
                    credentialsId : 'docker_hub',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]){
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password--stdin'
                }
            }
        }
        stage('Image Push (parallel)'){
            parallel{

                stage('Backend Image Push'){
                    steps{
                        sh 'docker push naresh1770/backend:v2'
                    }
                }
                stage('Frontend Image Push'){
                 steps{
                    sh 'docker push naresh1770/frontend:v2'
                 }
                }
            }
        }
        stage('Deploy'){
            steps{
                sh ''' 
                docker compose down || true
                docker compose up -d
                '''
            }
        }
    }
    post{
        success{
            echo 'Your pipeline is successful'
        }
        failure{
            echo 'Pipeline failed'
        }
    }
}