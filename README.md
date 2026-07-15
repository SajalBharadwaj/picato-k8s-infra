# 🍔 PICATO - Cloud Native Food Ordering Platform

A production-ready **Cloud Native Food Ordering Platform** built with **Next.js 14**, **Firebase**, **Docker**, **Kubernetes**, **Jenkins**, **Argo CD**, **Terraform**, **Prometheus**, and **Grafana**.

---

# 🚀 Project Overview

PICATO is a full-stack food ordering platform built using **Next.js App Router** with Firebase Authentication, Firestore Database, Stripe & PayPal integration, and a complete Admin Dashboard.

The project is fully containerized using Docker, deployed on Kubernetes, automated through Jenkins CI/CD, managed with Argo CD GitOps, and provisioned using Terraform.

---

# 🏗 Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins CI/CD Pipeline
    │
    ├── Install Dependencies
    ├── Build Application
    ├── Build Docker Image
    ├── Push Docker Image
    ▼
Docker Hub
    │
    ▼
Argo CD
    │
    ▼
Kubernetes Cluster
    │
    ├── Deployment
    ├── Service
    ├── Ingress
    ├── ConfigMap
    ├── Secret
    ├── HPA
    ├── RBAC
    ├── PVC
    └── Monitoring
```

---

# ✨ Features

## 👤 Customer

* User Registration & Login
* Firebase Authentication
* Browse Burgers & Pizzas
* Shopping Cart
* Stripe Payment
* PayPal Payment
* Order Confirmation
* Email Notifications

## 👨‍💻 Admin

* Admin Dashboard
* Menu CRUD
* Order Management
* Search & Filters
* Weekly Revenue Analytics
* Product Analytics
* Best Seller Reports

## 👑 Super Admin

* Admin Management
* Create Admin Accounts
* Role-Based Access Control
* Welcome Email Automation

---

# ⚙ DevOps Features

* Docker Containerization
* Kubernetes Deployment
* Jenkins CI/CD Pipeline
* Argo CD GitOps
* Terraform Infrastructure as Code
* Horizontal Pod Autoscaler (HPA)
* ConfigMap
* Secrets
* RBAC
* NetworkPolicy
* Persistent Volume
* ServiceMonitor
* Prometheus Monitoring
* Grafana Dashboard

---

# 🛠 Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Frontend         | Next.js 14              |
| Styling          | Tailwind CSS            |
| Authentication   | Firebase Authentication |
| Database         | Firestore               |
| Payment          | Stripe, PayPal          |
| Containerization | Docker                  |
| Orchestration    | Kubernetes              |
| CI/CD            | Jenkins                 |
| GitOps           | Argo CD                 |
| Infrastructure   | Terraform               |
| Monitoring       | Prometheus & Grafana    |

---

# 📋 Prerequisites

Install the following software before running the project.

| Tool           | Download                                                   |
| -------------- | ---------------------------------------------------------- |
| Git            | https://git-scm.com/downloads                              |
| Node.js (18+)  | https://nodejs.org                                         |
| Docker Desktop | https://www.docker.com/products/docker-desktop             |
| kubectl        | https://kubernetes.io/docs/tasks/tools/                    |
| Minikube       | https://minikube.sigs.k8s.io/docs/start/                   |
| Helm           | https://helm.sh/docs/intro/install/                        |
| Jenkins        | https://www.jenkins.io/download/                           |
| Terraform      | https://developer.hashicorp.com/terraform/downloads        |
| Argo CD CLI    | https://argo-cd.readthedocs.io/en/stable/cli_installation/ |

---

# ⚡ Quick Setup

## Clone Repository

```bash
git clone https://github.com/SajalBharadwaj/picato-k8s-infra.git

cd picato-k8s-infra
```

## Install Dependencies

```bash
npm install
```

## Create Environment File

```bash
cp .env.local.example .env.local
```

Update your Firebase, Stripe, PayPal and Email credentials inside `.env.local`.

## Run Project

```bash
npm run dev
```

Application URL

```
http://localhost:3000
```

---

# 📂 Project Structure

```text
app/
components/
context/
lib/
utils/

Dockerfile
Jenkinsfile

k8s/
terraform/
argocd/
monitoring/

README.md
```

---

# 🐳 Docker

Build Image

```bash
docker build -t picato .
```

Run Container

```bash
docker run -p 3000:3000 picato
```

Push Image

```bash
docker tag picato YOUR_DOCKER_USERNAME/picato

docker push YOUR_DOCKER_USERNAME/picato
```

---

# ☸ Kubernetes

Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

Deploy Application

```bash
kubectl apply -f k8s/
```

Verify

```bash
kubectl get pods

kubectl get svc

kubectl get ingress
```

---

# 🔄 Jenkins Pipeline

Pipeline Flow

```text
Checkout Source Code
        │
        ▼
Install Dependencies
        │
        ▼
Build Next.js Application
        │
        ▼
Docker Build
        │
        ▼
Docker Push
        │
        ▼
Update Kubernetes Manifest
        │
        ▼
Git Push
        │
        ▼
Argo CD Sync
```

---

# 🚀 Argo CD

Install

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Deploy Application

```bash
kubectl apply -f argocd/application.yaml
```

Sync

```bash
argocd app sync picato
```

---

# 🌍 Terraform

Initialize

```bash
terraform init
```

Plan

```bash
terraform plan
```

Apply

```bash
terraform apply
```

Destroy Infrastructure

```bash
terraform destroy
```

---

# 📊 Monitoring

Install Prometheus & Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update

helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack
```

Access Grafana

```bash
kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80
```

Open

```
http://localhost:3000
```

---

# 📈 CI/CD Workflow

```text
Developer
     │
     ▼
GitHub Repository
     │
     ▼
Jenkins
     │
     ▼
Docker Build & Push
     │
     ▼
Argo CD
     │
     ▼
Kubernetes
     │
     ▼
Prometheus
     │
     ▼
Grafana
```

---

# 🚀 Future Improvements

* Helm Charts
* AWS EKS Deployment
* Blue-Green Deployment
* Canary Deployment
* SonarQube Integration
* Trivy Image Scanning
* Loki Logging
* Elasticsearch
* Kibana
* Multi-Environment Deployment

---

# 💻 Skills Demonstrated

* Next.js
* Firebase Authentication
* Firestore
* Docker
* Kubernetes
* Jenkins
* Argo CD
* Terraform
* GitOps
* CI/CD
* Infrastructure as Code
* Prometheus
* Grafana
* Monitoring & Observability

---

# 👨‍💻 Author

**Sajal Sharma**

**GitHub:** https://github.com/SajalBharadwaj

**LinkedIn:** https://www.linkedin.com/in/sajal-sharma-778709258

**Repository:** https://github.com/SajalBharadwaj/picato-k8s-infra

---

⭐ **If you found this project useful, please consider giving it a Star.**
