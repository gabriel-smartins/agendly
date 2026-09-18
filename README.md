# Agendly

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1.7-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe" alt="Stripe" />
</p>

Uma plataforma moderna de agendamento e descoberta de profissionais, desenhada para conectar clientes a serviços de qualidade com uma experiência elegante, direta e altamente conversacional.

O projeto funciona como um SaaS de agendamento, com dois grandes públicos em mente:

- clientes em busca de serviços e profissionais confiáveis
- prestadores e negócios que precisam organizar sua agenda, oferta e relacionamento

---

## ✨ Visão geral

O Agendly foi pensado como uma base sólida para um produto de agendamento digital com foco em:

- descoberta pública de prestadores e serviços
- gestão eficiente de agenda e disponibilidade
- autenticação segura e personalizada
- assinatura e planos para diferenciação de acesso
- UX premium com visual limpo e profissional

A aplicação combina landing page, busca, painel de gestão e fluxo de agendamento em um mesmo ecossistema, com arquitetura preparada para evoluir para um produto real de mercado.

---

## 🔗 Repositório e protótipo

- Repositório do projeto: https://github.com/gabriel-smartins/agendly.git
- Protótipo de referência (Figma): https://www.figma.com/design/TA8TCieYq6HyuV66fi3S1n/DevClinica?node-id=99-5270&t=eOfOov93rgEI6ApT-0
- Nome comercial: Agendly

> O Figma informado foi usado como referência visual para a direção do produto, mantendo a identidade do projeto alinhada ao protótipo de inspiração.

---

## 🧩 Decisões arquiteturais

### 1. App Router do Next.js

A aplicação foi estruturada com o App Router do Next.js 15, aproveitando os benefícios de:

- renderização server-side para conteúdo crítico
- organização por rotas e route groups
- melhor separação entre UI, dados e regras de negócio
- melhor escalabilidade para futuras features do produto

### 2. Prisma como base de persistência

O banco foi modelado com Prisma para trazer:

- tipagem forte em TypeScript
- migrações versionadas e rastreáveis
- manutenção mais simples de schema e relacionamento
- estrutura preparada para crescimento do produto

### 3. Autenticação robusta com Auth.js

A autenticação foi implementada com Auth.js / NextAuth v5 usando:

- login por email e senha
- login com GitHub
- login com Google
- JWT para persistência de sessão
- callbacks para expor o `user.id` ao contexto autenticado

Isso garante uma experiência segura, consistente e amigável para usuários finais.

### 4. Separação clara entre server e client

A arquitetura respeita a regra de manter dependências de Node e Prisma no servidor, evitando problemas de bundle e preservando a compatibilidade do App Router com as camadas corretas da aplicação.

### 5. Design system com consistência visual

A UI foi construída com Tailwind CSS e componentes reutilizáveis, trazendo uma linguagem visual uniforme para:

- página pública
- cards de busca
- formulários
- dashboard
- status de assinatura e planos

### 6. Produto orientado a SaaS real

Além da interface, a solução foi pensada para sustentar um produto em produção com:

- descoberta pública
- gestão de perfil
- agenda e serviços
- lembretes e agendamentos
- planos e assinar/expirar acesso
- ampliação para admin, relatórios e operação centralizada

---

## 🏗️ Stack tecnológica

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Radix UI
- React Hook Form
- Zod

### Backend e dados

- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth
- Stripe
- Cloudinary

### Qualidade e produtividade

- Biome
- Prettier
- TanStack Query
- Husky

---

## 🗃️ Modelagem do banco

A modelagem principal está centralizada em [prisma/schema.prisma](prisma/schema.prisma) e foi planejada para suportar um SaaS de agendamento com usuários, serviços, assinaturas e reuniões.

### Entidades principais

#### User

Representa o usuário que pode atuar como prestador, proprietário ou cliente.

Campos principais:

- `id`
- `name`
- `email`
- `emailVerified`
- `image`
- `password`
- `address`
- `phone`
- `status`
- `timezone`
- `stripe_customer_id`
- `times`
- `createdAt`
- `updatedAt`

Relacionamentos:

- `services`
- `appointments`
- `reminders`
- `subscription`
- `accounts`
- `sessions`

#### Service

Representa o serviço disponibilizado por um usuário.

Campos principais:

- `id`
- `name`
- `price`
- `duration`
- `status`
- `userId`
- `createdAt`
- `updatedAt`

#### Appointment

Registra o agendamento efetivado por um cliente.

Campos principais:

- `id`
- `name`
- `email`
- `phone`
- `appointementDate`
- `time`
- `serviceId`
- `userId`

#### Reminder

Permite a criação de lembretes e organização de compromissos.

#### Subscription

Estrutura de cobrança e planos de acesso.

Campos principais:

- `id`
- `status`
- `plan`
- `priceId`
- `userId`

#### Account / Session / VerificationToken

Estruturas obrigatórias para autenticação segura com Auth.js.

### Visão conceitual

```mermaid
classDiagram
    User --> Subscription
    User --> Service
    User --> Reminder
    User --> Appointment
    Service --> Appointment
    User --> Account
    User --> Session
```

> A base está pronta para evoluir com avaliações, disponibilidade por horário, mensagens automáticas, relatórios e administração multilocal.

---

## 🚀 Funcionalidades atuais

### Experiência pública

