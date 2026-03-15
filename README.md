# 🏥 SM Saúde e Seguros Institucional - Documentação de Produto e Negócios

Bem-vindo à documentação oficial de Produto e Negócios da plataforma institucional da **SM Saúde e Seguros**. Este documento visa detalhar o funcionamento prático de cada recurso implementado, o modelo estratégico, e as regras de negócio que orientam a aplicação, fornecendo total clareza para as áreas de Negócios e Produto.

---

## 🎯 1. Modelo de Estratégia e Persona

A arquitetura e o design da plataforma foram desenvolvidos com um foco estrito em **conversão e usabilidade objetiva**. Todas as decisões visuais e funcionais foram desenhadas para atrair e converter a persona primária do negócio:

- **Persona Alvo (Carlos):** Homem, com idade entre 25 a 65 anos, de perfil conservador e com alto poder aquisitivo (*High Net Worth*).
- **Geografia Principal:** Sorocaba, São Paulo (Capital) e Vale do Paraíba.
- **Design System:**
  - **Minimalismo Elegante:** A identidade visual é forte, utilizando o gradiente oficial da marca que vai do Verde (`#009D51`) ao Azul (`#2D1BFF`).
  - **Tipografia:** A fonte global da aplicação é a *Josefin Sans*, transmitindo clareza e elegância em todas as resoluções, desde monitores largos até telas pequenas de smartphones (ex: larguras de 375px).
- **Princípio de Arquitetura da Informação:** O site funciona como uma Landing Page objetiva. A organização da informação é linear e feita para guiar "Carlos" sem distrações até o objetivo de conversão.
  - *Exemplo Prático:* O link "Área do Cliente" foi explicitamente e permanentemente removido do cabeçalho de navegação (desktop e mobile) para evitar fugas no funil de vendas.

---

## 💻 2. Visão do Cliente (Front-end / Landing Page)

Esta seção detalha a experiência voltada ao usuário final, focando na aquisição e conversão de novos clientes.

### 2.1. Navegação Dinâmica e Call-to-Action (Header)
- **Como Funciona:** O menu superior do site é gerido dinamicamente via banco de dados (tabela `menu_items`). O administrador pode adicionar, reordenar ou remover links sem precisar de desenvolvimento extra.
- **Regra de Negócio (CTA):** O botão principal do menu ("Cotar Agora") funciona como o grande direcionador de vendas. Caso o administrador não configure um destino, ele encaminha por padrão para a plataforma *Aggilizador* (`https://smsaudesegurosltda.aggilizador.com.br/`).

### 2.2. Componentes de Conteúdo (Hero, Sobre, Depoimentos, FAQ)
- **Visão Geral:** Todo o "corpo" de vendas do site (banner de entrada *Hero*, a história da empresa *Sobre*, as provas sociais *Depoimentos* e as *FAQs*) é perfeitamente editável via CMS do administrador.
- **Performance de Imagens:** Para garantir que a página carregue rapidamente – algo vital para não perder clientes exigentes – todas as imagens passam por uma otimização/compressão invisível no navegador do cliente (suportando os formatos modernos *WebP* e *AVIF*, além de *JPG* e *PNG*) antes de serem salvas no *Supabase Storage* (bucket `app-smsaudeeseguros-institucional`).

### 2.3. Modal de Soluções e Formulário Dinâmico (Captura de Leads)
- **A Experiência:** A seção de "Serviços/Soluções" lista as ofertas da corretora em cards. Ao clicar em um serviço, o sistema pode abrir um formulário de coleta de dados (Modal) ou redirecionar o usuário diretamente.
- **Configuração de Ação (`action_type`):** O administrador controla a regra do card. É possível configurar o texto dos botões, links de destino, e as opções do formulário (ex: chave para troca entre pessoa física e "Pessoa Jurídica/CNPJ").
- **Flexibilidade Estratégica (Metadados):** O formulário de coleta no banco de dados (`tabela leads`) utiliza uma estrutura flexível (JSONB). Isso significa que, sem quebrar o sistema, a área de negócios pode optar por pedir "Número de Vidas" de um seguro saúde empresarial, ou "Valor do Veículo" de um seguro auto, gravando as respostas como dados complementares (metadados).
- **Usabilidade (Máscaras de Input):** Para diminuir atritos no preenchimento, campos como Telefone, CNPJ e Valores (Moeda) são mascarados e formatados em tempo real na tela do cliente (`lib/masks.ts`).

### 2.4. Qualidade de Lead e Bloqueio de Bots (reCAPTCHA Invisível)
- **Valor para o Negócio:** Evita que a equipe comercial perca tempo prospectando contatos falsos e robôs.
- **Funcionamento Técnico:** O sistema utiliza o **Google reCAPTCHA v3 Invisível**. O comportamento do usuário (ex: movimentos de mouse, tempo de clique) é pontuado em background. Se a pontuação indicar um ser humano, o lead é registrado no banco de dados e repassado aos vendedores. Tudo isso sem pedir ao cliente para "selecionar as imagens de semáforos".

### 2.5. Pontos de Contato Flutuantes (WhatsApp e Footer)
- **Componente WhatsApp:** Há um botão flutuante de contato na tela. Ele possui uma animação discreta para chamar a atenção, que inteligentemente pausa caso o cliente abra um menu no celular, evitando confusão visual.
- **Especialistas Diretos:** A página de contato e o footer conectam o lead diretamente com os sócios/especialistas (WhatsApp de Matheus e Silvio), cujos telefones são configuráveis no painel administrativo.
- **Credibilidade Adicional (ReclameAqui):** No rodapé, o preenchimento da URL do ReclameAqui via CMS gera automaticamente um selo/badge de credibilidade, fundamental para reforçar a segurança para o perfil "Carlos".

---

## ⚙️ 3. Visão do Administrador (CMS / Backoffice)

O painel de controle (Backoffice) acessível em `/admin` proporciona total autonomia para Produto, Marketing e Vendas manipularem os ativos digitais da empresa.

### 3.1. Governança de Acesso e Layout
- **Autenticação:** O acesso exige credenciais validadas via Supabase Auth.
- **Interface Otimizada:** As telas administrativas adotam 100% da largura da página (`w-full`), substituindo layouts centralizados. Isso dá mais espaço para editar textos longos e gerenciar colunas de dados.
- **Design de Formulários:** Para recursos booleanos (Ligar/Desligar uma funcionalidade), a interface utiliza o padrão de design dos sistemas móveis (iOS/Android): o rótulo explicativo da função fica à esquerda, e a chave (Switch/Toggle de "Sim" ou "Não") fica alinhada totalmente à direita.
- **Segurança Operacional (Primeiro Login):** Ao criar uma nova conta administrativa (ex: com a senha temporária inicial `mudar123`), o sistema capta esse acesso via *Edge Middleware* (`proxy.ts`) e **força obrigatoriamente** o usuário a criar uma nova senha pessoal antes de acessar qualquer painel administrativo. A recuperação de senhas é feita por *Magic Link* via email.

### 3.2. Caixa de Entrada do Comercial (Leads)
- **Centralização:** A seção de leads lista detalhadamente todos os formulários preenchidos.
- **Histórico e Atribuição:** O painel exibe um registro claro de quais administradores interagiram ou assumiram o lead.
  - *Detalhe Técnico:* Como a arquitetura separa os dados corporativos do tráfego público usando *Row Level Security (RLS)* restrito, o cruzamento de "quem foi o vendedor que atendeu" exige que a interface una dados da tabela de `leads` com a tabela de perfis internos (`profiles`) ativamente em tempo real.

### 3.3. Configurações Globais e Branding (Site Config)
- **Central de Identidade:** O menu de Configurações centraliza variáveis críticas (`tabela site_config`).
- **Recursos Editáveis:**
  - Identidade: URL do Logotipo e Favicon/Imagens OpenGraph.
  - Vendas: Redirecionamento padrão do "Cotar Agora" (`cta_link`).
  - Redes Sociais: Links de Instagram, Facebook e LinkedIn da marca.
  - Telefones Fixos: Contato e suporte via WhatsApp parametrizado (Matheus e Silvio).

### 3.4. Motor de Integração em Tempo Real (Webhook / n8n)
- **Automação de Vendas:** Tão importante quanto capturar é *entregar* o lead velozmente à equipe. Assim que o cliente submete o formulário, a plataforma dispara um pacote de dados automático (um *Webhook* Assíncrono) para a ferramenta de automação da empresa (ex: **n8n**). O destino é alimentado diretamente pelo campo `webhook_n8n_url` do painel.
- **Auditoria, Triggers e Logs Técnicos (`webhook_logs`):**
  - Para garantir a rastreabilidade (ex: se o sistema do n8n cair e o comercial não receber o lead), o sistema possui uma tela de administração de logs no painel.
  - **Eficiência de Banco de Dados:** Para evitar que o sistema fique lento com o acúmulo infinito de logs antigos, existe um **Gatilho de Banco de Dados (Database Trigger)** que limita a tabela `webhook_logs` a manter rigorosamente apenas as **100 execuções mais recentes**, apagando as antigas de forma automática e independente.

---

## 🛠️ 4. Resumo de Premissas Técnicas para Engenharia
*(Para alinhamento entre Produto e o time Técnico)*

1. **Stack Core:** O portal foi concebido usando **Next.js 16 (App Router)** e **React 19**, com design em **Tailwind CSS 3**. O Banco de Dados e Autenticação são providos nativamente pelo **Supabase**.
2. **Dados em Tempo Real vs Cache:** Todas as páginas internas do backoffice de administradores (`app/admin/**/*.tsx`) possuem uma flag obrigatória (`export const dynamic = 'force-dynamic'`) que impede o Next.js de fazer "cache estático" das páginas, garantindo que Produto e Vendas sempre vejam a informação atualizada instantaneamente.
3. **Gerenciador de Dependências e Segurança:** Utiliza-se `npm`. As chaves de acesso do Supabase (`URL`, `ANON_KEY`, `BUCKET`) são armazenadas privadamente no `.env` sem a flag `NEXT_PUBLIC_` para proteger credenciais, e expostas ao ambiente local do servidor através do objeto `env` no `next.config.mjs`. O projeto possui *fallback* se o ambiente de build estiver sem conexão para evitar crashes de compilação.
4. **Testes de Qualidade Visual:** Qualquer alteração na interface do usuário passa por uma etapa de auditoria visual através de rotinas do **Playwright** rodando em Python na porta 3001, registrando screenshots fotográficos para garantir que o comportamento em desktops e celulares (375px) permaneça esteticamente irretocável de acordo com as expectativas de negócios.