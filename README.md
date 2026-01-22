# BO7EN - front

Este é o frontend da aplicação desenvolvido com **Next.js 16** e **Turbopack**.

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jdiassdev/seletiva-front.git

   ```

2. Abra a pasta o projeto

   ```bash
   cd seletiva-front
   ```

3. Instale as dependências: Este projeto utiliza o pnpm-lock.yaml, portanto o uso do pnpm é recomendado:

   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```

4. Caso nao tenha .env ou .env.local considere criar ele e adicionar as seguintes variaveis

   ```bash
   NEXT_PUBLIC_URL_LARAVEL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_URL_TMDB=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_TOKEN=
   ```

5. Para adquirir o token da API (TMDB):
   1. Crie uma conta em The Movie Database (TMDB).
   2. Acesse as configurações de API no seu perfil.
   3. Gere um "API Read-Only Access Token".
   4. Substitua no seu arquivo .env:

   ```bash
   NEXT_PUBLIC_TMDB_TOKEN={{seu_token_api}}
   ```

6. Rode o projeto

   ```bash
      pnpm dev
      # ou
      npm run dev
   ```

   # Abra http://localhost:3000 no seu navegador para ver o resultado.
