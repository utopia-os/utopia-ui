import * as React from 'react'
import { Item } from '../../types'
import * as PropTypes from 'prop-types'


export const ItemForm = ({ children, item }: { children?: React.ReactNode, item?: Item }) => {
    return (
        <div>{
            children ?
                React.Children.toArray(children).map((child) =>
                    React.isValidElement<{ item: Item, test: string }>(child) ?
                        React.cloneElement(child, { item: item, test: "test" }) : ""
                ) : ""
        }</div>
    )
}

ItemForm.propTypes = {
    children: PropTypes.node,
    __TYPE: PropTypes.string,
};

ItemForm.defaultProps = {
    __TYPE: 'ItemForm',
};
