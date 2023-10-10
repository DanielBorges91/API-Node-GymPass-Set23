import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-se-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { undefined } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}