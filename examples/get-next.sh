#!/bin/bash

# Get a random incomplete task (the YOLO way!)

echo "🎲 Getting your next task..."
curl -s http://localhost:3000/next | jq '.'
