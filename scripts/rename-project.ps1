param(
  [Parameter(Mandatory = $true)]
  [string]$Name,
  [string]$Title
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")

function To-TitleCase([string]$value) {
  if (-not $value) {
    return ""
  }

  $parts = $value -split "[-_]" | Where-Object { $_ -ne "" }
  $words = foreach ($part in $parts) {
    if ($part.Length -eq 1) {
      $part.ToUpper()
    } else {
      $part.Substring(0, 1).ToUpper() + $part.Substring(1)
    }
  }

  return ($words -join " ")
}

$displayName = if ($Title) { $Title } else { To-TitleCase $Name }
$slug = $Name.ToLower()

$replacements = @(
  @{
    Path = "README.md"
    Pattern = "^(#\\s+).*$"
    Replacement = "`$1$Name"
  },
  @{
    Path = "frontend/src/index.html"
    Pattern = "<title>[^<]*</title>"
    Replacement = "<title>$displayName</title>"
  },
  @{
    Path = "frontend/src/app/pages/dashboard/dashboard-shell.component.html"
    Pattern = "p-title=\"Workspace\""
    Replacement = "p-title=\"$displayName\""
  },
  @{
    Path = "frontend/src/app/pages/dashboard/dashboard-shell.component.html"
    Pattern = "<strong>Workspace</strong>"
    Replacement = "<strong>$displayName</strong>"
  },
  @{
    Path = "frontend/src/app/pages/auth/login-page.component.html"
    Pattern = "p-title=\"Acesse seu [^\"]*\""
    Replacement = "p-title=\"Acesse seu $displayName\""
  },
  @{
    Path = "frontend/src/app/core/auth.service.ts"
    Pattern = "const STORAGE_KEY = \"[^\"]*\";"
    Replacement = "const STORAGE_KEY = \"$slug.session\";"
  },
  @{
    Path = "backend/package.json"
    Pattern = "\"name\"\\s*:\\s*\"[^\"]*\""
    Replacement = "\"name\": \"$Name-backend\""
  },
  @{
    Path = "frontend/package.json"
    Pattern = "\"name\"\\s*:\\s*\"[^\"]*\""
    Replacement = "\"name\": \"$Name-frontend\""
  }
)

foreach ($item in $replacements) {
  $filePath = Join-Path $root $item.Path
  if (-not (Test-Path $filePath)) {
    Write-Warning "Arquivo nao encontrado: $($item.Path)"
    continue
  }

  $content = Get-Content -Raw -Path $filePath
  $updated = [regex]::Replace($content, $item.Pattern, $item.Replacement, "Multiline")

  if ($updated -ne $content) {
    Set-Content -Path $filePath -Value $updated -NoNewline
    Write-Host "Atualizado: $($item.Path)"
  } else {
    Write-Host "Sem alteracao: $($item.Path)"
  }
}
