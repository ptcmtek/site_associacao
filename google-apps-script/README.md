# Ligação do formulário ao Google Sheets

Este script recebe as inscrições do site e acrescenta uma linha na folha
`Inscrições` do ficheiro Google Sheets criado na conta `karlos.analyst@gmail.com`.

## Publicar no Google Apps Script

1. Abra a nova Google Sheet.
2. Escolha **Extensões → Apps Script**.
3. Substitua o conteúdo de `Code.gs` pelo conteúdo deste ficheiro `Code.gs`.
4. Guarde o projeto.
5. Execute manualmente a função `setupWebhookSecret` e autorize o acesso pedido.
6. Copie o valor `WEBHOOK_SECRET` apresentado no registo de execução.
7. Escolha **Implementar → Nova implementação → Aplicação Web**.
8. Configure **Executar como: Eu** e **Quem tem acesso: Qualquer pessoa**.
9. Publique e copie o URL terminado em `/exec`.

O valor a configurar no Cloudflare Pages será:

```text
URL_DA_APLICACAO/exec?token=WEBHOOK_SECRET
```

Guardar esse URL no projeto Cloudflare Pages como a variável secreta
`REGISTRATION_WEBHOOK_URL`. Depois deve ser feita uma nova implementação do site
e uma inscrição de teste.
