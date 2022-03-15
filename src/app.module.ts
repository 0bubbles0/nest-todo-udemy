import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "*****",
      password: "*****",
      database: "udemy-nest-task-management",
      autoLoadEntities: true, // auto finds/loads entity files
      synchronize: true, // always keeps db-schema in sync})],
    }),
  ],
})
export class AppModule {}
