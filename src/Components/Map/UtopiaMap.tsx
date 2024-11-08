import { ContextWrapper } from '#components/AppShell/ContextWrapper'
import { UtopiaMapProps } from '#src/types'

import { UtopiaMapInner } from './UtopiaMapInner'
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
