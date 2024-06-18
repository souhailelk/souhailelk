#!/bin/bash

if [ -z "${APP_TO_RUN:-}" ] || [ "$APP_TO_RUN" = "front" ]; then
  npx serve -s dist/apps/myblog
else
  node dist/apps/back/api/main.js
fi