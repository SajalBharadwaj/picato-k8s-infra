# 1. Jenkins ke liye dedicated Namespace
resource "kubernetes_namespace" "jenkins" {
  metadata {
    name = "jenkins"
  }
}

# 2. Jenkins Deployment (Single Node Local Light-Weight Setup)
resource "kubernetes_deployment" "jenkins" {
  metadata {
    name      = "jenkins"
    namespace = kubernetes_namespace.jenkins.metadata[0].name
    labels = {
      app = "jenkins"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "jenkins"
      }
    }
    template {
      metadata {
        labels = {
          app = "jenkins"
        }
      }
      spec {
        container {
          name  = "jenkins"
          image = "jenkins/jenkins:lts" # Official Long-Term Support Image

          port {
            container_port = 8080
            name           = "web"
          }
          port {
            container_port = 50000
            name           = "agent"
          }

          # Local VirtualBox ke hisab se resources tight rakhe hain taaki crash na ho
          resources {
            requests = {
              cpu    = "50m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "300m"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}

# 3. Jenkins NodePort Service (Browser me open karne ke liye)
resource "kubernetes_service" "jenkins_service" {
  metadata {
    name      = "jenkins-service"
    namespace = kubernetes_namespace.jenkins.metadata[0].name
  }

  spec {
    type = "NodePort"
    selector = {
      app = "jenkins"
    }

    port {
      name        = "http"
      port        = 8080
      target_port = 8080
      node_port   = 32000 # Local Browser access port
    }
  }
}
