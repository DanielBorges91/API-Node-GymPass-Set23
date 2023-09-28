import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
// import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    // const prismaUserRepository = new PrismaUserRepository()
    // const registerUseCase = new RegisterUseCase(prismaUserRepository)
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe_test@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHasshed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHasshed).toBe(true)
  })
})
