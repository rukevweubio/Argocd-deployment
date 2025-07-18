## Introduction

This project demonstrates a full-stack Job Board Application built with PHP and MySQL, deployed on Kubernetes using GitOps principles powered by ArgoCD. The entire infrastructure and application code is managed in a Git repository, and changes are automatically synced to a Google Kubernetes Engine (GKE) cluster using ArgoCD

## Problem Statement
Deploying PHP and MySQL applications manually often leads to inconsistent environments, configuration drift, and time-consuming troubleshooting. This project addresses the need for an automated, repeatable deployment pipeline using Kubernetes, ArgoCD, and Google Cloud. The goal is to ensure faster, more reliable, and scalable application delivery with proper Git-based version contro
 ## Solution Overview
This project automates the deployment of a PHP and MySQL-based web application using Kubernetes and GitOps with ArgoCD. It eliminates manual configurations by leveraging a Git repository as the single source of truth, enabling consistent deployments on Google Cloud. The app is containerized using Docker, deployed via Kubernetes manifests, and continuously managed with ArgoCD for better visibility and control.
## Tech stack
- PHP – Backend language for the job board application
- MySQL – Relational database used to store application data
- Docker – Containerizes both the app and the database
- Kubernetes – Orchestrates the deployment and scaling
- ArgoCD – GitOps tool for continuous delivery and Kubernetes sync
- Google Cloud CLI – Interacts with Google Kubernetes Engine (GKE)
- Git & GitHub – Version control and ArgoCD source repo
- Let me know when you're ready for the next one:
## Data Arch
![data flow daigram](https://github.com/rukevweubio/Argocd-deployment/blob/main/argocd-deployment-mysql-php/screenshoots/argoce3.jpg)

##  Prerequisites
Before getting started, ensure you have the following tools installed:
- Docker : to build teh docker image
- kubectl: to interact with the GKS Cluster
- Google Cloud CLI (gcloud)
- ArgoCD CLI
- Git

## setup & Installation
Clone the Repository:
```
git clone https://github.com/rukevweubio/Argocd-deployment.git
cd Argocd-deployment
```
Build Docker Images
```
docker build -t rukevweubio/php-app:latest ./php-app
docker build -t rukevweubio/mysql-db:latest ./mysql
docker push -t rukevweubio/php-app:latest ./php-app
docker push -t rukevweubio/mysql-db:latest ./mysql

```
## Docker image
![data flow daigram](https://github.com/rukevweubio/Argocd-deployment/blob/main/argocd-deployment-mysql-php/screenshoots/Screenshot%20(1555).png)

### GKE & ArgoCD Deployment
- Create GKE Cluster
```
gcloud container clusters create job-board-cluster --num-nodes=2 --zone=us-central1-a
gcloud container clusters get-credentials job-board-cluster --zone=us-central1-a
```
### Install ArgoCD on the Cluster
```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
## GKS CLUSTER
![GKS CLUSTER](https://github.com/rukevweubio/Argocd-deployment/blob/main/argocd-deployment-mysql-php/screenshoots/Screenshot%20(1558).png)
##Argocd
![ARGOCD CD UI](https://github.com/rukevweubio/Argocd-deployment/blob/main/argocd-deployment-mysql-php/screenshoots/Screenshot%20(1569).png)

![ARGOCD CD UI](https://github.com/rukevweubio/Argocd-deployment/blob/main/argocd-deployment-mysql-php/screenshoots/Screenshot%20(1570).png)





