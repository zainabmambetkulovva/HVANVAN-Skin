# HVAVAN Skin API Documentation

## Обзор

API следует REST принципам и использует версионирование.

## Versioning

```
/api/v1/...
```

## Аутентификация

Все защищённые endpoints требуют Bearer Token:

```
Authorization: Bearer <access_token>
```

## Response Format

```json
{
  "data": {},
  "statusCode": 200,
  "message": "Success"
}
```

## Ошибки

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint",
  "message": "Error message"
}
```

## Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Регистрация |
| POST | /api/v1/auth/login | Вход |
| POST | /api/v1/auth/refresh | Обновление токена |
| POST | /api/v1/auth/logout | Выход |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users/me | Профиль |
| PATCH | /api/v1/users/me | Обновление профиля |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/products | Список товаров |
| GET | /api/v1/products/:id | Товар |
| POST | /api/v1/products | Создание |
| PATCH | /api/v1/products/:id | Обновление |
| DELETE | /api/v1/products/:id | Удаление |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/orders | Создание заказа |
| GET | /api/v1/orders | Список заказов |
| GET | /api/v1/orders/my | Мои заказы |
| GET | /api/v1/orders/:id | Заказ |
| PATCH | /api/v1/orders/:id | Обновление |
| PATCH | /api/v1/orders/:id/status | Статус |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/payments | Создание платежа |
| GET | /api/v1/payments | Платежи |
| GET | /api/v1/payments/:id | Платёж |
| POST | /api/v1/payments/webhook | Webhook |

### Refunds

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/refunds | Возврат |
| GET | /api/v1/refunds | Возвраты |
| GET | /api/v1/refunds/:id | Возврат |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/reviews | Отзыв |
| GET | /api/v1/reviews | Отзывы |
| GET | /api/v1/reviews/:id | Отзыв |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/notifications | Уведомления |
| GET | /api/v1/notifications/unread | Непрочитанные |
| PATCH | /api/v1/notifications/:id/read | Прочитать |

## Swagger

Документация доступна по адресу:

```
/api/v1/docs
```