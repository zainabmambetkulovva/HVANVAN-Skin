# HVAVAN Skin Database Schema

## Техническое описание базы данных

**Проект:** HVAVAN Skin  
**СУБД:** Neon PostgreSQL  
**ORM:** Prisma  
**Версия:** 1.0  

## Обзор

База данных содержит 43 модели для хранения всей информации проекта:

- Пользователи и авторизация (users, auth_providers, sessions, roles, permissions)
- Филиалы и склад (branches, inventory, transactions)
- Товары и каталог (products, brands, categories, images)
- Заказы и платежи (orders, payments, refunds)
- Промо и UDS (promotions, promo_codes, uds_accounts, uds_transactions)
- Отзывы и консультации (reviews, consultations, skin_tests)
- Уведомления и CMS (notifications, banners, content_pages)
- Аналитика и аудит (analytics, audit_logs)

## Основные связи

### Пользователи - Заказы

```
User (1) ---< Orders (N)
```

### Товары - Инвентарь

```
Product (1) ---< ProductInventory (N)
Branch (1) ---< ProductInventory (N)
```

### Заказы - Платежи

```
Order (1) ---< Payments (N)
Payment (1) ---< Refunds (N)
```

## Типы данных PostgreSQL

| Тип | Использование |
|-----|---------------|
| UUID | Первичные и внешние ключи |
| TEXT | Текстовые поля (без ограничения) |
| VARCHAR(n) | Строки с ограничением длины |
| NUMERIC(12,2) | Денежные значения |
| BOOLEAN | Логические значения |
| TIMESTAMPTZ | Время с временной зоной |
| JSONB | Структурированные данные |
| INET | IP-адреса |

## Важные ограничения

### Уникальные индексы

- users.phone
- users.email
- brands.name
- categories.slug
- products.slug
- products.sku
- permissions.code
- promo_codes.code

### Внешние ключи

Все связи настроены с `onDelete: Cascade` где применимо.

## Индексы

```sql
-- Users
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);

-- Products
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);

-- Orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- Payments
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_external_id ON payments(external_transaction_id);

-- Inventory
CREATE INDEX idx_inventory_product_branch ON product_inventory(product_id, branch_id);
```

## Миграции

### Создание миграции

```bash
npx prisma migrate dev --name <name>
```

### Применение миграции

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

## Тестирование схемы

```bash
# Проверка схемы
npx prisma validate

# Генерация Prisma Client
npx prisma generate
```