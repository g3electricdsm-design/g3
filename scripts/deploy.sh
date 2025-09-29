#!/bin/bash

# Deploy script with Vercel cache clearing
echo "🚀 Starting deployment with cache clear..."

# Force a new deployment with cache busting
echo "📦 Building and deploying..."
vercel --prod --force --yes

# Wait for deployment to complete
echo "⏳ Waiting for deployment to complete..."
sleep 30

# Get the deployment URL
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url')
echo "🌐 Deployment URL: https://$DEPLOYMENT_URL"

# Clear cache by making a request with cache-busting parameters
echo "🧹 Clearing Vercel cache..."
curl -s "https://$DEPLOYMENT_URL?v=$(date +%s)" > /dev/null
curl -s "https://$DEPLOYMENT_URL?cache_bust=$(date +%s)" > /dev/null

# Force a fresh build by triggering a webhook (if configured)
if [ ! -z "$VERCEL_WEBHOOK_URL" ]; then
    echo "🔄 Triggering webhook for fresh build..."
    curl -X POST "$VERCEL_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{"clearCache": true, "forceBuild": true}'
fi

echo "✅ Deployment complete with cache cleared!"
echo "🔗 Live URL: https://$DEPLOYMENT_URL"
