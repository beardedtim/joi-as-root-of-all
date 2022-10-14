import { JSONSchemaFaker, Schema } from 'json-schema-faker'
import faker from '@faker-js/faker'
import Chance from 'chance'

import {
  compile,
  JSONSchema,
  Options as TSCompileOPtions,
} from 'json-schema-to-typescript'

import parse from 'joi-to-json'

import Joi from 'joi'

export const init = () => {
  JSONSchemaFaker.extend('faker', () => faker)
  JSONSchemaFaker.extend('chance', () => new Chance())
}

export const joiToSchema = (schema: Joi.Schema) => parse(schema) as Schema

export const schemaToData = (config: {
  schema: Schema
  refs?: Schema[]
  schemaDir?: string
}) =>
  config.schemaDir
    ? JSONSchemaFaker.resolve(config.schema, config.refs, config.schemaDir)
    : Promise.resolve(JSONSchemaFaker.generate(config.schema, config.refs))

export const schemaToType = (config: {
  schema: JSONSchema
  name: string
  args?: TSCompileOPtions
}) => compile(config.schema, config.name, config.args)
