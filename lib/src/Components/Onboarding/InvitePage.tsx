import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth/useAuth'
import { MapOverlayPage } from '#components/Templates/MapOverlayPage'

import type { InviteApi } from '#types/InviteApi'

interface Props {
  inviteApi: InviteApi
}

/**
 * @category Onboarding
 */
export function InvitePage({ inviteApi }: Props) {
  const { isAuthenticated, loading: isLoadingAuthentication } = useAuth()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  if (!id) throw new Error('Invite ID is required')

  useEffect(() => {
    async function redeemInvite() {
      if (!id) throw new Error('Invite ID is required')

      const invitingProfileId = await inviteApi.redeemInvite(id)
      if (invitingProfileId) {
        toast.success('Invite redeemed successfully!')
        navigate(`/item/${id}`)
      } else {
        toast.error('Failed to redeem invite')
      }
      navigate('/')
    }

    if (isLoadingAuthentication) return

    if (isAuthenticated) {
      void redeemInvite()
      navigate('/')
    } else {
      // Save invite code in local storage
      localStorage.setItem('inviteCode', id)

      // Redirect to login page
      navigate('/login')
    }
  }, [id, isAuthenticated, inviteApi, navigate, isLoadingAuthentication])

  return (
    <MapOverlayPage backdrop className='tw:max-w-xs tw:h-fit'>
      <h2 className='tw:text-2xl tw:font-semibold tw:mb-2 tw:text-center'>Invitation</h2>
    </MapOverlayPage>
  )
}
