#!/bin/bash
COVERAGE=$(sed -nE 's/.*>([0-9]{1,3})%<.*/\1/p' docs/coverage.svg | head -1)

if (( $COVERAGE >= $COVERAGE_REQUIRED )) then
  exit 0;
else
  echo "Coverage: $COVERAGE/$COVERAGE_REQUIRED";
  exit 1;
fi