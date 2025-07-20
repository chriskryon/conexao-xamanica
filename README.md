# 🌿 Diário Xamânico ✨

> Uma aplicação web moderna para registro e acompanhamento de jornadas espirituais e experiências xamânicas

## 📖 Sobre o Projeto

**Diário Xamânico** é uma plataforma digital intuitiva e elegante para documentar experiências espirituais, rituais e insights de práticas xamânicas. A aplicação oferece uma interface responsiva e acessível para usuários registrarem suas jornadas pessoais de crescimento espiritual.

### 🎯 Objetivo

Criar um espaço digital sagrado onde praticantes de xamanismo possam:
- Documentar suas experiências espirituais
- Acompanhar sua evolução pessoal
- Conectar-se com seu animal de poder
- Registrar insights e revelações
- Manter um histórico de suas jornadas

## 🚀 Principais Funcionalidades

### 🔐 Sistema de Onboarding Inteligente
- **Multi-etapas:** Cadastro dividido em 4 steps intuitivos
- **Validação em Tempo Real:** Feedback instantâneo com Zod + React Hook Form
- **Verificação de Email:** Checagem automática de disponibilidade
- **Upload de Foto:** Sistema de upload com preview
- **Data Picker Mobile:** Seletor de data otimizado para mobile com scroll

### 🌟 Perfil Astrológico Automático
- **Cálculo de Signo:** Baseado na data de nascimento
- **Descrições Personalizadas:** Informações detalhadas sobre cada signo
- **Integração Seamless:** Dados astrológicos integrados ao perfil

### 🏠 Dashboard Personalizado
- **Visão Geral:** Painel central com informações do usuário
- **Navegação Intuitiva:** Bottom navigation para mobile
- **Acesso Rápido:** Links diretos para principais funcionalidades

### 📱 Mobile-First Design
- **Responsivo:** Interface otimizada para todos os dispositivos
- **Touch-Friendly:** Componentes adaptados para touch
- **iOS Optimized:** Prevenção de zoom automático no iOS
- **Performance:** Carregamento rápido e transições suaves

## 🛠️ Stack Tecnológica

