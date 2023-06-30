import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/graphql', graphqlHTTP({
    graphiql: true
  }))

  await app.listen(3000);
}
bootstrap();
