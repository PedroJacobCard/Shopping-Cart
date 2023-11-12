//import  Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"

//import contexts
import usePageContent  from "./hooks/usePageContent"



function App() {
  const { viewCart } = usePageContent();

  const pageContent = viewCart ? <Cart /> : <ProductList />

  const content = (
    <>
      <Header />
      {pageContent}
      <Footer />
    </>
  )

  return content
}

export default App
