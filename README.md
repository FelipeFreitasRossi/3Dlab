<!-- ═══════════════════════════════════════════════════════════════
     PEDRA LUNAR — 3D LAB
     README principal do repositório
     ═══════════════════════════════════════════════════════════════ -->

<div align="center">

<img src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg" alt="Pedra Lunar — 3D Lab" width="140" height="140" style="border-radius: 50%;" />

# ✦ Pedra Lunar — 3D Lab

### *Objetos únicos, feitos camada por camada.*

Loja de produtos fabricados por **impressão 3D**, com identidade visual premium, catálogo dinâmico e atendimento direto via WhatsApp.

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

<br/>

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)](#-status-do-projeto)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#-licença)
[![Deploy](https://img.shields.io/badge/deploy-Render%20%2B%20Atlas-46E3B7?style=flat-square)](#-deploy)

</div>

---

## 📖 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Demonstração](#-demonstração)
- [Arquitetura](#-arquitetura)
- [Stack tecnológica](#-stack-tecnológica)
- [Funcionalidades](#-funcionalidades)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como rodar localmente](#-como-rodar-localmente)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [API Reference](#-api-reference)
- [Painel administrativo](#-painel-administrativo)
- [Design System](#-design-system)
- [Deploy](#-deploy)
- [Roadmap](#-roadmap)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🌑 Sobre o projeto

**Pedra Lunar — 3D Lab** nasceu da ideia de que objetos funcionais também podem ser peças de design. O site é a vitrine digital da marca: um catálogo interativo de produtos impressos em 3D, com identidade visual minimalista, tecnológica e premium.

> *"Quero um site com efeitos de scroll e interação com o cliente, com uma grid de fundo com efeito degradê."* — requisito original do cliente

### Objetivos principais

| Objetivo | Status |
|:---|:---:|
| Grid de fundo com degradê animada | ✅ |
| Efeitos de scroll e revelação de conteúdo | ✅ |
| Catálogo dinâmico com busca e filtros | ✅ |
| Integração com WhatsApp para fechamento de compra | ✅ |
| Painel administrativo para o lojista | ✅ |
| Suporte a **PT-BR** e **EN-US** | ✅ |
| Tema claro e escuro | ✅ |
| Totalmente responsivo (mobile-first) | ✅ |

---

## 🎬 Demonstração

> 🚧 Em breve: link de produção e screenshots.

**Site em produção:** *(a ser publicado)*
**Painel admin:** *(a ser publicado)*

### Preview das seções

- **Hero** com tipografia editorial e grid de fundo animada
- **Catálogo** com 8 produtos demo, busca instantânea e filtros por categoria
- **Modal de produto** com galeria de imagens e miniaturas
- **Depoimentos** em carrossel 3D arrastável
- **Header** com sidebar mobile e menu animado
- **Configurações** flutuantes para idioma e tema

## 🛠 Stack tecnológica

---

### Frontend

<table>
<tr>
<td valign="top" width="50%">

**Core**
- [React 19](https://react.dev) — biblioteca de UI
- [TypeScript 5](https://www.typescriptlang.org) — tipagem estática
- [Vite 8](https://vitejs.dev) — bundler e dev server

**Estilo**
- CSS Modules — escopo local por componente
- CSS custom properties (design tokens)
- Grid, Flexbox, `clamp()`

</td>
<td valign="top" width="50%">

**Utilitários**
- [lucide-react](https://lucide.dev) — ícones SVG
- SVG inline para ícones de marca (WhatsApp, Instagram, TikTok)

**Sem dependências pesadas**
- Zero Tailwind, zero styled-components
- Zero Framer Motion (animações em CSS puro + IntersectionObserver)
- Zero libs de carrossel

</td>
</tr>
</table>

### Backend

<table>
<tr>
<td valign="top" width="50%">

**Core**
- [Python 3.13](https://www.python.org)
- [FastAPI 0.115](https://fastapi.tiangolo.com) — framework web
- [Uvicorn](https://www.uvicorn.org) — ASGI server

**Banco**
- [Motor 3.6](https://motor.readthedocs.io) — driver async do MongoDB
- [MongoDB Atlas](https://www.mongodb.com/atlas) — plano M0 gratuito
- **GridFS** — armazenamento de imagens no próprio banco

</td>
<td valign="top" width="50%">

**Admin**
- [Jinja2](https://jinja.palletsprojects.com) — templates HTML
- [Starlette SessionMiddleware](https://www.starlette.io/middleware/) — cookies assinados
- HTML/CSS/JS puro no painel (sem React)

**Segurança**
- `secrets.compare_digest` — comparação de senha resistente a timing attacks
- CORS restrito à origem do frontend
- Validação de MIME type nas imagens
- GridFS bucket com limite de 8 MB por arquivo

</td>
</tr>
</table>

---

## ✨ Funcionalidades

### 🎨 Experiência visual

- [x] **Grid de fundo com degradê** via CSS `mask-image` (zero imagens, zero canvas)
- [x] **Efeitos de scroll** com `IntersectionObserver` (sem listener por pixel)
- [x] **Parallax** em orbs de luz (5 camadas independentes)
- [x] **Aurora cônica** que gira conforme o scroll
- [x] **Scroll progress** em CSS variable (`--scroll-progress`) manipulada via `requestAnimationFrame`
- [x] **Reveal** com direção configurável e stagger automático
- [x] **Carrossel 3D** de depoimentos com drag, momentum e auto-advance
- [x] **Modal** de produto com galeria e transição de entrada/saída
- [x] **Sidebar mobile** com slide-in e stagger nos links
- [x] **Loading screen** com fade-out automático
- [x] **WhatsApp float** com pop-in após 2s

### 🛒 Catálogo

- [x] Lista dinâmica de produtos da API
- [x] **Busca** por nome e descrição (case-insensitive)
- [x] **Filtros** por categoria (Decoração, Utilidades, Personalizados, Protótipos)
- [x] **Grid responsiva** (1/2/3 colunas)
- [x] **Modal** com galeria de imagens, features e CTA WhatsApp
- [x] **Fallback** para dados locais se a API estiver fora
- [x] **Loading state** com skeleton shimmer
- [x] **Empty state** com CTA "Limpar filtros"

### 🌍 Internacionalização

- [x] Sistema de tradução **PT-BR / EN-US**
- [x] **~100 chaves** traduzidas em ambas as línguas
- [x] **Preferência persistida** em `localStorage`
- [x] **Tradução de dados dinâmicos**: produtos têm campos `_en` opcionais
- [x] Fallback automático para PT se o campo EN estiver vazio
- [x] `<html lang>` atualizado dinamicamente

### 🎨 Temas

- [x] **Tema escuro** (padrão — identidade da marca)
- [x] **Tema claro** com `[data-theme="light"]`
- [x] Todas as cores em CSS custom properties
- [x] Preferência persistida em `localStorage`

### ♿ Acessibilidade

- [x] `prefers-reduced-motion` respeitado em todas as animações
- [x] `aria-label` em todos os botões de ícone
- [x] **Foco visível** em todos os elementos interativos
- [x] Navegação por **teclado** (Esc fecha modais, setas navegam o carrossel)
- [x] **Contraste** mínimo de 4.5:1
- [x] **Restauração de foco** ao fechar modais
- [x] `aria-live` em regiões dinâmicas

### 🔐 Painel administrativo

- [x] **Login** com senha (env var `ADMIN_PASSWORD`)
- [x] **Sessão** via cookie assinado (8h de duração)
- [x] **CRUD** completo de produtos
- [x] **Upload** de até 6 imagens por produto (drag & drop)
- [x] **Edição** preservando imagens existentes
- [x] **Preview** em tempo real das imagens antes do upload
- [x] **Modal** de confirmação de exclusão
- [x] **Toast** notifications (sucesso/erro)
- [x] **Busca** instantânea na lista
- [x] **Stats** (produtos, categorias, status da API)
- [x] **Favicon** personalizado
- [x] **Link "Ver site"** no header


## 🚀 Como rodar localmente

### Pré-requisitos

- **Node.js** ≥ 20 ([download](https://nodejs.org))
- **Python** ≥ 3.11 ([download](https://www.python.org))
- **Git** ([download](https://git-scm.com))
- **MongoDB Atlas** — conta gratuita em [cloud.mongodb.com](https://cloud.mongodb.com)

### 1. Clonar o repositório

git clone https://github.com/SEU-USUARIO/3Dlab.git
cd 3Dlab

cd backend

# Criar ambiente virtual
python -m venv .venv

# Ativar (Windows)
.venv\Scripts\activate

# Ativar (macOS/Linux)
source .venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

Rodar o servidor:
uvicorn app.main:app --reload --port 8000

✅ Pronto:

API: http://localhost:8000

Docs interativa: http://localhost:8000/docs

Health check: http://localhost:8000/api/health

Painel admin: http://localhost:8000/admin


# Configurar variáveis de ambiente
copy .env.example .env
# Edite .env com sua MONGO_URI do Atlas

cd frontend

# Instalar dependências
npm install

# Configurar variáveis
copy .env.example .env
# Padrão já aponta para http://localhost:8000

# Rodar dev server
npm run dev

✅ Pronto: http://localhost:5173

⚠️ Importante: o site só funciona com os dois rodando ao mesmo tempo. Se a API cair, o frontend mostra o fallback com os 8 produtos demo e um aviso discreto.

🔑 Variáveis de ambiente
Frontend — frontend/.env
Variável	Exemplo	Obrigatória	Descrição
VITE_API_URL	http://localhost:8000
Backend — backend/.env
Variável	Exemplo	Obrigatória	Descrição
MONGO_URI	mongodb+srv://user:pass@cluster.mongodb.net/pedra_lunar_db
MONGO_DB_NAME	pedra_lunar_db	
FRONTEND_ORIGIN	http://localhost:5173	
ADMIN_PASSWORD	(senha forte)	
SECRET_KEY	(token aleatório)
🔐 Segurança: nunca commite o .env real. Use .env.example como template. Se um .env for vazado, rotacione todas as credenciais imediatamente.

📡 API Reference
Endpoints públicos
Método	Rota	Descrição
GET	/api/health	Status da API + conexão com MongoDB
GET	/api/products	Lista todos os produtos
GET	/api/products/{id}	Retorna um produto específico
GET	/api/images/{file_id}	Serve uma imagem do GridFS
Endpoints protegidos (/admin/api/*)
Método	Rota	Descrição
POST	/admin/api/login	Autentica (form-data: password)
POST	/admin/api/logout	Encerra a sessão
GET	/admin/api/me	Verifica se está autenticado
POST	/admin/api/products	Cria produto (form-data + upload)
PUT	/admin/api/products/{id}	Atualiza produto
DELETE	/admin/api/products/{id}	Remove produto + imagens
Exemplo de resposta — GET /api/products

[
  {
    "id": "vaso-orbita",
    "name": "Vaso Órbita",
    "category": "decoracao",
    "shortDescription": "Vaso geométrico com superfície facetada.",
    "longDescription": "O Vaso Órbita nasce de uma malha facetada...",
    "features": ["Altura: 22 cm", "Material: PLA"],
    "price": 89.9,
    "badge": "Novo",
    "accent": "rgba(180, 190, 220, 0.22)",
    "leadTimeDays": 5,
    "image": "http://localhost:8000/api/images/671a...",
    "images": [
      "http://localhost:8000/api/images/671a...",
      "http://localhost:8000/api/images/671b..."
    ],
    "name_en": "Orbit Vase",
    "shortDescription_en": "Geometric vase with faceted surface."
  }
]

🎛 Painel administrativo
Acesse http://localhost:8000/admin (ou a URL do deploy).

Fluxo
Login com a senha definida em ADMIN_PASSWORD

Dashboard com formulário de cadastro à esquerda e lista à direita

Novo produto: preencha campos obrigatórios (PT) e opcionais (EN)

Imagens: arraste ou clique — até 6 arquivos, a primeira vira capa

Salvar: toast de confirmação + lista atualiza

Editar: clique no ícone de lápis → campos preenchem → salve

Excluir: clique no ícone de lixeira → confirme no modal

Tradução opcional
Cada produto tem uma seção colapsável "🇺🇸 English translation". Se você preencher, o site mostra o texto traduzido quando o idioma for inglês. Se deixar vazio, o site cai no PT automaticamente.

🎨 Design System
Todas as variáveis em frontend/src/styles/tokens.css.

Paleta de cores (tema escuro)
Token	Valor	Uso
--color-bg	#0a0a0b	Fundo principal (preto mineral)
--color-bg-elevated	#101013	Cards, panels
--color-surface	#16161a	Inputs, superfícies
--color-text	#f0f0f2	Texto principal
--color-text-muted	#9a9aa3	Texto secundário
--color-text-subtle	#5f5f68	Texto terciário
--color-accent	#e6e6eb	Acento prateado
--color-border	rgba(255,255,255,0.06)	Bordas sutis
Escala tipográfica
--fs-xs (12px) → --fs-sm (14px) → --fs-base (16px) → --fs-lg (18px) → --fs-xl (22px) → --fs-2xl (28px) → --fs-3xl (40px) → --fs-4xl (56px) → --fs-5xl (clamp 44-76px)

Escala de espaçamento (4px base)
--space-1 (4px) → --space-2 (8px) → --space-3 (12px) → ... → --space-10 (128px)

Grid de fundo
--grid-size: 64px;               /* espaçamento das linhas */
--grid-line-opacity: 0.055;      /* intensidade */
--grid-fade-radius-x: 75%;       /* fade horizontal */
--grid-fade-radius-y: 65%;       /* fade vertical */

☁️ Deploy
Backend → Render
MongoDB Atlas: já configurado (plano M0 gratuito)

Network Access: libere 0.0.0.0/0 (ou IPs do Render)

No Render:

New → Web Service

Conecte o repositório GitHub

Root Directory: backend

Runtime: Python 3

Build Command: pip install -r requirements.txt

Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

Environment Variables:
MONGO_URI=...
MONGO_DB_NAME=pedra_lunar_db
FRONTEND_ORIGIN=https://seu-site.vercel.app
ADMIN_PASSWORD=...
SECRET_KEY=...

✅ Concluído
☑ Frontend com identidade visual completa
☑ Grid de fundo com degradê
☑ Efeitos de scroll e parallax
☑ Catálogo com busca e filtros
☑ Modal de produto com galeria
☑ Carrossel 3D de depoimentos
☑ Sistema i18n PT-BR / EN-US
☑ Tema claro / escuro
☑ Painel admin (CRUD + upload)
☑ Integração MongoDB + GridFS
☑ Favicon personalizado
☑ Sidebar mobile animada
🔄 Em andamento
□ Deploy em produção (Render + Vercel)
□ Ajustes finais de responsividade mobile
📋 Próximas iterações
□ Substituir produtos demo pelos reais
□ Adicionar Instagram e TikTok reais em src/data/site.ts
□ Implementar página /admin editando categorias
□ Bulk actions (excluir múltiplos produtos)
□ Analytics (eventos de clique no WhatsApp)
□ PWA (offline-first + install prompt)
□ Testes unitários (Vitest + Playwright)
🤝 Contribuição
Este é um projeto pessoal, mas sugestões são bem-vindas.

Fork o projeto

Crie uma branch: git checkout -b feature/nova-funcionalidade

Commit: git commit -m "feat: adiciona nova funcionalidade"

Push: git push origin feature/nova-funcionalidade

Abra um Pull Request

Convenção de commits
Prefixo	Uso
feat:	Nova funcionalidade
fix:	Correção de bug
docs:	Documentação
style:	Formatação (sem mudança de lógica)
refactor:	Refatoração (sem mudança de comportamento)
chore:	Tarefas de build, dependências, etc.
📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

MIT License

Copyright (c) 2026 Pedra Lunar — 3D Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

📬 Contato
<div align="center">
Pedra Lunar — 3D Lab


📧 E-mail: feliperossidev.gmail.com


<img src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg" alt="Logo" width="60" height="60" style="border-radius: 50%;" />
<sub>© 2026 Pedra Lunar — 3D Lab. Todos os direitos reservados.</sub>

<sub>Feito com precisão, camada por camada. 🌑</sub>

</div>
<!-- ═══════════════════════════════════════════════════════════════ FIM DO README ═══════════════════════════════════════════════════════════════ -->
