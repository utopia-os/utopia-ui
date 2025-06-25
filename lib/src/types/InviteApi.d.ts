export interface InviteApi {
  validateInvite(inviteId: string): Promise<string | null>
  redeemInvite(inviteId: string): Promise<string | null>
}
