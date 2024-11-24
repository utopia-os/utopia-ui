import { ContextWrapper } from '#components/AppShell/ContextWrapper'

import { UtopiaMapInner } from './UtopiaMapInner'

import type { UtopiaMapProps } from '#types/UtopiaMapProps'

// eslint-disable-next-line import/no-unassigned-import
import 'react-toastify/dist/ReactToastify.css'

function UtopiaMap(props: UtopiaMapProps) {
  return (
    <ContextWrapper>
      <UtopiaMapInner {...props} />
    </ContextWrapper>
  )
}

export { UtopiaMap }
