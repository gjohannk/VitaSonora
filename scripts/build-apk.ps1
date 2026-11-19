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
$env:NODE_ENV = 'production'
$allowHttp = ($api.Scheme -eq 'http').ToString().ToLowerInvariant()

$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$buildRoot = $projectRoot
$temporaryDrive = $null

# CMake e Ninja podem exceder 260 caracteres em pastas Windows profundas.
if ($projectRoot.Length -gt 45) {
    $freeLetter = 'V', 'W', 'X', 'Y', 'Z' | Where-Object {
        !(Get-PSDrive -Name $_ -ErrorAction SilentlyContinue)
    } | Select-Object -First 1
    if ($freeLetter) {
        $driveName = "${freeLetter}:"
        & subst.exe $driveName ([IO.Path]::GetDirectoryName($projectRoot))
        if ($LASTEXITCODE -eq 0) {
            $temporaryDrive = $driveName
            $buildRoot = Join-Path "$temporaryDrive\" ([IO.Path]::GetFileName($projectRoot))
        }
    }
}

try {
    Push-Location -LiteralPath (Join-Path $buildRoot 'android')
    try {
        & .\gradlew.bat :app:assembleRelease "-PvitasonoraHttpLocal=$allowHttp"
        if ($LASTEXITCODE -ne 0) { throw "Gradle terminou com codigo $LASTEXITCODE." }
    } finally {
        Pop-Location
    }
} finally {
    if ($temporaryDrive) { & subst.exe $temporaryDrive /d }
}

$apk = Get-Item -LiteralPath (Join-Path $projectRoot 'android/app/build/outputs/apk/release/app-release.apk')
Write-Output $apk.FullName
Get-FileHash -LiteralPath $apk.FullName -Algorithm SHA256
