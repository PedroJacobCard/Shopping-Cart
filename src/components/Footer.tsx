import useCart from "../hooks/useCart"
import usePageContent from "../hooks/usePageContent"

const Footer = () => {

  const { totalItems, totalPrice } = useCart();
  const { viewCart } = usePageContent();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart
  ? (
    <>
      <div className="footer__social-media">
        <a href="https://github.com/PedroJacobCard"><i className="bi bi-github"></i></a>
        <a href="https://www.linkedin.com/in/pedro-jacob-82374bb3/"><i className="bi bi-linkedin"></i></a>
        <a href="https://twitter.com/pedrojacob05"><i className="bi bi-x-circle-fill"></i></a>
      </div>
      <p>Shopping Cart | Pedro Jacob &copy; {year}</p>
    </>
  )
  : (
    <>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <div className="footer__social-media">
        <a href="https://github.com/PedroJacobCard"><i className="bi bi-github"></i></a>
        <a href="https://www.linkedin.com/in/pedro-jacob-82374bb3/"><i className="bi bi-linkedin"></i></a>
        <a href="https://twitter.com/pedrojacob05"><i className="bi bi-x-circle-fill"></i></a>
      </div>
      <p>Shopping Cart | Pedro Jacob &copy; {year}</p>
    </>
  )

  const content = (
    <footer className="footer">{ pageContent }</footer>
  )

  return content
}

export default Footer
