import {
  isEntity,
  TypeormApp,
  TypeormAppCreator,
  TypeormEntity,
  TypeormEntityRegisterer,
  TypeormOptions,
} from "../app/typeorm.app";
import { ModuleRegisterer } from "@istanbul/app";
import { DataSource } from "typeorm";

const entities = new Set<TypeormEntity>();

export const createTypeorm: TypeormAppCreator = (
  options: TypeormOptions
): TypeormApp => {
  if (
    options.entities &&
    Array.isArray(options.entities) &&
    options.entities.length > 0
  ) {
    options.entities.forEach((entity) => {
      if (isEntity(entity)) {
        entities.add(entity);
      }
    });
  }
  return {
    build() {
      return {
        name: "typeorm",
        version: "0.0.1",
        install: async () => {
          const dataSource = new DataSource({
            ...options,
            entities: Array.from(entities),
          });
          await dataSource.initialize();
        },
      };
    },
  };
};

export const registerEntity: TypeormEntityRegisterer = (
  entity: TypeormEntity
): ModuleRegisterer => {
  return {
    install() {
      entities.add(entity);
    },
  };
};
