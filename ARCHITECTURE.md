# Архитектура проекта Easymetric Landing

В проекте используется **модульная архитектура**, адаптированная под особенности **Next.js App Router (React Server Components)**. Бизнес-логика и интерфейс разделены на независимые функциональные блоки (секции лендинга), а системные папки роутинга остаются максимально плоскими и тонкими.

---

## Структура папок

```text
├── app/                        # Только роутинг, разметка страниц и глобальные стили
│   ├── layout.tsx              # Корневой лейаут (шрифты, мета-теги, провайдеры)
│   ├── page.tsx                # Главная страница (просто собирает модули воедино)
│   └── globals.css             # Стили Tailwind v4
│
├── components/                 # Общие UI-компоненты (без бизнес-логики)
│   ├── providers.tsx           # Клиентские провайдеры (Theme, Toaster, Smooth Scroll)
│   └── ui/                     # Атомарные компоненты (кнопки, инпуты, диалоги из Shadcn)
│       └── button.tsx
│
├── modules/                    # Фичи и разделы лендинга (бизнес-логика)
│   ├── hero/                   # Простой модуль (статический или только верстка)
│   │   └── index.tsx           # Server Component (входная точка)
│   │
│   ├── pricing/                # Пример интерактивного модуля
│   │   ├── index.tsx           # Server Component (обертка секции)
│   │   ├── pricing-card.tsx    # Внутренний компонент секции
│   │   └── pricing-toggle.tsx  # Client Component ("use client") для переключения тарифов
│   │
│   └── contact-form/           # Модуль с формой обратной связи
│       ├── index.tsx           # Server Component (разметка секции)
│       ├── form-client.tsx     # Client Component с формой (состояние, валидация)
│       ├── actions.ts          # Server Actions для отправки данных (API-логика)
│       └── types.ts            # Специфичные для модуля типы
│
├── lib/                        # Утилиты и конфигурации внешних сервисов
│   └── utils.ts                # Хелпер cn для Tailwind классов
│
├── hooks/                      # Глобальные кастомные хуки
└── types/                      # Глобальные типы TypeScript
```

---

## Ключевые правила разработки

### 1. Серверные компоненты по умолчанию (RSC)
Все секции в папке `modules/` по умолчанию должны быть **Server Components**. Они рендерятся на сервере, не отправляют лишний JavaScript на клиент и обеспечивают высокую скорость загрузки (LCP).
*Исключение:* если компоненту необходимы интерактивные хуки (`useState`, `useEffect`, `useRef`), его нужно вынести в отдельный файл внутри модуля и добавить в начало директиву `"use client"`.

### 2. Принцип «Тонкой страницы» ([app/page.tsx](file:///Users/saveliy/Documents/Saveliy/IT/Projects/easymetric/code/easymetric-landing-fe/app/page.tsx))
Страницы в папке `app/` не должны содержать верстку секций или логику. Они выступают только в роли конфигураторов структуры:

```tsx
import { Hero } from "@/modules/hero";
import { Pricing } from "@/modules/pricing";
import { ContactForm } from "@/modules/contact-form";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Pricing />
      <ContactForm />
    </main>
  );
}
```

### 3. Локализация контекста провайдеров
Поскольку `layout.tsx` является Server Component, любые глобальные контексты (тема, тосты, аналитика) выносятся в отдельный клиентский компонент `components/providers.tsx` с директивой `"use client"` и импортируются в `layout.tsx`.

### 4. Независимость модулей
Модули в папке `modules/` должны стремиться к самодостаточности. 
* Если фича содержит специфичный тип, он кладется в `modules/<name>/types.ts`.
* Если фича делает запросы к серверу/бэкенду, они оформляются как **Server Actions** в `modules/<name>/actions.ts`.
* В идеале, удаление папки модуля не должно ломать остальное приложение (кроме явных импортов на страницах).
