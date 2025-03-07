param (
    [string]$inputDir = ".\posts",               # Pasta onde estão os arquivos Markdown
    [string]$outputDir = ".\output",             # Pasta onde os arquivos HTML serão salvos
    [string]$templatePath = ".\templates\blog-template.html"  # Caminho para o template HTML
)

# Verificar se a pasta de entrada existe
if (-Not (Test-Path $inputDir)) {
    Write-Host "Erro: A pasta de entrada '$inputDir' não foi encontrada."
    exit
}

# Verificar se o arquivo de template existe
if (-Not (Test-Path $templatePath)) {
    Write-Host "Erro: O arquivo de template '$templatePath' não foi encontrado."
    exit
}

# Criar a pasta de saída se ela não existir
if (-Not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "Pasta de saída '$outputDir' criada com sucesso."
}

# Listar todos os arquivos .md na pasta de entrada
$files = Get-ChildItem -Path $inputDir -Filter *.md
$totalFiles = $files.Count

if ($totalFiles -eq 0) {
    Write-Host "Nenhum arquivo Markdown encontrado na pasta '$inputDir'."
    exit
}

Write-Host "Encontrados $totalFiles arquivos Markdown para processar."

# Iterar sobre os arquivos .md
$i = 1
foreach ($file in $files) {
    $fileNameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $outputFile = Join-Path -Path $outputDir -ChildPath "$fileNameWithoutExt.html"

    # Executar o comando Pandoc com o novo parâmetro --shift-heading-level-by
    pandoc $file.FullName --template $templatePath --shift-heading-level-by=1 -o $outputFile

    # Verificar se o arquivo foi criado
    if (-Not (Test-Path $outputFile)) {
        Write-Host "Erro ao processar o arquivo: $($file.FullName)"
        continue
    }

    Write-Host "[$i/$totalFiles] Arquivo processado: $outputFile"
    $i++
}

Write-Host "Conversão concluída!"