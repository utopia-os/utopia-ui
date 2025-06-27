import { useAuth } from '#components/Auth/useAuth'

import { useItems } from './useItems'

export const useMyProfile = () => {
  const items = useItems()
  const user = useAuth().user

  // Find the user's profile item
  const myProfile = items.find(
    (item) => item.layer?.userProfileLayer && item.user_created?.id === user?.id,
  )

  return myProfile
}
