import { config } from '@/config'

type InvitingProfileResponse = [
  {
    item: string
  },
]

export class InviteApi {
  async validateInvite(inviteId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${config.apiUrl}/flows/trigger/${config.validateInviteFlowId}?secret=${inviteId}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) return null

      const data = (await response.json()) as InvitingProfileResponse

      return data[0].item
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Error fetching inviting profile:', error)
      if (error instanceof Error && error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('An unknown error occurred while fetching the inviting profile.')
      }
    }
  }

  async redeemInvite(inviteId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${config.apiUrl}/flows/trigger/${config.redeemInviteFlowId}?secret=${inviteId}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) return null

      const data = (await response.json()) as InvitingProfileResponse

      return data[0].item
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Error fetching inviting profile:', error)
      if (error instanceof Error && error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('An unknown error occurred while fetching the inviting profile.')
      }
    }
  }
}