- landing page com narrativa clara e secções de conversão
- busca de profissionais e serviços
- cards de perfil com informações essenciais
- filtros de busca
- navegação responsiva e moderna

### Autenticação

- cadastro por e-mail e senha
- login por credenciais
- login com GitHub
- login com Google
- proteção de rotas e sessão ativa

### Dashboard do usuário

- visualização de serviços cadastrados
- gestão de lembretes
- gestão de agendamentos
- botão de compartilhamento de link para agendamento
- acesso a planos e assinatura

### Fluxo de pagamento

- estrutura pronta para assinaturas
- controle de status e bloqueios por plano
- integração com Stripe

---

## 📁 Estrutura do projeto

```text
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── src/
│   ├── app/
│   │   ├── (panel)/
│   │   ├── (public)/
│   │   └── api/
│   ├── components/
│   ├── generated/
│   ├── lib/
│   ├── providers/
│   └── utils/
├── .env.example
├── biome.json
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── .gitignore
└── ...
```

---

## 🛠️ Requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js 20+
- npm
- PostgreSQL
- Git
- credenciais de OAuth do GitHub e Google (opcional, para login social)
- chaves do Stripe e Cloudinary (opcional, conforme funcionalidade ativada)

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gabriel-smartins/agendly.git
cd agendly
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie o arquivo de ambiente local:

```bash
cp .env.example .env
```

Em seguida, edite o `.env` com os valores reais da sua instância.

#### Variáveis principais

```env
NODE_ENV=production
NEXT_PUBLIC_URL=http://localhost:3000
AUTH_SECRET=change-me
AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_BASIC=
STRIPE_PRO=
STRIPE_SUCCESS_URL=http://localhost:3000/dashboard/plans
STRIPE_CANCEL_URL=http://localhost:3000/dashboard/plans
STRIPE_SECRET_WEBHOOK_KEY=
```

### 4. Gere o Prisma Client

```bash
npx prisma generate
```

### 5. Execute as migrações

```bash
npx prisma migrate dev
```

Para ambiente de produção ou staging:

```bash
npx prisma migrate deploy
```

### 6. Inicie a aplicação

```bash
npm run dev
```

Acesse:

- http://localhost:3000

---

## 📜 Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate
npm run db:deploy
npm run db:studio
npm run stripe:listen
```

### Descrição dos scripts

- `dev`: inicia a aplicação em ambiente local
- `build`: gera Prisma, aplica migrações e monta a versão de produção
- `start`: inicia a build produzida
- `lint`: valida qualidade e padrões do código
- `typecheck`: valida tipos TypeScript
- `db:generate`: gera o client do Prisma
- `db:migrate`: cria e aplica migrações em desenvolvimento
- `db:deploy`: aplica migrações em produção/staging
- `db:studio`: abre o Prisma Studio
- `stripe:listen`: escuta eventos de webhook do Stripe localmente

---

## 🧭 Como o produto funciona

### Para clientes

1. Acessa a landing page e explora serviços.
2. Usa busca e filtros para encontrar profissionais ou soluções.
3. Visualiza informações do perfil e disponibilidade.
4. Seleciona horário e faz o agendamento.
5. Confirma a reserva e segue com a operação.

### Para prestadores

1. Cria conta ou faz login.
2. Completa perfil, endereço e serviços.
3. Configura agenda e valores.
4. Recebe agendamentos e organiza a rotina.
5. Mantém contato e lembretes no dashboard.

### Para gestão

O painel foi desenhado para centralizar:

- agenda e horários
- serviços ativos
- lembretes
- agendamentos
- status de assinatura
- fluxo de operação do negócio

---

## 🎨 Direção de UX e design

A aplicação foi desenhada para transmitir confiança e simplicidade, com foco em:

- legibilidade e contraste equilibrados
- layouts limpos e espaços bem definidos
- cards consistentes e previsíveis
- visual moderno e premium
- atenção ao fluxo de conversão e clareza de ação
- micro-interações suaves para reforçar qualidade percebida

Essa escolha visual ajuda a transformar a solução em um produto que parece pronto para uso real, com apresentação adequada para clientes e investidores.

---

## ✅ Boas práticas implementadas

- uso de server components e server actions quando pertinente
- separação clara entre camada de apresentação e regra de negócio
- autenticação centralizada e segura
- validação de dados com Zod
- modelagem versionada no Prisma
- proteção de rotas por contexto de autenticação
- componentes reutilizáveis para manter consistência visual

---

## 📈 Roadmap sugerido

A base atual já sustenta ampla evolução, com possibilidades como:

- painel administrativo completo
- disponibilidade por profissional e horário
- confirmação por e-mail e WhatsApp
- avaliações e reputação
- notificações e lembretes automáticos
- analytics e relatórios
- suporte multi-tenant
- internacionalização
- expansão para múltiplos modelos de negócio

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para colaborar:

1. Faça um fork do projeto.
2. Crie uma branch para a feature:

```bash
git checkout -b feature/minha-feature
```

3. Faça as alterações necessárias.
4. Valide com lint, typecheck e build.
5. Abra um pull request com uma descrição clara.

---

## 📄 Licença

MIT License

Copyright (c) 2026 Gabriel Martins

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🧠 Observações finais

O Agendly representa uma base sólida para um SaaS de agendamento com foco em experiência, escalabilidade e organização operacional. O código está estruturado para evoluir com segurança e manter uma identidade visual moderna, clara e profissional.
