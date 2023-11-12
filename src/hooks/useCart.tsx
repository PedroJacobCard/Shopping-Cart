import { useContext } from 'react'
import CartContext from '../context/CartProvider'
import { UseCartContexType } from '../context/CartProvider'

const useCart = (): UseCartContexType => {
  return useContext(CartContext)
}

export default useCart;