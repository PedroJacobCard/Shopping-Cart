import { ReactElement, ReactNode, createContext, useState } from "react"

export type PageContentContextType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const initPageState: PageContentContextType = { 
  viewCart: false,
  setViewCart: () => {}
};

export const PageContentContext = createContext<PageContentContextType>(initPageState);

type ChildrenType = {
  children: ReactNode
}

const PageContentProvider = ({ children }: ChildrenType ): ReactElement => {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const togglePage = () => {
    setViewCart(prevPage => !prevPage)
  }

  const contextValue: PageContentContextType = {
    viewCart,
    setViewCart: togglePage
  };

  return (
    <>
      <PageContentContext.Provider value={contextValue}>
        { children }
      </PageContentContext.Provider>
    </>
    
  )

}

export default PageContentProvider;