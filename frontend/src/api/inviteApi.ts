import { config } from '@/config'

interface InvitingProfileResponse {
  id: string
}

export class inviteApi {
  async getInvitingProfileId(inviteId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${config.apiUrl}/flows/trigger/${config.validateInviteFlowId}/${inviteId}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        return null
      }

      const data = (await response.json()) as InvitingProfileResponse

      return data.id
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

  async validateInvite(inviteId: string): Promise<boolean> {
    const invitingProfileId = await this.getInvitingProfileId(inviteId)

    return invitingProfileId !== null
  }

  async redeemInvite(inviteId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${config.apiUrl}/flows/trigger/${config.redeemInviteFlowId}/${inviteId}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      return response.ok
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
