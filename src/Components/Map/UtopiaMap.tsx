import { UtopiaMapProps } from '../../types'
import { ContextWrapper } from '../AppShell/ContextWrapper'
import { UtopiaMapInner } from './UtopiaMapInner'
import 'react-toastify/dist/ReactToastify.css'

function UtopiaMap(props: UtopiaMapProps) {
  return (
    <ContextWrapper>
      <UtopiaMapInner {...props} />
    </ContextWrapper>
  )
}

export { UtopiaMap }
