import { CorePluginCreator, ModuleRegisterer } from "@istanbul/app";
import { DataSourceOptions, EntitySchema } from "typeorm";

export interface TypeormApp extends CorePluginCreator {}

export type TypeormOptions = DataSourceOptions;

export type TypeormEntity = Function | EntitySchema;

export function isEntity(entity: any): entity is TypeormEntity {
  return typeof entity === "function" || entity instanceof EntitySchema;
}

export type TypeormAppCreator = (options: TypeormOptions) => TypeormApp;
export type TypeormEntityRegisterer = (
  key: string,
  entity: TypeormEntity
) => ModuleRegisterer;
