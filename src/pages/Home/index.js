import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func, shape } from 'prop-types'
import { MdAddShoppingCart } from 'react-icons/md'
import { ProducList } from './styles'
import api from '../../services/api'
import { formatPrice } from '../../util/format'
import * as CardActions from '../../store/modules/cart/actions'

class Home extends Component {
  static propTypes = {
    addToCartRequest: func.isRequired,
    amount: shape({}).isRequired,
  }

  state = {
    products: [],
  }

  async componentDidMount() {
    const { data } = await api.get('/products')
    const products = data.map(item => ({
      ...item,
      formattedPrice: formatPrice(item.price),
    }))
    this.setState({ products })
  }

  handleAddToCart = id => {
    const { addToCartRequest } = this.props
    addToCartRequest(id)
  }

  render() {
    const { products } = this.state
    const { amount } = this.props
    return (
      <ProducList>
        {products.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} />

            <strong>{item.title}</strong>
            <span>{item.formattedPrice}</span>
            <button type="button" onClick={() => this.handleAddToCart(item.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[item.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProducList>
    )
  }
}
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, item) => {
    amount[item.id] = item.amount
    return amount
  }, {}),
})
const mapDispatchToProps = dispatch => bindActionCreators(CardActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
