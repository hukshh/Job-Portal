#!/bin/bash

# Job Portal - Quick Deployment Script
# Usage: bash deploy.sh

echo "=================================="
echo "🚀 Job Portal - Deployment Helper"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Choose your deployment method:${NC}"
echo ""
echo "1) Vercel (Recommended - Easiest)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Build Only (for manual deployment)"
echo "5) Preview Build"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Setting up Vercel deployment...${NC}"
        echo ""
        echo "Step 1: Building application..."
        npm run build
        
        echo ""
        echo "Step 2: Checking if Vercel CLI is installed..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        echo ""
        echo -e "${BLUE}Step 3: Deploying to Vercel...${NC}"
        echo "When prompted:"
        echo "  - Create a new project (Y)"
        echo "  - Use defaults for other options"
        echo ""
        vercel
        
        echo ""
        echo -e "${GREEN}✓ Deployment complete!${NC}"
        echo "Your app is now live at the URL shown above."
        ;;
        
    2)
        echo ""
        echo -e "${YELLOW}Setting up Netlify deployment...${NC}"
        echo ""
        echo "Step 1: Building application..."
        npm run build
        
        echo ""
        echo "Step 2: Checking if Netlify CLI is installed..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm i -g netlify-cli
        fi
        
        echo ""
        echo -e "${BLUE}Step 3: Deploying to Netlify...${NC}"
        netlify deploy --prod --dir=dist
        
        echo ""
        echo -e "${GREEN}✓ Deployment complete!${NC}"
        ;;
        
    3)
        echo ""
        echo -e "${YELLOW}Setting up GitHub Pages deployment...${NC}"
        echo ""
        read -p "Enter your GitHub username: " github_user
        read -p "Enter your GitHub repo name (default: job-portal): " repo_name
        repo_name=${repo_name:-job-portal}
        
        echo ""
        echo "Step 1: Building application..."
        npm run build
        
        echo ""
        echo "Step 2: Installing gh-pages..."
        npm i -D gh-pages
        
        echo ""
        echo "Step 3: Creating git repo (if not exists)..."
        if [ ! -d .git ]; then
            git init
            git add .
            git commit -m "Initial commit - Job Portal"
            git remote add origin https://github.com/$github_user/$repo_name.git
            git branch -M main
        fi
        
        echo ""
        echo "Step 4: Deploying to GitHub Pages..."
        npm run build
        git add .
        git commit -m "Build for GitHub Pages deployment"
        git push -u origin main
        
        echo ""
        echo -e "${GREEN}✓ Deployment setup complete!${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Go to https://github.com/$github_user/$repo_name/settings/pages"
        echo "2. Select 'gh-pages' branch"
        echo "3. Your site will be live at: https://$github_user.github.io/$repo_name"
        ;;
        
    4)
        echo ""
        echo -e "${YELLOW}Building application for production...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✓ Build complete!${NC}"
        echo "Files ready in: ./dist/"
        echo ""
        echo "You can now:"
        echo "  - Upload the 'dist' folder to any web hosting"
        echo "  - Use Vercel, Netlify, or AWS S3"
        ;;
        
    5)
        echo ""
        echo -e "${YELLOW}Building and previewing production build...${NC}"
        npm run build
        echo ""
        npm run preview
        ;;
        
    *)
        echo "Invalid choice. Please enter 1-5."
        exit 1
        ;;
esac

echo ""
echo "=================================="
echo -e "${GREEN}Done!${NC}"
echo "=================================="
