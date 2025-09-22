@echo off
start cmd /k "cd /d %~dp0 && npx ts-node server/index.ts"
start cmd /k "cd /d %~dp0 && npm run dev"
