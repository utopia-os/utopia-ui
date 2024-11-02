import * as React from 'react'
import { Item } from '../../types'
import * as PropTypes from 'prop-types'
import { useEffect } from 'react'

export const ItemForm = ({
  children,
  item,
  title,
  setPopupTitle,
}: {
  children?: React.ReactNode
  item?: Item
  title?: string
  setPopupTitle?: React.Dispatch<React.SetStateAction<string>>
}) => {
  useEffect(() => {
    setPopupTitle && title && setPopupTitle(title)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  return (
    <div>
      {children
        ? React.Children.toArray(children).map((child) =>
            React.isValidElement<{ item: Item; test: string }>(child)
              ? React.cloneElement(child, { item, test: 'test' })
              : '',
          )
        : ''}
    </div>
  )
}

ItemForm.propTypes = {
  children: PropTypes.node,
  __TYPE: PropTypes.string,
}

ItemForm.defaultProps = {
  __TYPE: 'ItemForm',
}
