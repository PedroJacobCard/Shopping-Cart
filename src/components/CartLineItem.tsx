import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { CurrencyFormat } from "../helpers/CurrencyFormat"

type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const lineTotal: number = (item.qty * item.price)

  const highestQty: number = 20 > item.qty ? 20 : item.qty

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

  const options: ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) }
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item
  })

  const content = (
    <li className="cart__item">
      <img src={item.image} alt={item.title} className="cart__img" />
      <div className="cart__name" aria-label="Item Name">{item.title}</div>
      <div className="cart__price" aria-label="Price Per Item">{CurrencyFormat(item.price)}</div>

      <label htmlFor="itemQty" className="offscreen">Item Quatity</label>
      <select 
        name="itemQty" 
        id="itemQty" 
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {CurrencyFormat(lineTotal)}
        <button className="cart__button"
          aria-label="Remove From Cart"
          title="Remove From Cart"
          onClick={onRemoveFromCart}
        >🗑️</button>
      </div>
    </li>
  )

  return content
}

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem
