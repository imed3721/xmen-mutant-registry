# 🧬 X-Men Mutant Registry

A production-style Kubernetes deployment showcasing containerization, CI/CD automation, AWS infrastructure, Kubernetes reliability, and automated recovery.

The **X-Men Mutant Registry** demonstrates how an application can be tested, containerized, deployed, monitored, and recovered using modern DevOps practices and cloud-native tooling.

## 🏗️ Architecture

The deployment pipeline follows this workflow:

```text
Developer Push to main
        │
        ▼
GitHub Actions
        │
        ├── Run Tests
        ├── Validate Application
        └── Build Docker Image
                │
                ▼
        Amazon ECR
                │
                ▼
        Amazon EKS Auto Mode
                │
                ▼
      Kubernetes Deployment
                │
                ▼
       Kubernetes Service
                │
                ▼
     AWS Network Load Balancer
```

## 🛠️ Technology Stack

- **Source Control:** GitHub
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Container Registry:** Amazon Elastic Container Registry (ECR)
- **Orchestration:** Amazon Elastic Kubernetes Service (EKS) Auto Mode
- **Container Orchestration:** Kubernetes
- **Cloud Identity and Access:** AWS IAM
- **Networking:** Amazon VPC, AWS Network Load Balancer

## ⚙️ CI/CD Pipeline

Every change pushed to `main` triggers an automated deployment workflow that:

1. Runs application tests.
2. Validates the Node.js application.
3. Builds a Docker image.
4. Pushes the image to Amazon ECR.
5. Updates the Kubernetes Deployment with the new image.
6. Waits for the Kubernetes rollout to complete.

This pipeline reduces manual deployment steps and provides a repeatable path from code changes to a running application.

## ☸️ Kubernetes Reliability

The application is configured with Kubernetes features designed to improve availability, resource management, and container health.

| Feature | Purpose |
|---|---|
| Two replicas | Maintains multiple application Pods |
| Rolling updates | Deploys new versions incrementally |
| Liveness probe | Detects containers that need restarting |
| Readiness probe | Determines when Pods can receive traffic |
| CPU requests | Defines baseline CPU scheduling requirements |
| Memory requests | Defines baseline memory scheduling requirements |
| CPU limits | Restricts CPU consumption |
| Memory limits | Restricts memory consumption |
| Non-root execution | Reduces container-level security risk |

These configurations demonstrate core Kubernetes practices for operating and managing a containerized application.

## 🧪 Failure Testing and Automated Recovery

A dedicated GitHub Actions chaos workflow deliberately deletes an application Pod to simulate a failure.

The workflow demonstrates Kubernetes self-healing:

1. A running application Pod is deleted.
2. Kubernetes detects that the actual number of replicas no longer matches the desired state.
3. The Deployment controller creates a replacement Pod.
4. The replacement Pod becomes ready and resumes serving traffic once its readiness checks pass.

This provides a practical demonstration of Kubernetes reconciliation and automated recovery from Pod-level failures.

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/62164f0715b7af00c53586928cb5b24893cea20b/screenshots/Screenshot%202026-10-12%20at%2000.26.25.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/62164f0715b7af00c53586928cb5b24893cea20b/screenshots/Screenshot%202026-10-12%20at%2000.24.32.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/62164f0715b7af00c53586928cb5b24893cea20b/screenshots/Screenshot%202026-10-12%20at%2000.24.41.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/62164f0715b7af00c53586928cb5b24893cea20b/screenshots/Screenshot%202026-10-12%20at%2000.24.48.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/62164f0715b7af00c53586928cb5b24893cea20b/screenshots/Screenshot%202026-10-12%20at%2000.24.52.png)

## ↩️ Deployment Rollback

A separate GitHub Actions workflow supports deployment rollback using Kubernetes rollout history.

This allows the Deployment to be returned to a previous revision when a release introduces unexpected behavior or a regression.

The rollback workflow demonstrates a practical recovery mechanism for failed application releases.

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.11.46.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.11.54.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.08.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.14.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.25.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.31.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.44.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.53.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.12.58.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.13.08.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.13.14.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.13.21.png)

![image alt](https://github.com/imed3721/xmen-mutant-registry/blob/3c86e70a0da951d1b95b155ab3955358c688f3af/screenshots/Screenshot%202026-10-12%20at%2000.13.27.png)

## 🔐 AWS Authentication

GitHub Actions authenticates to AWS using an IAM user with access keys stored as encrypted GitHub repository secrets.

**Authentication approach:** IAM access keys are used intentionally for this project; OpenID Connect (OIDC) is not configured.

This keeps credentials out of the repository while demonstrating how CI/CD workflows can authenticate to AWS services.

## 🛡️ Security Practices

The project incorporates several security-conscious practices:

- AWS credentials are stored in GitHub Secrets rather than committed to source control.
- Docker images are tagged using Git commit SHAs for traceability.
- ECR image tag immutability is enabled to prevent existing tags from being overwritten.
- The application container runs as a non-root user.
- Kubernetes CPU and memory limits are configured.
- AWS access is managed through IAM permissions.

These measures provide a foundation for secure deployments, traceable releases, and controlled resource consumption.

## 💰 Cost Management

This project is designed as a short-lived learning and experimentation environment.

Amazon EKS and its associated AWS resources can incur ongoing costs, even when the application is not actively being used.

**To avoid unnecessary charges, delete the EKS cluster and associated resources when the project is no longer in use.** Review related resources, including load balancers, networking components, and container images, to ensure that unwanted billable resources are also removed.

## 🎯 Project Goals

This project demonstrates practical experience with:

- Building automated CI/CD pipelines with GitHub Actions.
- Containerizing a Node.js application with Docker.
- Publishing versioned images to Amazon ECR.
- Deploying applications to Amazon EKS Auto Mode.
- Managing Kubernetes Deployments, Services, and health probes.
- Applying container resource requests and limits.
- Testing Kubernetes self-healing through deliberate Pod failure.
- Rolling back application releases.
- Managing AWS authentication and deployment secrets.
- Applying security and cost-awareness practices in a cloud environment.

