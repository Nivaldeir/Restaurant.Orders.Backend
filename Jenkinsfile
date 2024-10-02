pipeline {
  agent any
  stages {
    stage("Build docker Image"){
      steps {
        script{
          dockerapp = docker.build("nivaldeir/api-produto:v2", '-f ./src/PedeLogo.Catalogo.Api/Dockerfile')

        }
      }
    }
    stage("Push docker Image"){
      steps {
        sh "echo 'Envio de imagem'"
      }
    }
    stage("Deploy no Kubernetes"){
      steps {
        sh "echo 'Deploy no Kubernetes'"
      }
    }
  }
}