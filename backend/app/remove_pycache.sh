#!/usr/bin/bash
# remove all the boring bytecode from source tree
find . -type d -name "__pycache__" -exec rm -r {} +
