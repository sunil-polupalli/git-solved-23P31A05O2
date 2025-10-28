#!/bin/bash
set -e

# =====================================================
# DevOps Simulator - Multi-Environment Deploy Script
# =====================================================

# Default environment (can override with: export DEPLOY_ENV=development)
DEPLOY_ENV=${DEPLOY_ENV:-production}

echo "====================================="
echo " DevOps Simulator - Deployment"
echo "====================================="
echo "Environment: $DEPLOY_ENV"
echo "-------------------------------------"

# Main deployment logic
if [ "$DEPLOY_ENV" = "production" ]; then
    echo "Mode: Production"
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"
    echo "Starting production deployment..."

    # 💡 Optional: Add a safety check or actual deploy command here
    # docker build -t devops-simulator .
    # docker run -d -p $APP_PORT:8080 devops-simulator

elif [ "$DEPLOY_ENV" = "development" ]; then
    echo "Mode: Development"
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"
    echo "Installing dependencies..."
    npm install
    echo "Starting development server..."
    # 💡 Optional: docker-compose up -d

else
    echo "❌ Error: Unknown environment '$DEPLOY_ENV'"
    echo "Usage: export DEPLOY_ENV=production|development"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "====================================="
