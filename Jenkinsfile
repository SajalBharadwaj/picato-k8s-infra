pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'GitHub repository se latest infrastructure code clone ho rha hai...'
                checkout scm
            }
        }

        stage('Validate Infrastructure') {
            steps {
                echo 'Terraform files ka syntax checking shuru...'
            }
        }

        stage('Docker Image Rebuild') {
            steps {
                echo 'Docker Hub account sajal30 ke liye image sync check...'
                echo 'Image Target: sajal30/picato-app:latest'
            }
        }
    }
}
