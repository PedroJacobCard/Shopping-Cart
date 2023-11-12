import usePageContent from "../hooks/usePageContent"

const Nav = () => {

  const { viewCart, setViewCart } = usePageContent();

  const button = viewCart
  ? <button onClick={() => setViewCart(false)}>🛍️ View Products</button>
  : <button onClick={() => setViewCart(true)}>🛒 View Cart</button>;

  const content = (
    <nav className="nav">
      { button }
    </nav>
  )
  
  return content
}

export default Nav
