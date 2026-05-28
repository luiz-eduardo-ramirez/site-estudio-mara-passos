import os
from pathlib import Path
from PIL import Image

def converter_para_webp(pasta_raiz='public', qualidade=85):
    """
    Varre a pasta_raiz e converte todas as imagens PNG e JPG/JPEG para WebP.
    """
    # Define o caminho da pasta raiz
    caminho_base = Path(pasta_raiz)
    
    if not caminho_base.exists():
        print(f"Erro: A pasta '{pasta_raiz}' não foi encontrada.")
        return

    # Extensões que queremos converter
    extensoes_alvo = {'.png', '.jpg', '.jpeg'}
    arquivos_convertidos = 0

    print(f"Iniciando conversão na pasta: {caminho_base.resolve()}...\n")

    # rglob('*') percorre a pasta e todas as subpastas recursivamente
    for caminho_arquivo in caminho_base.rglob('*'):
        # Verifica se é um arquivo e se a extensão está na nossa lista
        if caminho_arquivo.is_file() and caminho_arquivo.suffix.lower() in extensoes_alvo:
            # Cria o novo caminho trocando a extensão para .webp
            caminho_webp = caminho_arquivo.with_suffix('.webp')
            
            # Pula se a versão .webp já existir para não refazer trabalho
            if caminho_webp.exists():
                print(f"Ignorado (já existe): {caminho_webp.name}")
                continue

            try:
                # Abre a imagem original e salva como WebP
                with Image.open(caminho_arquivo) as img:
                    # Converte para RGB se for RGBA (PNG transparente) ou Palette, 
                    # o formato WebP suporta transparência nativamente, mas 
                    # dependendo do arquivo original, garantir o modo correto ajuda.
                    img.save(caminho_webp, 'webp', quality=qualidade)
                
                print(f"Convertido: {caminho_arquivo.name} -> {caminho_webp.name}")
                arquivos_convertidos += 1
                
                # Descomente a linha abaixo se quiser DELETAR a imagem original após converter
                # os.remove(caminho_arquivo) 
                
            except Exception as e:
                print(f"Erro ao converter {caminho_arquivo.name}: {e}")

    print(f"\nConversão concluída! {arquivos_convertidos} novas imagens .webp criadas.")

if __name__ == "__main__":
    # Você pode ajustar o nome da pasta se necessário e a qualidade (0 a 100)
    converter_para_webp(pasta_raiz='public', qualidade=80)