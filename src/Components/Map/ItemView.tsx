import * as React from 'react'
import { Item } from '../../types'
import * as PropTypes from 'prop-types'


export const ItemView = ({ children, item }: { children?: React.ReactNode, item?: Item }) => {
  return (
    <div>
      {children ?
        React.Children.toArray(children).map((child) =>
          React.isValidElement<{ item: Item }>(child) ?
            React.cloneElement(child, { item: item }) : ""
        ) : ""}
    </div>
  )
}

ItemView.propTypes = {
  children: PropTypes.node,
  __TYPE: PropTypes.string,
};

ItemView.defaultProps = {
  __TYPE: 'ItemView',
};
