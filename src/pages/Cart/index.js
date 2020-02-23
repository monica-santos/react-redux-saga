import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { arrayOf, shape, func, string } from 'prop-types'
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { Container, ProductTable, Total } from './styles'
import * as CartActions from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'

const Cart = props => {
  const { cart, total, removeFromCart, updateAmountRequest } = props

  const increment = product => {
    updateAmountRequest(product.id, product.amount + 1)
  }

  const decrement = product => {
    updateAmountRequest(product.id, product.amount - 1)
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th>{}</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th>{}</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.title} />
              </td>
              <td>
                <strong>{item.title}</strong>
                <span>{item.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(item)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" value={item.amount} readOnly />
                  <button type="button" onClick={() => increment(item)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{item.subTotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => removeFromCart(item.id)}>
                  <MdDelete size={20} color="7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

Cart.propTypes = {
  cart: arrayOf(shape({})).isRequired,
  total: string.isRequired,
  removeFromCart: func.isRequired,
  updateAmountRequest: func.isRequired,
}

const mapStateToProps = state => ({
  cart: state.cart.map(item => ({
    ...item,
    subTotal: formatPrice(item.amount * item.price),
  })),
  total: formatPrice(
    state.cart.reduce((sum, item) => sum + item.amount * item.price, 0)
  ),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
