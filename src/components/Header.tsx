import Nav from "./Nav"

//import context
import useCart from "../hooks/useCart"

const Header = () => {

  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>Jacob's Co.</h1>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
          <Nav/>
    </header>
  )
  return content
}

export default Header
