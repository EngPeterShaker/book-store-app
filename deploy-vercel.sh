#!/bin/bash

# Vercel Deployment Script for Book Store App
# This script helps automate the deployment process

set -e

echo "🚀 Starting Vercel Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it first:"
    echo "yarn global add vercel"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    print_error "Please run this script from the root directory of your project"
    exit 1
fi

# Function to deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if project is linked
    if [ ! -f ".vercel/project.json" ]; then
        print_warning "Project not linked to Vercel. Linking now..."
        vercel link
    fi
    
    # Deploy
    print_status "Building and deploying..."
    vercel --prod
    
    print_status "Deployment completed successfully!"
}

# Function to check deployment status
check_status() {
    print_status "Checking deployment status..."
    vercel ls
}

# Function to show logs
show_logs() {
    print_status "Showing recent deployment logs..."
    vercel logs
}

# Function to open project in browser
open_project() {
    print_status "Opening project in browser..."
    vercel open
}

# Function to show environment variables
show_env() {
    print_status "Current environment variables:"
    vercel env ls
}

# Function to add environment variable
add_env() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        print_error "Usage: $0 add-env <KEY> <VALUE>"
        exit 1
    fi
    
    print_status "Adding environment variable: $1"
    vercel env add "$1" production
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy_to_vercel
        ;;
    "status")
        check_status
        ;;
    "logs")
        show_logs
        ;;
    "open")
        open_project
        ;;
    "env")
        show_env
        ;;
    "add-env")
        add_env "$2" "$3"
        ;;
    "help"|"--help"|"-h")
        echo "Vercel Deployment Script"
        echo ""
        echo "Usage: $0 [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  deploy     Deploy to Vercel (default)"
        echo "  status     Check deployment status"
        echo "  logs       Show deployment logs"
        echo "  open       Open project in browser"
        echo "  env        Show environment variables"
        echo "  add-env    Add environment variable (usage: $0 add-env KEY VALUE)"
        echo "  help       Show this help message"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Run '$0 help' for usage information"
        exit 1
        ;;
esac
