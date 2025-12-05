#!/bin/bash

# Yolo API Test Script
# Run this script to test all API endpoints

BASE_URL="http://localhost:3000"

echo "======================================"
echo "🚀 Yolo API Endpoint Tests"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${BLUE}1. Testing Health Check${NC}"
echo "GET $BASE_URL/health"
curl -s $BASE_URL/health | jq '.'
echo -e "${GREEN}✓ Health check passed${NC}\n"

# Test 2: Create Tasks
echo -e "${BLUE}2. Creating Tasks${NC}"

echo "Creating task: Clean desk (easy)"
TASK1=$(curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean desk", "difficulty": "easy"}')
TASK1_ID=$(echo $TASK1 | jq -r '.id')
echo $TASK1 | jq '.'

echo ""
echo "Creating task: Write blog post (hard)"
TASK2=$(curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write blog post", "difficulty": "hard", "description": "Complete the API tutorial"}')
TASK2_ID=$(echo $TASK2 | jq -r '.id')
echo $TASK2 | jq '.'

echo ""
echo "Creating task: Review PR (medium)"
TASK3=$(curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Review PR", "difficulty": "medium", "description": "Review team pull request"}')
TASK3_ID=$(echo $TASK3 | jq -r '.id')
echo $TASK3 | jq '.'
echo -e "${GREEN}✓ Tasks created${NC}\n"

# Test 3: List All Tasks
echo -e "${BLUE}3. Listing All Tasks${NC}"
echo "GET $BASE_URL/tasks"
curl -s $BASE_URL/tasks | jq '.'
echo -e "${GREEN}✓ Listed all tasks${NC}\n"

# Test 4: List Incomplete Tasks
echo -e "${BLUE}4. Listing Incomplete Tasks${NC}"
echo "GET $BASE_URL/tasks?status=incomplete"
curl -s "$BASE_URL/tasks?status=incomplete" | jq '.'
echo -e "${GREEN}✓ Listed incomplete tasks${NC}\n"

# Test 5: Get Random Task
echo -e "${BLUE}5. Getting Random Task (YOLO!)${NC}"
echo "GET $BASE_URL/next"
RANDOM_TASK=$(curl -s $BASE_URL/next)
echo $RANDOM_TASK | jq '.'
echo -e "${GREEN}✓ Got random task${NC}\n"

# Test 6: Complete a Task
echo -e "${BLUE}6. Completing Task: Clean desk${NC}"
echo "POST $BASE_URL/tasks/$TASK1_ID/complete"
curl -s -X POST $BASE_URL/tasks/$TASK1_ID/complete | jq '.'
echo -e "${GREEN}✓ Task completed${NC}\n"

# Test 7: List Completed Tasks
echo -e "${BLUE}7. Listing Completed Tasks${NC}"
echo "GET $BASE_URL/tasks?status=completed"
curl -s "$BASE_URL/tasks?status=completed" | jq '.'
echo -e "${GREEN}✓ Listed completed tasks${NC}\n"

# Test 8: Get Streak
echo -e "${BLUE}8. Getting Current Streak${NC}"
echo "GET $BASE_URL/streak"
curl -s $BASE_URL/streak | jq '.'
echo -e "${GREEN}✓ Got streak data${NC}\n"

# Test 9: Get Stats
echo -e "${BLUE}9. Getting Statistics${NC}"
echo "GET $BASE_URL/stats"
curl -s $BASE_URL/stats | jq '.'
echo -e "${GREEN}✓ Got statistics${NC}\n"

# Test 10: Error Handling - Missing Title
echo -e "${BLUE}10. Testing Error Handling (Missing Title)${NC}"
echo "POST $BASE_URL/tasks (without title)"
curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"description": "No title"}' | jq '.'
echo -e "${GREEN}✓ Error handling works${NC}\n"

# Test 11: Error Handling - Invalid Difficulty
echo -e "${BLUE}11. Testing Error Handling (Invalid Difficulty)${NC}"
echo "POST $BASE_URL/tasks (invalid difficulty)"
curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "difficulty": "super-hard"}' | jq '.'
echo -e "${GREEN}✓ Error handling works${NC}\n"

# Test 12: Error Handling - Task Already Completed
echo -e "${BLUE}12. Testing Error Handling (Already Completed)${NC}"
echo "POST $BASE_URL/tasks/$TASK1_ID/complete (already completed)"
curl -s -X POST $BASE_URL/tasks/$TASK1_ID/complete | jq '.'
echo -e "${GREEN}✓ Error handling works${NC}\n"

# Test 13: Delete a Task
echo -e "${BLUE}13. Deleting Task: Review PR${NC}"
echo "DELETE $BASE_URL/tasks/$TASK3_ID"
curl -s -X DELETE $BASE_URL/tasks/$TASK3_ID -w "\nHTTP Status: %{http_code}\n"
echo -e "${GREEN}✓ Task deleted${NC}\n"

# Test 14: Error Handling - Task Not Found
echo -e "${BLUE}14. Testing Error Handling (Task Not Found)${NC}"
echo "DELETE $BASE_URL/tasks/nonexistent-id"
curl -s -X DELETE $BASE_URL/tasks/nonexistent-id | jq '.'
echo -e "${GREEN}✓ Error handling works${NC}\n"

# Final Stats
echo -e "${BLUE}15. Final Statistics${NC}"
echo "GET $BASE_URL/stats"
curl -s $BASE_URL/stats | jq '.'
echo -e "${GREEN}✓ Got final statistics${NC}\n"

echo "======================================"
echo -e "${GREEN}✓ All tests completed successfully!${NC}"
echo "======================================"
