import produce from 'immer'

export default (state = [], action) => {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const product = draft.find(p => p.id === action.product.id)
        if (product) product.amount += 1
        else draft.push({ ...action.product, amount: 1 })
      })
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id)
        if (productIndex >= 0) draft.splice(productIndex, 1)
      })
    case '@cart/UPDATE': {
      if (action.amount <= 0) return state
      return produce(state, draft => {
        const product = draft.find(p => p.id === action.id)
        if (product) product.amount = Number(action.amount)
      })
    }
    default:
      return state
  }
}
