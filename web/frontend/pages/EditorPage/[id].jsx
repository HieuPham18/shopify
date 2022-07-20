import { useAppBridge } from "@shopify/app-bridge-react";
import { useParams } from "react-router-dom";
import { getPageByID } from "../../services/PageService";
import PageView from "../NewPage";
import { useContext, useEffect, useState } from 'react'
import { pageContext } from "../../context/pageContext";

function UpdatePage() {
    const app = useAppBridge()
    const { id } = useParams()
    const { setTitle } = useContext(pageContext)
    const { setContent } = useContext(pageContext)
    const { setPageID } = useContext(pageContext)
    useEffect(() => {
        (
            async () => {
                if (id) {
                    const res = await getPageByID(app, id)
                    setTitle(res.title)
                    setContent(res.body_html)
                    setPageID([res.id])
                }
            }
        )()
    }, [id])

    return (
        <>
            <PageView id={id} />
        </>
    );
}

export default UpdatePage;