# PowerShell Helper Script
# یہ script common tasks کو آسان بناتا ہے

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "API Security Learning Platform" -ForegroundColor Green
Write-Host "Helper Script v1.0" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Available Commands:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Install Dependencies (npm install)" -ForegroundColor White
    Write-Host "2. Start Development Server (npm run dev)" -ForegroundColor White
    Write-Host "3. Build for Production (npm run build)" -ForegroundColor White
    Write-Host "4. Start Production Server (npm start)" -ForegroundColor White
    Write-Host "5. Run Linter (npm run lint)" -ForegroundColor White
    Write-Host "6. Clean Install (delete node_modules & reinstall)" -ForegroundColor White
    Write-Host "7. Clear Next.js Cache" -ForegroundColor White
    Write-Host "8. Check Port 3000 Status" -ForegroundColor White
    Write-Host "9. Kill Process on Port 3000" -ForegroundColor White
    Write-Host "10. Open in Browser" -ForegroundColor White
    Write-Host "11. Show Project Info" -ForegroundColor White
    Write-Host "0. Exit" -ForegroundColor Red
    Write-Host ""
}

function Install-Dependencies {
    Write-Host "`nInstalling dependencies..." -ForegroundColor Green
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Installation failed!" -ForegroundColor Red
    }
}

function Start-Dev {
    Write-Host "`nStarting development server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
}

function Build-Production {
    Write-Host "`nBuilding for production..." -ForegroundColor Green
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Build successful!" -ForegroundColor Green
    } else {
        Write-Host "✗ Build failed!" -ForegroundColor Red
    }
}

function Start-Production {
    Write-Host "`nStarting production server..." -ForegroundColor Green
    npm start
}

function Run-Linter {
    Write-Host "`nRunning ESLint..." -ForegroundColor Green
    npm run lint
}

function Clean-Install {
    Write-Host "`nPerforming clean install..." -ForegroundColor Yellow
    
    if (Test-Path "node_modules") {
        Write-Host "Deleting node_modules..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force node_modules
        Write-Host "✓ node_modules deleted" -ForegroundColor Green
    }
    
    if (Test-Path "package-lock.json") {
        Write-Host "Deleting package-lock.json..." -ForegroundColor Yellow
        Remove-Item -Force package-lock.json
        Write-Host "✓ package-lock.json deleted" -ForegroundColor Green
    }
    
    Write-Host "Installing dependencies..." -ForegroundColor Green
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Clean install successful!" -ForegroundColor Green
    } else {
        Write-Host "✗ Installation failed!" -ForegroundColor Red
    }
}

function Clear-NextCache {
    Write-Host "`nClearing Next.js cache..." -ForegroundColor Yellow
    
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force .next
        Write-Host "✓ .next cache cleared" -ForegroundColor Green
    } else {
        Write-Host "No cache to clear" -ForegroundColor Yellow
    }
}

function Check-Port {
    Write-Host "`nChecking port 3000..." -ForegroundColor Green
    $result = netstat -ano | Select-String ":3000"
    
    if ($result) {
        Write-Host "Port 3000 is in use:" -ForegroundColor Yellow
        Write-Host $result -ForegroundColor White
    } else {
        Write-Host "✓ Port 3000 is available" -ForegroundColor Green
    }
}

function Kill-Port3000 {
    Write-Host "`nFinding process on port 3000..." -ForegroundColor Yellow
    $result = netstat -ano | Select-String ":3000.*LISTENING"
    
    if ($result) {
        $line = $result.Line
        $pid = ($line -split '\s+')[-1]
        
        Write-Host "Found process with PID: $pid" -ForegroundColor Yellow
        $confirm = Read-Host "Kill this process? (y/n)"
        
        if ($confirm -eq 'y') {
            taskkill /PID $pid /F
            Write-Host "✓ Process killed" -ForegroundColor Green
        } else {
            Write-Host "Cancelled" -ForegroundColor Yellow
        }
    } else {
        Write-Host "No process found on port 3000" -ForegroundColor Green
    }
}

function Open-Browser {
    Write-Host "`nOpening browser..." -ForegroundColor Green
    Start-Process "http://localhost:3000"
}

function Show-ProjectInfo {
    Write-Host "`n=== Project Information ===" -ForegroundColor Cyan
    
    Write-Host "`nNode Version:" -ForegroundColor Yellow
    node --version
    
    Write-Host "`nNPM Version:" -ForegroundColor Yellow
    npm --version
    
    if (Test-Path "package.json") {
        $package = Get-Content "package.json" | ConvertFrom-Json
        Write-Host "`nProject Name:" -ForegroundColor Yellow
        Write-Host $package.name -ForegroundColor White
        Write-Host "`nProject Version:" -ForegroundColor Yellow
        Write-Host $package.version -ForegroundColor White
    }
    
    Write-Host "`nProject Location:" -ForegroundColor Yellow
    Write-Host (Get-Location) -ForegroundColor White
    
    Write-Host "`nProject Size:" -ForegroundColor Yellow
    $size = (Get-ChildItem -Recurse -ErrorAction SilentlyContinue | 
             Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host ("{0:N2} MB" -f $size) -ForegroundColor White
    
    Write-Host ""
}

# Main Loop
do {
    Show-Menu
    $choice = Read-Host "Enter your choice (0-11)"
    
    switch ($choice) {
        "1" { Install-Dependencies }
        "2" { Start-Dev }
        "3" { Build-Production }
        "4" { Start-Production }
        "5" { Run-Linter }
        "6" { Clean-Install }
        "7" { Clear-NextCache }
        "8" { Check-Port }
        "9" { Kill-Port3000 }
        "10" { Open-Browser }
        "11" { Show-ProjectInfo }
        "0" { 
            Write-Host "`nGoodbye! Happy Learning! 🚀" -ForegroundColor Green
            break 
        }
        default { 
            Write-Host "`nInvalid choice. Please try again." -ForegroundColor Red 
        }
    }
    
    if ($choice -ne "0") {
        Write-Host "`nPress any key to continue..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        Clear-Host
    }
    
} while ($choice -ne "0")
