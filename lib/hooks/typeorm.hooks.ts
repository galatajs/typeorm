import {
  TypeormApp,
  TypeormAppCreator,
  TypeormEntity,
  TypeormEntityRegisterer,
  TypeormOptions,
} from "../app/typeorm.app";
import { App, ModuleRegisterer } from "@istanbul/app";
import { DataSource } from "typeorm";

const entities = new Map<string, TypeormEntity>();

export const createTypeorm: TypeormAppCreator = (
  options: TypeormOptions
): TypeormApp => {
  return {
    build() {
      return {
        name: "typeorm",
        version: "0.0.1",
        install: async (app: App) => {
          const dataSource = new DataSource({
            ...options,
            entities: Array.from(entities.values()),
          });
          for (const [key, entity] of entities.entries()) {
            const repository = dataSource.getRepository(entity);
            app.store.provide(key, repository);
          }
          await dataSource.initialize();
        },
      };
    },
  };
};

export const registerEntity: TypeormEntityRegisterer = (
  key: string,
  entity: TypeormEntity
): ModuleRegisterer => {
  entities.set(key, entity);
  return {
    key,
  };
};
