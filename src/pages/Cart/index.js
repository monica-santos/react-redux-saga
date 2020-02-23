import React from 'react'
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { Container, ProductTable, Total } from './styles'

export default function Cart() {
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
          <tr>
            <td>
              <img
                src="https://static.netshoes.com.br/produtos/tenis-adidas-vs-pace-masculino/06/COL-0552-006/COL-0552-006_zoom1.jpg?ims=544x"
                alt="Tenis"
              />
            </td>
            <td>
              <strong>Tenis</strong>
              <span>R$169,99</span>
            </td>
            <td>
              <div>
                <button type="submit">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" value={2} readOnly />
                <button type="submit">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$339,98</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="7159c1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>Total</span>
          <strong>R$339,98</strong>
        </Total>
      </footer>
    </Container>
  )
}
