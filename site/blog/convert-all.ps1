# Definir os diretórios de entrada, saída e o caminho do template
$inputDir = ".\posts"               # Pasta onde estão os arquivos Markdown
$outputDir = ".\output"             # Pasta onde os arquivos HTML serão salvos
$templatePath = ".\templates\blog-template.html"  # Caminho para o template HTML

# Verificar se a pasta de entrada existe
if (-Not (Test-Path $inputDir)) {
    Write-Host "Erro: A pasta de entrada '$inputDir' não foi encontrada."
    exit
}

# Criar a pasta de saída se ela não existir
if (-Not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Iterar sobre todos os arquivos .md na pasta de entrada
Get-ChildItem -Path $inputDir -Filter *.md | ForEach-Object {
    # Extrair o nome do arquivo sem extensão
    $fileNameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

    # Definir o caminho de saída para o arquivo HTML
    $outputFile = Join-Path -Path $outputDir -ChildPath "$fileNameWithoutExt.html"

    # Executar o comando Pandoc para converter o arquivo Markdown em HTML
    pandoc $_.FullName --template $templatePath -o $outputFile

    # Exibir uma mensagem informando que o arquivo foi processado
    Write-Host "Arquivo processado: $outputFile"
}

Write-Host "Conversão concluída!"