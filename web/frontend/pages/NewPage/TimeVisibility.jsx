import { useState, useCallback } from "react";
import {ChoiceList } from '@shopify/polaris'

export function TimeVisibility() {
    const [selected, setSelected] = useState(["hidden"]);
    const handleChange = useCallback((value) => setSelected(value), []);
  
    return (
      <ChoiceList
        choices={[
          { label: "Display (as of 13:29 GMT+7, 13/7/2022)", value: "Display (as of 13:29 GMT+7, 13/7/2022)" },
          { label: "Hidden", value: "Hidden" },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    );
  }