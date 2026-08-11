# Esqueleto do site

Landing page da Associação de Pais com um Google Form publicado e ligado à folha de respostas.

## Ver localmente

Na raiz do projeto, iniciar um servidor estático, por exemplo:

```powershell
python -m http.server 8000
```

Depois abrir `http://localhost:8000/site/`.

O vídeo horizontal e o vertical são selecionados de acordo com a orientação do ecrã. Os ficheiros são lidos da pasta `out/`.

## Link permanente do QR

Usar este endereço no QR de inscrição:

`https://associacao-pais-pardilho.pages.dev/socio`

A página é servida diretamente em `/socio/`. Quando existir um domínio definitivo,
adicionar o novo destino ao ficheiro `_redirects`; o QR impresso continua válido.

## Antes de publicar

- Criar a política de privacidade e definir o período de conservação dos dados.
- Substituir o email de exemplo e completar os contactos.
- Integrar o pagamento MB WAY da Ifthenpay numa fase posterior.
- Publicar os vídeos e restantes recursos em caminhos adequados ao alojamento final.
