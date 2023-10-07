import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
