import { Frame } from "@shopify/polaris";
import { useContext, useEffect } from "react";
import { pageContext } from "../context/pageContext";

import Home from './HomePage'

export default function HomePage() {
  const { setActiveHeader } = useContext(pageContext)
  const { title } = useContext(pageContext)
  const { content } = useContext(pageContext)

  useEffect(() => {
    setActiveHeader(false)
  }, [title === '', content === ''])
  
  return (
    <Frame>
      <Home />
    </Frame>
  );
}

