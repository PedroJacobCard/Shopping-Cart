import { useContext } from "react";
import { PageContentContextType } from '../context/PageContentProvider'
import { PageContentContext } from '../context/PageContentProvider'

const usePageContent = (): PageContentContextType => {
  return useContext(PageContentContext)
}

export default usePageContent