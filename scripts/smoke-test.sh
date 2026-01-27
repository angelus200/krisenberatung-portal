#!/bin/bash

# Krisenberatungsportal - Automated Smoke Test
# Tests critical endpoints on the live URL

BASE_URL="https://www.unternehmensoptimierung.app"
FAILED=0
PASSED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Starting Smoke Test for ${BASE_URL}"
echo "=========================================="
echo ""

# Function to test an endpoint
test_endpoint() {
  local url=$1
  local expected_status=$2
  local description=$3

  echo -n "Testing: ${description}... "

  response=$(curl -s -o /dev/null -w "%{http_code}" -L "${url}" --max-time 10)

  if [ "$response" -eq "$expected_status" ]; then
    echo -e "${GREEN}✓ PASS${NC} (${response})"
    ((PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC} (Expected: ${expected_status}, Got: ${response})"
    ((FAILED++))
  fi
}

# Function to test if content contains string
test_content() {
  local url=$1
  local search_string=$2
  local description=$3

  echo -n "Testing: ${description}... "

  content=$(curl -s -L "${url}" --max-time 10)

  if echo "$content" | grep -q "$search_string"; then
    echo -e "${GREEN}✓ PASS${NC} (Content found)"
    ((PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC} (Content not found: ${search_string})"
    ((FAILED++))
  fi
}

echo "📋 PUBLIC PAGES"
echo "----------------"
test_endpoint "${BASE_URL}/" 200 "Startseite"
test_endpoint "${BASE_URL}/impressum" 200 "Impressum"
test_endpoint "${BASE_URL}/datenschutz" 200 "Datenschutz"
test_endpoint "${BASE_URL}/agb" 200 "AGB"
test_endpoint "${BASE_URL}/about" 200 "Über uns"
test_endpoint "${BASE_URL}/team" 200 "Team"
test_endpoint "${BASE_URL}/press" 200 "Presse"
test_endpoint "${BASE_URL}/shop" 200 "Shop"

echo ""
echo "🔒 AUTH PAGES"
echo "-------------"
test_endpoint "${BASE_URL}/sign-in" 200 "Sign In"
test_endpoint "${BASE_URL}/sign-up" 200 "Sign Up"

echo ""
echo "📱 PROTECTED PAGES (Should redirect to login)"
echo "---------------------------------------------"
test_endpoint "${BASE_URL}/dashboard" 200 "Dashboard (redirect)"
test_endpoint "${BASE_URL}/onboarding" 200 "Onboarding (redirect)"
test_endpoint "${BASE_URL}/orders" 200 "Orders (redirect)"

echo ""
echo "🔧 API HEALTH"
echo "-------------"
test_endpoint "${BASE_URL}/api/health" 200 "Health Check"
test_endpoint "${BASE_URL}/api/trpc/system.health" 200 "tRPC Health"

echo ""
echo "📄 CONTENT VALIDATION"
echo "---------------------"
test_content "${BASE_URL}/" "Unternehmensoptimierung" "Startseite title"
test_content "${BASE_URL}/shop" "Analyse" "Shop products"
test_content "${BASE_URL}/impressum" "Marketplace24-7 GmbH" "Impressum company"

echo ""
echo "=========================================="
echo -e "📊 Test Results"
echo "=========================================="
echo -e "${GREEN}Passed: ${PASSED}${NC}"
echo -e "${RED}Failed: ${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed! Site is healthy.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed. Please investigate.${NC}"
  exit 1
fi
