# Архитектура Backend HVAVAN Skin

## Обзор

Backend HVAVAN Skin построен на архитектуре NestJS с использованием Prisma ORM и Neon PostgreSQL в качестве базы данных.

## Архитектурные принципы

### Разделение ответственности

Проект разделён на слои:

```
API Layer (Controllers)
    ↓
Service Layer (Business Logic)
    ↓
Data Layer (Prisma ORM)
```

### Модульная структура

Каждая бизнес-область представлена отдельным модулем:

```typescript
@Module({
  imports: [PrismaModule],
  controllers: [XController],
  providers: [XService],
  exports: [XService],
})
export class XModule {}
```

## Слои приложения

### 1. Controllers (API Layer)

Ответственные за обработку HTTP запросов, валидацию входящих данных и передачу в сервисы.

```typescript
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.productsService.findAll(query);
  }
}
```

### 2. Services (Business Logic)

Содержат всю бизнес-логику, взаимодействие с базой данных через Prisma и вызов внешних API.

```typescript
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: FindAllDto) {
    // Business logic
    return this.prisma.product.findMany({ where });
  }
}
```

### 3. Data Layer (ORM)

Используется Prisma ORM для взаимодействия с PostgreSQL.

```typescript
@Injectable()
export class PrismaService extends PrismaClient {}
```

## API Design

### REST API

API следует REST принципам:

- `GET /api/v1/products` - получение списка
- `GET /api/v1/products/:id` - получение одного
- `POST /api/v1/products` - создание
- `PATCH /api/v1/products/:id` - обновление
- `DELETE /api/v1/products/:id` - удаление

### Versioning

API использует версионирование в URL:

```
/api/v1/...
/api/v2/...
```

### Response Format

Единый формат ответов:

```json
{
  "data": {},
  "statusCode": 200,
  "message": "Success"
}
```

## Аутентификация и авторизация

### JWT Authentication

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }
}
```

### Roles Guard

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.roles;
  }
}
```

## Обработка ошибок

### Global Exception Filter

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const status = exception.getStatus();
    const message = exception.getResponse()['message'];

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
```

## Конфигурация

### Конфигурационный модуль

```typescript
@Injectable()
export class AppConfiguration {
  app = {
    port: this.config.get<number>('PORT', 3000),
    apiPrefix: this.config.get<string>('API_PREFIX', 'api/v1'),
    env: this.config.get<string>('NODE_ENV', 'development'),
  };

  database = {
    url: this.config.get<string>('DATABASE_URL'),
  };
}
```

## Интеграции

### Платёжные сервисы

Архитектура поддерживает интеграцию с несколькими платёжными провайдерами:

```typescript
@Module({
  imports: [ConfigModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
```

### UDS Integration

```typescript
@Injectable()
export class UDSService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string) {
    const udsAccount = await this.prisma.udsAccount.findUnique({ where: { userId } });
    return { balance: udsAccount.balance };
  }
}
```

## Масштабируемость

### Horizontal Scaling

Backend может масштабироваться горизонтально:

- Multiple instances behind load balancer
- Redis для сессий (не включено в текущую версию)
- CDN для статических файлов (не включено)

### Database Scaling

Neon PostgreSQL автоматически масштабируется и поддерживает:

- Serverless architecture
- Branching для разработки
- Auto-scaling

## Безопасность

### Input Validation

```typescript
class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  basePrice: number;
}
```

### SQL Injection Protection

Prisma ORM использует parameterized queries для защиты от SQL injection.

### XSS Protection

NestJS автоматически экранирует HTML в JSON ответах.

## Мониторинг

### Logging

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    res.on('finish', () => {
      const elapsed = Date.now() - startTime;
      this.logger.log(`${req.method} ${req.url} - ${elapsed}ms`);
    });
    next();
  }
}
```

### Health Check

```typescript
@Get('health')
health() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}
```

## CI/CD Pipeline

### Build

```bash
npm ci
npm run build
```

### Test

```bash
npm run test
npm run test:cov
```

### Deploy

```bash
docker build -t hvavan-skin-backend .
docker push hvavan-skin-backend
```