# CI/CD Setup Guide for The Founder's Handbook

This guide details how to set up the continuous integration and deployment pipeline using GitHub Actions and your VPS.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to GitHub.
2.  **Docker Hub Account**: You need an account on [Docker Hub](https://hub.docker.com/) to store your container images.
3.  **VPS Access**: Root or sudo access to your Hostinger VPS.

## Step 1: Configure Docker Hub

1.  Log in to Docker Hub.
2.  Go to **Account Settings** -> **Security** -> **New Access Token**.
3.  Create a token with specific description (e.g., "GitHub Actions Read/Write") and "Read, Write, Delete" permissions.
4.  Copy the token (you won't see it again).

## Step 2: Configure GitHub Secrets

Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.

Add the following secrets:

| Secret Name | Value Description |
| :--- | :--- |
| `DOCKER_HUB_USERNAME` | Your Docker Hub username. |
| `DOCKER_HUB_ACCESS_TOKEN` | The Access Token you created in Step 1. |
| `HOST_IP` | The IP address of your VPS (e.g., `72.61.243.152`). |
| `HOST_USER` | The username to SSH into your VPS (usually `root` or your specific user). |
| `SSH_PRIVATE_KEY` | The private SSH key key content to access your VPS. |

### How to get `SSH_PRIVATE_KEY`:
If you already access your VPS via SSH without a password, you can copy the content of your local private key (usually `~/.ssh/id_rsa`).
If you need to generate a new pair specifically for GitHub Actions:
1.  Run `ssh-keygen -t rsa -b 4096 -C "github-actions"` on your local machine.
2.  Add the content of the public key (ending in `.pub`) to `~/.ssh/authorized_keys` on your VPS.
3.  Add the content of the private key to the `SSH_PRIVATE_KEY` secret in GitHub.

## Step 3: VPS Preparation

Connect to your VPS and ensure Docker is installed and running.

```bash
# Connect to VPS
ssh root@your_vps_ip

# Update system
apt update && apt upgrade -y

# Install Docker (if not installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker
systemctl start docker
systemctl enable docker
```

## Step 4: Verification

1.  Make a change to your code and push to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository.
3.  You should see the "Docker Image CI/CD" workflow running.
4.  Once completed, wait a few seconds and check your live URL: `http://<YOUR_VPS_IP>:5678`.

## Troubleshooting

-   **Workflow fails on "Login to Docker Hub"**: Check your `DOCKER_HUB_USERNAME` and `DOCKER_HUB_ACCESS_TOKEN`.
-   **Workflow fails on "Deploy to VPS"**:
    -   Check `HOST_IP`, `HOST_USER`, and `SSH_PRIVATE_KEY`.
    -   Ensure the public key is correctly added to `~/.ssh/authorized_keys` on the VPS.
    -   Manually try to SSH from your local machine using that key.
-   **App not accessible**:
    -   Check if the firewall on your VPS allows port `5678`.
    -   Run `ufw allow 5678/tcp` on the VPS if using UFW.
