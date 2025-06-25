export const config = {
  apiUrl: String(import.meta.env.VITE_API_URL ?? 'https://api.utopia-lab.org'),
  validateInviteFlowId: String(
    import.meta.env.VITE_VALIDATE_INVITE_FLOW_ID ?? '01d61db0-25aa-4bfa-bc24-c6a8f208a455',
  ),
  redeemInviteFlowId: String(import.meta.env.VITE_REDEEM_INVITE_FLOW_ID ?? 'todo'),
}
