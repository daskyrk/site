import { CoreModule } from '@/core/core.module';
import { FeatureModule } from './feature/feature.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CoreModule,
    FeatureModule,
  ],
})
export class AppModule {}
