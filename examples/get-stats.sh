#!/bin/bash

# Get productivity statistics

echo "📊 Your productivity stats:"
curl -s http://localhost:3000/stats | jq '.'

echo ""
echo "🔥 Your current streak:"
curl -s http://localhost:3000/streak | jq '.'
