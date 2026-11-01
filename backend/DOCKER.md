# HVAVAN Skin Docker Configuration

## Структура Docker

### Dockerfile

```
Stage 1: Builder
- Установка зависимостей
- Генерация Prisma Client
- Сборка приложения

Stage 2: Production
- Минимальный образ
- Non-root пользователь
- Запуск приложения
```

### docker-compose.yml

```yaml
services:
  app:
    build: .
    environment:
      - DATABASE_URL
      - JWT_SECRET
      # ... остальные переменные
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
```

## Запуск

### Build и запуск

```bash
docker-compose up -d
```

### Просмотр логов

```bash
docker-compose logs -f
```

### Остановка

```bash
docker-compose down
```

### Пересборка

```bash
docker-compose up -d --build
```

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| NODE_ENV | environment (development, production) |
| PORT | Порт сервера (3000) |
| DATABASE_URL | Подключение к Neon PostgreSQL |
| DIRECT_URL | Прямое подключение для миграций |
| JWT_SECRET | Секрет для JWT токенов |
| JWT_EXPIRES_IN | Время жизни токена (7d) |
| CORS_ORIGIN | Разрешенные источники |
| UDS_API_URL | URL API UDS |
| UDS_API_KEY | Ключ API UDS |

## Проблемы

### Проблема: Контейнер не подключается к Neon

**Решение**: Убедитесь, что DATABASE_URL корректен и Neon позволяет подключения.

### Проблема: Миграции не применяются

**Решение**: Проверьте DIRECT_URL и убедитесь, что схема валидна.