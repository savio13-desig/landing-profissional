# Landing de captação para profissional (amostra novapicks)

Demonstração para vender a contadores, engenheiros, personal trainers, nutricionistas e outros profissionais. HTML, CSS e JavaScript puros, sem build e sem servidor. Marca, números, preços e depoimentos são fictícios (contadora "Prisma Contabilidade").

## Páginas
- `index.html` — página de captação: hero com formulário curto, faixa de números, dores, serviços, como funciona, **diagnóstico de 3 perguntas** que recomenda um plano, planos, depoimentos, perfil do profissional, perguntas frequentes e formulário final. Barra fixa de WhatsApp no celular.
- `leads.html` — painel: contatos com origem (diagnóstico, formulário), situação (novo, contatado, reunião, proposta, cliente, perdido), taxa de conversão, WhatsApp, exportação CSV e contatos de exemplo.
- `cartao.html` — cartão digital: WhatsApp, e-mail, página, **salvar contato no celular (.vcf)** e QR da página, com impressão.
- `apresentacao.html` — proposta comercial (valores de exemplo).

## Medição de anúncios
O formulário e o diagnóstico disparam eventos em `window.dataLayer` (`generate_lead` e `quiz_complete`, com origem e plano). Basta instalar o Google Tag Manager ou o Pixel da Meta na página para contar contatos e custo por contato. Nenhum script de rastreamento é carregado na amostra.

## Adaptar para outro profissional
Edite `js/dados.js` (marca, nome, registro, WhatsApp, título, números, dores, serviços, passos, planos, depoimentos e perguntas) e as cores em `css/estilo.css` (`:root`). As perguntas e a regra do diagnóstico ficam em `js/app.js` (`perguntas` e `recomenda`).

## Rodar local
```
python -m http.server 8768
```
Abra http://localhost:8768/apresentacao.html

## Limitações desta amostra
- Os contatos ficam no navegador (localStorage, em `js/leads.js`). A página e o painel só se enxergam no mesmo aparelho e navegador. A versão final grava num banco online, avisa o profissional por WhatsApp ou e-mail e coloca login no painel.
- Depoimentos, números e valores são exemplos. Em um cliente real, usar só dados verdadeiros e respeitar as regras de publicidade do conselho da profissão (para advogados, médicos e outros, a OAB e o CFM restringem promessas e depoimentos).
- `vendor/qrcode.js`: qrcode-generator 1.4.4 (Kazuhiko Arase, licença MIT).
