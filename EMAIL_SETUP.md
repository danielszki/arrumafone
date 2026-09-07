# Configuração do envio de avaliações por e-mail

O formulário da rota `/avaliacao` envia os dados para a API externa do ArrumaFone. A API usa o Resend para entregar a mensagem por e-mail. A chave do Resend fica somente no servidor; ela nunca é enviada para o navegador.

## 1. Criar a conta e a chave do Resend

1. Crie uma conta em [resend.com](https://resend.com).
2. Gere uma API key com permissão de envio.
3. Verifique o domínio que será usado como remetente. Em testes, o Resend pode limitar o remetente ao endereço de onboarding da conta.

## 2. Configurar a API/serverless

No ambiente onde `artifacts/api-server` estiver publicado, configure estas variáveis:

```env
RESEND_API_KEY=re_...
EVALUATION_TO_EMAIL=pixbarralinks@gmail.com
EVALUATION_FROM_EMAIL=ArrumaFone <contato@seu-dominio-verificado.com>
EVALUATION_ALLOWED_ORIGINS=https://danielszki.github.io
```

`RESEND_API_KEY` é segredo e deve ser adicionado pelo gerenciador de Secrets do provedor, nunca no código ou no GitHub Pages. O endereço `EVALUATION_TO_EMAIL` é o destinatário de todas as avaliações.

O endpoint usado pelo formulário é:

```text
POST https://seu-endpoint-publico.example.com/api/evaluations
```

O servidor não armazena os dados: valida o formulário e encaminha cada envio para o Resend.

## 3. Configurar o site estático

No ambiente de build do GitHub Pages, crie a variável pública `VITE_EVALUATION_API_URL` com a URL base da API, sem a barra final:

```env
VITE_EVALUATION_API_URL=https://seu-endpoint-publico.example.com/api
```

Essa URL pode ser pública. Ela não contém senha nem chave de API. O workflow usa essa variável somente durante o build do frontend.

## 4. Teste de produção

Depois de configurar as variáveis:

1. Publique/reinicie a API e confirme `GET /api/healthz`.
2. Abra `/avaliacao` no site do GitHub Pages.
3. Preencha todos os campos e envie.
4. Confirme a mensagem de sucesso no site e a chegada do e-mail com o assunto `Nova avaliação recebida - ArrumaFone`.

Se o envio falhar, o formulário mostra o erro e continua disponível para uma nova tentativa.