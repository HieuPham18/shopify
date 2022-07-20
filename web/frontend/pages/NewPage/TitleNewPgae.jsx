import { useState, useCallback, useContext } from "react";
import { TextField } from '@shopify/polaris'
import { pageContext } from "../../context/pageContext";

export default function TitlePage() {
    const { setTitle } = useContext(pageContext)
    const { setActiveHeader } = useContext(pageContext)
    const { title } = useContext(pageContext)
    const handleChange = useCallback((newValue) => {
        setTitle(newValue)
        setActiveHeader(true)
        console.log("title log")
    }, []);


    return (
        <TextField
            label="Title: "
            value={title}
            onChange={handleChange}
            autoComplete="off"
        />
    );
}