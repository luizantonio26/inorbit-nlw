import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import fastifyCors from '@fastify/cors'
import { createCompletionRoute } from './routes/create-completion'
import { createGoalRoute } from './routes/create-goal'
import { getWeekPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)

const port = 3333
app
  .listen({
    port: port,
  })
  .then(() => {
    console.log(`HTTP Server running on ${port}`)
  })
