import { CatModule } from './cats/cat.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    CatModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
