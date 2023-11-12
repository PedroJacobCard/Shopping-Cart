import { ProductType } from '../context/ProductProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'
import { ReactElement, memo } from 'react'
import { toast } from 'react-toastify'
import { CurrencyFormat } from '../helpers/CurrencyFormat'

type PropsType = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

  const onAddToCart = () => {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 }})
    toast.success(`${product.title} added to cart`)
  }

  const itemInCart = inCart 
  ? '✅ item added to cart'
  : null;

  const content = (
    <article className='product'>
      <h3>{ product.title }</h3>
      <img className='product__img' src={product.image} alt={product.title} />
      <p>{CurrencyFormat(product.price)} <button className='product__button' onClick={onAddToCart}>🛒</button></p>
      <p>{itemInCart}</p>
      
    </article>
  )

  return content
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
  )
}

const MemoizeProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizeProduct
