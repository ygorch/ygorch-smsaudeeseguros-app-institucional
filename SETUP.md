# Configuração do Projeto SM Saúde e Seguros

## 1. Instalação
Certifique-se de ter o Node.js instalado.
```bash
npm install
```

## 2. Configuração do Supabase
Para que o formulário de contato e outras funcionalidades dinâmicas funcionem, você precisa configurar o Supabase:

1. Crie um projeto no [Supabase](https://supabase.com).
2. Copie o arquivo `.env.example` para `.env.local`.
   ```bash
   cp .env.example .env.local
   ```
3. Preencha as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os dados do seu projeto Supabase.

## 3. Link do Sistema AGGER
Atualize o link do sistema AGGER no arquivo `lib/constants.ts` quando tiver a URL correta.

## 4. Rodando o Projeto
```bash
npm run dev
```

## 5. Deploy
O projeto está pronto para ser hospedado na Vercel. Basta conectar seu repositório Git.
