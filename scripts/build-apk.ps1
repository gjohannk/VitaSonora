param(
    [Parameter(Mandatory = $true)]
    [string]$ApiUrl
)

$ErrorActionPreference = 'Stop'
$api = $null
if (![Uri]::TryCreate($ApiUrl, [UriKind]::Absolute, [ref]$api) -or
    $api.Scheme -notin @('http', 'https') -or !$api.Host -or
    $api.IsLoopback -or $api.Host -in @('10.0.2.2', '0.0.0.0') -or
    $api.UserInfo -or $api.Query -or $api.Fragment -or $api.AbsolutePath -match '/api/?$') {
    throw 'Use a URL da API acessivel pelo celular, sem credenciais ou o sufixo /api.'
}

$env:EXPO_PUBLIC_API_URL = $api.AbsoluteUri.TrimEnd('/')
$env:EXPO_OFFLINE = '1'
$env:EXPO_NO_TELEMETRY = '1'
$allowHttp = ($api.Scheme -eq 'http').ToString().ToLowerInvariant()

Push-Location (Join-Path $PSScriptRoot '../android')
try {
    & .\gradlew.bat :app:assembleRelease "-PvitasonoraHttpLocal=$allowHttp"
    if ($LASTEXITCODE -ne 0) { throw "Gradle terminou com codigo $LASTEXITCODE." }
    $apk = Get-Item -LiteralPath 'app/build/outputs/apk/release/app-release.apk'
    Write-Output $apk.FullName
    Get-FileHash -LiteralPath $apk.FullName -Algorithm SHA256
} finally {
    Pop-Location
}
