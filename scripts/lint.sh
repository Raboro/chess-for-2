#!/bin/bash

if [ "$1" = "fix" ]; then
    npx eslint '**/*.{ts,tsx}' --fix
else 
    npx eslint '**/*.{ts,tsx}'
fi