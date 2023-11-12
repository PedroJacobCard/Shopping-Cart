import { ReactElement, createContext, useMemo, useReducer } from "react"
import { toast } from "react-toastify"
import { CurrencyFormat } from "../helpers/CurrencyFormat"

export type CartItemType = {
  id: number,
  title: string,
  image: string,
  price: number,
  qty: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
  type: string,
  payload?: CartItemType,
}


const reducer = ( state: CartStateType, action: ReducerAction ): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }
      
      const { id, title, image, price } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)
      const itemExists: CartItemType | undefined = state.cart.find((item) => item.id === id)
      const qty: number = itemExists && itemExists.qty < 20 ? itemExists.qty + 1 : 1
      
      return { ...state, cart: [ ...filteredCart, { id, title, image, price, qty } ] }
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action')
      }
      
      const { id } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)
      
      return { ...state, cart: [ ...filteredCart ] }
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action')
      }
      
      const { id, qty } = action.payload
      const itemExists: CartItemType | undefined = state.cart.find((item) => item.id === id)
      
      if (!itemExists) {
        toast.error('Item must exist in order to update quantity')
        return state;
      } 
      
      const updatedItem: CartItemType = { ...itemExists, qty}
      
      const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)
      
      return { ...state, cart: [ ...filteredCart, updatedItem ] }
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }
    default: throw new Error('Undefined reducer action type')
  }
}

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)
  
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty
  }, 0)

  const totalPrice = CurrencyFormat(state.cart.reduce((previousValue, cartItem) => {
    return previousValue + (cartItem.qty * cartItem.price)
  }, 0))

  const cart = state.cart.sort((a,b) => {
    const itemA = Number(a.id)
    const itemB = Number(b.id)
    return itemA - itemB
  })

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContexType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContexType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
}

export const CartContext = createContext<UseCartContexType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;