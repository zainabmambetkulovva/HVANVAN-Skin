# HVAVAN Skin Backend

Backend API для платформы HVAVAN Skin - коммерческой платформы для продажи косметики и управления сетью магазинов.

## Технологический стек

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: Neon PostgreSQL (облачная БД)
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

## Структура проекта

```
backend/
├── prisma/
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Миграции базы данных
├── src/
│   ├── config/             # Конфигурация
│   ├── modules/            # Модули приложения
│   │   ├── auth/          # Аутентификация и авторизация
│   │   ├── users/         # Управление пользователями
│   │   ├── roles/         # Управление ролями
│   │   ├── permissions/   # Управление разрешениями
│   │   ├── branches/      # Управление филиалами
│   │   ├── products/      # Управление товарами
│   │   ├── categories/    # Управление категориями
│   │   ├── brands/        # Управление брендами
│   │   ├── inventory/     # Складской учёт
│   │   ├── favorites/     # Избранное
│   │   ├── cart/          # Корзина
│   │   ├── orders/        # Заказы
│   │   ├── payments/      # Платежи
│   │   ├── refunds/       # Возвраты
│   │   ├── promotions/    # Промо-коды и акции
│   │   ├── uds/           # Программа лояльности UDS
│   │   ├── reviews/       # Отзывы
│   │   ├── consultations/ # Консультации
│   │   ├── notifications/ # Уведомления
│   │   ├── cms/           # Управление контентом
│   │   ├── analytics/     # Аналитика
│   │   └── audit/         # Журнал действий
│   ├── common/             # Общие модули
│   │   ├── decorators/    # Кастомные декораторы
│   │   ├── guards/        # Guards (JWT, Roles)
│   │   ├── filters/       # Filters (Exceptions)
│   │   ├── interceptors/  # Interceptors (Logging, Response transform)
│   │   ├── middleware/    # Middleware
│   │   └── utils/         # Утилиты
│   ├── database/           # Модуль базы данных
│   ├── app.module.ts       # Корневой модуль
│   └── main.ts             # Точка входа
├── test/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## Требования

- Node.js 20+
- npm
- Docker и Docker Compose (для контейнеризации)
- Программа Neon PostgreSQL (для базы данных)

## Установка и запуск

### Установка зависимостей

```bash
cd backend
npm install
```

### Настройка переменных окружения

Создайте файл `.env` в директории `backend/` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните переменные:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database - Neon PostgreSQL
DATABASE_URL=postgresql://<user>:<password>@<host>.neon.tech/<database>?sslmode=require
DIRECT_URL=postgresql://<user>:<password>@<host>.neon.tech/<database>?sslmode=require

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=*

# UDS Integration
UDS_API_URL=<uds-api-url>
UDS_API_KEY=<uds-api-key>
```

### Запуск миграций

```bash
# Генерация Prisma Client
npx prisma generate

# Создание и применение миграций
npx prisma migrate dev --name init

# Или для production
npx prisma migrate deploy
```

### Запуск локального сервера

```bash
# В режиме разработки
npm run start:dev

# В продакшене
npm run build
npm run start:prod
```

### Запуск с Docker

```bash
# Сборка и запуск контейнера
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка контейнера
docker-compose down
```

## API Documentation

После запуска сервера, Swagger документация доступна по адресу:

```
http://localhost:3000/api/v1/docs
```

## Health Check

```bash
curl http://localhost:3000/api/v1/health
```

## Миграции

В проекте используется Prisma Migrate для управления схемой базы данных.

### Создание новой миграции

```bash
npx prisma migrate dev --name <migration_name>
```

### Применение миграций в production

```bash
npx prisma migrate deploy
```

## Основные модули

| Модуль | Описание |
|--------|----------|
| auth | Аутентификация JWT, регистрация, вход |
| users | Управление пользователями (CRUD) |
| roles | Управление ролями (admin, manager, client) |
| permissions | Управление разрешениями |
| branches | Управление филиалами |
| products | Управление товарами и категориями |
| inventory | Складской учёт и операции |
| orders | Управление заказами |
| payments | Обработка платежей и webhook |
| refunds | Возвраты денег |
| promotions | Промо-коды и акции |
| uds | Интеграция с программой лояльности |
| reviews | Отзывы и рейтинги |
| notifications | Уведомления (WhatsApp, Push) |
| cms | Управление контентом и баннерами |
| analytics | Аналитика и отчёты |
| audit | Журнал действий сотрудников |

## Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены используются для аутентификации
- Генерация idempotency ключей для платежей
- Проверка ролей и разрешений
- CORS защита
- Валидация входящих данных

## Разработка

### Линтинг и форматирование

```bash
npm run lint
npm run format
```

### Тесты

```bash
# Unit тесты
npm run test

# Тесты с покрытием
npm run test:cov
```

## Структура Prisma Schema

Схема включает 43 модели:

- Users & Authentication (users, user_auth_providers, user_sessions, verification_codes)
- Employees & Access (employee_profiles, roles, permissions, user_roles)
- Branches & Inventory (branches, product_inventory, inventory_transactions)
- Products & Catalog (products, brands, categories, product_images)
- Orders & Payments (orders, order_items, payments, refunds)
- Promotions & UDS (promotions, promo_codes, uds_accounts, uds_transactions)
- Reviews & Consultations (reviews, consultations, skin_tests)
- Notifications & CMS (notifications, banners, content_pages)
- Audit & System (audit_logs, system_settings)

## Проблемы и решение

### Проблема: Подключение к Neon PostgreSQL

**Решение**: Убедитесь, что переменные `DATABASE_URL` и `DIRECT_URL` корректны и включают SSL режим.

### Проблема: Prisma Client не генерируется

**Решение**: Выполните `npx prisma generate` после настройки DATABASE_URL.

## Поддержка

Для вопросов и проблем обращайтесь к команде разработки.