import { init, schemaToData, schemaToType, joiToSchema } from './src'
import Joi from 'joi'

const main = async () => {
  await init()

  const joiSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .description('The email of the user to create'),
    password: Joi.string()
      .min(6)
      .max(50)
      .required()
      .description('Plaintext password of the user to create'),
  })

  const jsonSchema = joiToSchema(joiSchema)

  console.dir(jsonSchema)

  const data = await schemaToData({ schema: jsonSchema })

  console.dir(data)

  const type = await schemaToType({
    schema: jsonSchema,
    name: 'UserCreate',
    args: {
      additionalProperties: false,
    },
  } as any)

  console.dir(type)
}

main()
