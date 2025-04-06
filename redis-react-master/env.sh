#!/bin/sh
echo "window._env_ = { REACT_APP_API_URL: \"$REACT_APP_API_URL\" };" > /app/public/env-config.js
yarn start
