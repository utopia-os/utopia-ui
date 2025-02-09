/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PopupStartEndInput } from '#components/Map'

import type { Item } from '#src/types/Item'

export const ProfileStartEndForm = ({
  item,
  setState,
}: {
  item: Item
  setState: React.Dispatch<React.SetStateAction<any>>
}) => {
  return (
    <PopupStartEndInput
      item={item}
      showLabels={false}
      updateEndValue={(e) =>
        setState((prevState) => ({
          ...prevState,
          end: e,
        }))
      }
      updateStartValue={(s) =>
        setState((prevState) => ({
          ...prevState,
          start: s,
        }))
      }
    ></PopupStartEndInput>
  )
}
