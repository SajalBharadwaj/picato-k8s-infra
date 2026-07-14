# 1. Kubernetes Provider Setup (Minikube automatically picks config from ~/.kube/config)
provider "kubernetes" {
  config_path = "~/.kube/config"
}

# 2. Namespace Creation
resource "kubernetes_namespace" "picato_prod" {
  metadata {
    name = "picato-prod"
  }
}

# 3. Persistent Volume (PV)
resource "kubernetes_persistent_volume" "picato_pv" {
  metadata {
    name = "picato-pv"
    labels = {
      type = "local"
    }
  }
  spec {
    storage_class_name = "manual"
    capacity = {
      storage = "1Gi"
    }
    access_modes = ["ReadWriteOnce"]
    persistent_volume_reclaim_policy = "Retain"
    persistent_volume_source {
      host_path {
        path = "/mnt/data"
      }
    }
  }
}

# 4. Persistent Volume Claim (PVC)
resource "kubernetes_persistent_volume_claim" "picato_pvc" {
  metadata {
    name      = "picato-pvc"
    namespace = kubernetes_namespace.picato_prod.metadata[0].name
    labels = {
      app = "picato"
    }
  }
  spec {
    storage_class_name = "manual"
    volume_name        = kubernetes_persistent_volume.picato_pv.metadata[0].name
    access_modes       = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "1Gi"
      }
    }
  }
}

# 5. Deployment Setup (With Light CPU Resources & Docker Hub Image)
resource "kubernetes_deployment" "picato_deployment" {
  metadata {
    name      = "picato-deployment"
    namespace = kubernetes_namespace.picato_prod.metadata[0].name
    labels = {
      app = "picato"
    }
  }

  spec {
    replicas = 3 # Controlled count to avoid insufficient CPU crash
    
    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge       = "25%"
        max_unavailable = "25%"
      }
    }

    selector {
      match_labels = {
        app = "picato"
      }
    }

    template {
      metadata {
        labels = {
          app = "picato"
        }
      }

      spec {
        container {
          name              = "picato-app"
          image             = "sajal30/picato-app:latest" # Docker Hub linked image
          image_pull_policy = "Always"

          port {
            container_port = 3000
          }

          volume_mount {
            name       = "picato-storage"
            mount_path = "/app/public/uploads"
          }

          # Environment mappings linking (Assuming config/secret exist or are created)
          env_from {
            config_map_ref {
              name = "picato-config"
            }
          }
          env_from {
            secret_ref {
              name = "picato-secret"
            }
          }

          resources {
            requests = {
              cpu    = "10m"
              memory = "64Mi"
            }
            limits = {
              cpu    = "200m"
              memory = "256Mi"
            }
          }
        }

        volume {
          name = "picato-storage"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.picato_pvc.metadata[0].name
          }
        }
      }
    }
  }
}

# 6. Service Setup (With Free NodePort 30090)
resource "kubernetes_service" "picato_service" {
  metadata {
    name      = "picato-service"
    namespace = kubernetes_namespace.picato_prod.metadata[0].name
    labels = {
      app = "picato"
    }
  }

  spec {
    type = "NodePort"
    selector = {
      app = "picato"
    }

    port {
      port        = 3000
      target_port = 3000
      node_port   = 30090 # The unique allocated conflict-free port
    }
  }
}