### Frontend Core
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes React reutilizáveis
- **[Iconify](https://iconify.design/)** - Biblioteca de ícones SVG
- **Design System Glassmorphism** - Estilo visual translúcido moderno

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Biblioteca de formulários performática
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[react-mobile-picker](https://github.com/adcentury/react-mobile-picker)** - Date picker otimizado para mobile

### Estado & Dados
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado leve
- **[Zustand Persist](https://github.com/roadmanfong/zustand-persist)** - Persistência automática do estado
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado do servidor

### Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código
- **[PostCSS](https://postcss.org/)** - Processador CSS

## 🎨 Design System

### Filosofia Visual
O design do Diário Xamânico segue os princípios do **Glassmorphism**, criando uma experiência visual moderna e espiritual:

#### 🌈 Paleta de Cores
```css
/* Cores Primárias */
--verde-xamanico: #2E4A2F    /* Verde da natureza */
--azul-mistico: #2C4A7E      /* Azul profundo espiritual */
--roxo-cosmos: #D6BCFA       /* Roxo cósmico suave */
--marrom-terra: #A67B5B      /* Marrom terroso */

/* Tons Neutros */
--branco-cristal: #F8FAFC    /* Branco cristalino */
--cinza-nebula: #E2E8F0      /* Cinza suave */
```

#### ✨ Efeitos Visuais
- **Glassmorphism Cards:** Fundo translúcido com blur effect
- **Gradientes Suaves:** Transições cromáticas naturais
- **Sombras Profundas:** Elevação visual com múltiplas camadas
- **Bordas Luminosas:** Highlights sutis com rgba

#### 📝 Tipografia
- **Font Stack:** System fonts para performance otimizada
- **Hierarquia Clara:** Tamanhos e pesos bem definidos
- **Legibilidade:** Contraste adequado para acessibilidade

### 🧩 Componentes

#### Cards Glassmorphism
```css
.card-glassmorphism {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(46, 74, 47, 0.2);
  border-radius: 20px;
}
```

#### Inputs Transparentes
```css
.input-glassmorphism {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6));
  border: 1.5px solid rgba(214, 188, 250, 0.3);
  backdrop-filter: blur(10px);
}
```

## 📱 Arquitetura Mobile-First

### Responsividade Inteligente
```css
/* Mobile First Approach */
.container {
  width: 100%;
  max-width: 384px; /* Mobile */
}

@media (min-width: 768px) {
  .container {
    max-width: 672px; /* Desktop */
  }
}
```

### Otimizações iOS
- **Font Size 16px:** Previne zoom automático
- **Touch Targets:** Mínimo de 44px para áreas tocáveis
- **Viewport Meta:** Configuração otimizada para Safari
- **Tap Highlight:** Desabilitado para melhor UX

### Scrollbar Customizada
```css
.scrollbar-stable {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: rgba(46, 74, 47, 0.5) transparent;
}
```

## 🔧 Estrutura do Projeto

```
src/
├── app/                      # App Router (Next.js 15)
│   ├── dashboard/           # Painel principal
│   ├── onboarding/          # Processo de cadastro
│   ├── perfil/              # Página de perfil
│   ├── historico/           # Histórico de jornadas
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Homepage
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── onboarding/          # Componentes do onboarding
│   │   ├── Step1.tsx        # Informações pessoais
│   │   ├── Step2.tsx        # Dados astrológicos
│   │   ├── Step3.tsx        # Jornada espiritual
│   │   ├── Step4.tsx        # Preferências
│   │   ├── StepRenderer.tsx # Renderizador de steps
│   │   └── OnboardingForm.tsx # Container principal
│   ├── bottom-navigation.tsx # Navegação inferior
│   ├── theme-provider.tsx   # Provider de tema
│   └── ui/                  # Componentes UI base
├── constants/               # Constantes da aplicação
├── hooks/                   # Custom hooks
├── lib/                     # Utilitários
├── providers/               # Context providers
├── schemas/                 # Esquemas de validação Zod
├── services/                # Serviços de API
├── stores/                  # Stores Zustand
├── types/                   # Tipos TypeScript
└── utils/                   # Funções utilitárias
```

## 🌟 Funcionalidades Técnicas Avançadas

### ⚡ Performance
- **Code Splitting:** Carregamento sob demanda de componentes
- **Image Optimization:** Next.js Image component otimizado
- **Bundle Analysis:** Análise de tamanho do bundle
- **Tree Shaking:** Eliminação de código não utilizado

### 🔒 Validação Robusta
```typescript
// Exemplo de schema Zod
const onboardingSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  bio: z.string().max(140, "Bio deve ter no máximo 140 caracteres"),
  animalPoder: z.enum(["lobo", "aguia", "urso", "outro"])
});
```

### 🎯 Estado Reativo
```typescript
// Store Zustand com persistência
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-storage' }
  )
);
```

### 🎨 Sistema de Transições
```css
/* Transições suaves entre steps */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## 🔄 Fluxo da Aplicação

### 1. Onboarding (4 Steps)
1. **Informações Pessoais:** Nome, email, foto
2. **Perfil Astrológico:** Data de nascimento, signo automático
3. **Jornada Espiritual:** Bio, animal de poder, experiências
4. **Preferências:** Estado civil, preferências pessoais

### 2. Dashboard
- Visão geral do perfil
- Acesso às funcionalidades principais
- Navegação para outras seções

### 3. Funcionalidades Futuras
- Registro de jornadas xamânicas
- Calendário lunar
- Biblioteca de conhecimento
- Comunidade de praticantes

## 🎭 Experiência do Usuário

### Princípios UX
- **Simplicidade:** Interface limpa e intuitiva
- **Feedback:** Resposta visual para todas as ações
- **Acessibilidade:** Suporte para leitores de tela
- **Performance:** Carregamento rápido e responsivo
- **Consistência:** Padrões visuais uniformes

### Microinterações
- Hover effects sutis
- Transições de página suaves
- Feedback de loading
- Validação em tempo real
- Animações de entrada

## 🚀 Inovações Técnicas

### Date Picker Mobile
Implementação customizada de seletor de data com scroll para mobile, substituindo o date picker nativo por uma experiência mais fluida.

### Glassmorphism Components
Sistema completo de componentes com efeito glassmorphism, incluindo cards, inputs, modais e navegação.

### Responsive State Management
Gerenciamento de estado que se adapta ao dispositivo, com diferentes comportamentos para mobile e desktop.

### Scroll Stable
Implementação de scrollbar estável que não causa mudanças de layout durante navegação entre páginas.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

<div align="center">
  <p>Feito com 💜 para a comunidade espiritual</p>
  <p>🌿 <em>"A jornada xamânica é um retorno ao lar da alma"</em> 🌿</p>
</div>
