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
   NEXT_PUBLIC_TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiIyZjQxMmI5ZGFlNGJhYzVmMDg4ZWMyYjc4MzNlMzkyMyIsIm5iZiI6MTc2OTAzODc1NC43MDcsInN1YiI6IjY5NzE2M2EyYjZjNzZkOGNiMDc3NDYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrS825kTj5c2D9SZdgRPiPczvBHCLRmgTtHhNav6Eyg
   ```

5. Rode o projeto

   ```bash
      pnpm dev
      # ou
      npm run dev
   ```

   # Abra http://localhost:3000 no seu navegador para ver o resultado.
