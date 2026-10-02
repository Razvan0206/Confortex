# QA helper: stop whatever listens on :3100, run the quality gate, rebuild, serve the production build.
$ErrorActionPreference = "Continue"
Set-Location (Split-Path $PSScriptRoot -Parent)
$c = Get-NetTCPConnection -LocalPort 3100 -ErrorAction SilentlyContinue
$c | ForEach-Object { try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop } catch {} }
npx next typegen | Out-Null
npx tsc --noEmit
npx eslint .
npx next build 2>&1 | Select-String -Pattern "error|Compiled|Type error|Failed" | Select-Object -First 6
Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npx next start -p 3100 > audit-old\server.log 2>&1" -WindowStyle Hidden
Start-Sleep -Seconds 6
(Invoke-WebRequest http://localhost:3100/ -UseBasicParsing).StatusCode
