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
$apkPath = 'android/app/build/outputs/apk/release/app-release.apk'
$buildRoot = $projectRoot
$temporaryRoot = $null

try {
    # Ninja no Windows precisa de um caminho curto para os objetos C++.
    if ($projectRoot.Length -gt 45) {
        $driveRoot = [IO.Path]::GetPathRoot($projectRoot)
        $directoryName = 'vs4-' + [Guid]::NewGuid().ToString('N').Substring(0, 8)
        $buildRoot = Join-Path $driveRoot $directoryName
        $temporaryRoot = (New-Item -ItemType Directory -Path $buildRoot).FullName
        $archive = Join-Path $buildRoot 'source.tar'

        git -C $projectRoot diff --quiet HEAD --
        if ($LASTEXITCODE -ne 0) { throw 'Salve as alteracoes versionadas em um commit antes de gerar o APK.' }
        git -C $projectRoot archive --format=tar -o $archive HEAD
        if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel preparar o commit para compilacao.' }

        & tar.exe -xf $archive -C $buildRoot
        if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel extrair os arquivos versionados.' }

        Push-Location -LiteralPath $buildRoot
        try {
            npm.cmd ci --no-audit --no-fund --include=dev
            if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel instalar as dependencias da compilacao.' }
        } finally {
            Pop-Location
        }
    }

    Push-Location -LiteralPath (Join-Path $buildRoot 'android')
    try {
        & .\gradlew.bat :app:assembleRelease "-PvitasonoraHttpLocal=$allowHttp"
        if ($LASTEXITCODE -ne 0) { throw "Gradle terminou com codigo $LASTEXITCODE." }
    } finally {
        Pop-Location
    }

    $outputPath = Join-Path $projectRoot $apkPath
    if ($temporaryRoot) {
        New-Item -ItemType Directory -Path (Split-Path -Parent $outputPath) -Force | Out-Null
        Copy-Item -LiteralPath (Join-Path $buildRoot $apkPath) -Destination $outputPath
    }
    $apk = Get-Item -LiteralPath $outputPath
    Write-Output $apk.FullName
    Get-FileHash -LiteralPath $apk.FullName -Algorithm SHA256
} finally {
    if ($temporaryRoot) {
        $resolved = (Resolve-Path -LiteralPath $temporaryRoot).ProviderPath
        if ($resolved -eq $temporaryRoot -and
            (Split-Path -Parent $resolved) -eq [IO.Path]::GetPathRoot($projectRoot) -and
            (Split-Path -Leaf $resolved) -match '^vs4-[0-9a-f]{8}$') {
            Remove-Item -LiteralPath $resolved -Recurse -Force -ErrorAction Continue
        }
    }
}
