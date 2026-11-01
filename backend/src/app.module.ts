import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { BranchesModule } from '@modules/branches/branches.module';
import { ProductsModule } from '@modules/products/products.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { BrandsModule } from '@modules/brands/brands.module';
import { InventoryModule } from '@modules/inventory/inventory.module';
import { FavoritesModule } from '@modules/favorites/favorites.module';
import { CartModule } from '@modules/cart/cart.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { RefundsModule } from '@modules/refunds/refunds.module';
import { PromotionsModule } from '@modules/promotions/promotions.module';
import { UDSModule } from '@modules/uds/uds.module';
import { ReviewsModule } from '@modules/reviews/reviews.module';
import { ConsultationsModule } from '@modules/consultations/consultations.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { CMSModule } from '@modules/cms/cms.module';
import { AnalyticsModule } from '@modules/analytics/analytics.module';
import { AuditModule } from '@modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    BranchesModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    InventoryModule,
    FavoritesModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    RefundsModule,
    PromotionsModule,
    UDSModule,
    ReviewsModule,
    ConsultationsModule,
    NotificationsModule,
    CMSModule,
    AnalyticsModule,
    AuditModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
