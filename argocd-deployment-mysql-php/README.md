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
