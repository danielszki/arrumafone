# Configuração do envio de avaliações por e-mail

O formulário da rota `/avaliacao` envia os dados para a função de API do ArrumaFone na Vercel. A API usa o Resend para entregar a mensagem por e-mail. A chave do Resend fica somente no servidor; ela nunca é enviada para o navegador.

## 1. Criar a conta e a chave do Resend

1. Crie uma conta em [resend.com](https://resend.com).
2. Gere uma API key com permissão de envio.
3. Verifique o domínio que será usado como remetente. Em testes, o Resend pode limitar o remetente ao endereço de onboarding da conta.

## 2. Configurar a API no Vercel

O endpoint Express é publicado como função Vercel em `api/[...route].ts`. No projeto Vercel, configure:

```env
RESEND_API_KEY=re_...
EVALUATION_TO_EMAIL=pixbarralinks@gmail.com
EVALUATION_FROM_EMAIL=ArrumaFone <contato@seu-dominio-verificado.com>
EVALUATION_ALLOWED_ORIGINS=https://arrumafone.vercel.app
```

Adicione `RESEND_API_KEY` em **Vercel → Project Settings → Environment Variables**, selecione Production e Preview, e marque-a como segredo. Nunca coloque essa chave no código ou em variáveis públicas `VITE_*`. `EVALUATION_TO_EMAIL` é o destinatário das avaliações.

O formulário chama `/api/evaluations` no mesmo domínio Vercel. A chave do Resend permanece apenas no servidor.

```text
POST https://arrumafone.vercel.app/api/evaluations
```

O servidor não armazena os dados: valida o formulário e encaminha cada envio para o Resend.

## 3. Configurar o site Vercel

No projeto Vercel, configure estas variáveis públicas de build:

```env
VITE_EVALUATION_API_URL=/api
VITE_PUBLIC_SITE_URL=https://arrumafone.vercel.app
```

Para verificar o site no Google Search Console, crie uma propriedade de prefixo de URL e configure o código de verificação fornecido pelo Google como `VITE_GOOGLE_SITE_VERIFICATION`. O build injeta esse código no `<head>`; não é necessário colocá-lo no código-fonte.

## 4. Enviar o sitemap ao Search Console

Depois que o domínio Vercel estiver publicado e verificado:

1. Confirme que `/robots.txt` e `/sitemap.xml` no domínio Vercel retornam os arquivos corretos.
2. No Search Console, abra **Sitemaps** e envie `https://arrumafone.vercel.app/sitemap.xml`.
3. Teste `/avaliacao` diretamente no navegador.
4. Envie uma avaliação e confirme a chegada do e-mail com o assunto `Nova avaliação recebida - ArrumaFone`.

O mapa incorporado usa o endereço informado no site. Para aparecer como empresa local nos resultados do Google Maps, a ArrumaFone também precisa ter um Perfil da Empresa no Google verificado e com nome, telefone e endereço consistentes.