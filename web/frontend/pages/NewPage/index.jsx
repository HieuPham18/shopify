import { useAppBridge, useNavigate } from '@shopify/app-bridge-react';
import { Card, Layout, Page, PageActions, Toast, TextStyle, Select, Button, AppProvider, Frame, ContextualSaveBar } from '@shopify/polaris'
import { useState, useCallback, useEffect, useContext } from 'react'
import { pageContext } from '../../context/pageContext';
import EditorPage from './EditorPage';
import TitlePage from './TitleNewPgae';
import { TimeVisibility } from './TimeVisibility'
import { postPage, putPage } from '../../services/PageService'
import ModalConfirmDelete from '../Confirm/ModalConfirmDelete';
import { LoadingLine } from '../Loading/LoadingLine';
import ModalConfirmEdit from '../Confirm/ModalConfirmExit';
import ModalConfirmCancel from '../Confirm/ModalConfirmCancel'
import SkeletonAddPage from '../Loading/SkeletonNewPage';


const options = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
];

const logo = {
    width: 124,
    contextualSaveBarSource: "https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg",
}

export default function PageView(props) {
    const app = useAppBridge()
    const navigate = useNavigate()
    const { content } = useContext(pageContext)
    const { title } = useContext(pageContext)
    const { setTitle } = useContext(pageContext)
    const { setContent } = useContext(pageContext)
    const { activeHeader } = useContext(pageContext)
    const { setActiveHeader } = useContext(pageContext)
    const { activeModalExit } = useContext(pageContext)
    const { setActiveModalExit } = useContext(pageContext)
    const { activeModalCancel } = useContext(pageContext)
    const { setActiveModalCancel } = useContext(pageContext)
    const { activeModalDelete } = useContext(pageContext)
    const { setActiveModalDelete } = useContext(pageContext)
    const { setPageID } = useContext(pageContext)
    const { pageID } = useContext(pageContext)
    const [titleToast, setTitleToast] = useState("")
    const [active, setActive] = useState(false);
    const [value, setValue] = useState("disabled");
    const [selected, setSelected] = useState("today");

    const handleChange = useCallback((_checked, newValue) => setValue(newValue), []);
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const handleSave = async () => {
        const formData = {
            title: title,
            body_html: content
        }
        if (props.id) {
            const res = await putPage(app, props.id, formData)
            setTitleToast("Save Page Success")
            setActive((active) => !active)
            setTitle("")
            setContent("")
            setActiveHeader(false)
            setTimeout(() => navigate('/'), 800)
            setPageID(null)
        }
        else {
            const res = await postPage(app, formData)
            setTitleToast("Create Page Success")
            setActive((active) => !active)
            setTitle("")
            setContent("")
            setActiveHeader(false)
            setTimeout(() => navigate('/'), 800)
        }
    }

    const handleDiscard = () => {
        if (!title && !content) {
            navigate('/')
        } else {
            setActiveModalExit(!activeModalExit)
        }
    }

    console.log("Active header", activeHeader)

    const handleCancelUpdate = () => {
        if (props.id && title && content) {
            setActiveModalDelete(!activeModalDelete)
        }
    }

    const handCanCelPage = () => {
        if (!content && !title) {
            navigate('/')
        }
        else {
            setActiveModalCancel(!activeModalCancel)

        }
    }

    const headerNewPage = activeHeader ? (
        <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
                disabled: !title && !content,
                onAction: handleSave,
            }}
            discardAction={{
                onAction: handleDiscard,
            }}
        />
    ) : null;

    const toastMarkup = active ? (
        <Toast content={titleToast} onDismiss={toggleActive} />
    ) : null;

    const modalEdit = activeModalExit ? <ModalConfirmEdit title={'Discard all unsaved changes'} description={'If you cancel your changes, you will delete all edits made since the last save.'} /> : null
    const modalCancel = activeModalCancel ? <ModalConfirmCancel title={'You have unsaved changes'} description={'If you leave this page, all unsaved changes will be lost.'} /> : null
    const modalDelete = activeModalDelete ? <ModalConfirmDelete title={`Want to delete page?`} description={'Deleted pages cannot be recovered. Do you still want to continue?'} dataDelete={pageID} /> : null

    return (
        <>
            <Frame
                logo={logo}
            >
                {modalEdit}
                {modalCancel}
                {modalDelete}
                {headerNewPage}
                <Page
                    breadcrumbs={[{
                        content: "Home", onAction: () => {
                            setTitle('')
                            setContent('')
                            navigate('/')
                            setPageID(null)
                        }
                    }]}
                    title="Add page"
                >
                    {
                        pageID === null && props.id ? <SkeletonAddPage /> : (
                            <>
                                <Layout>
                                    <Layout.Section>
                                        <Card sectioned>
                                            <TitlePage />
                                            <p style={{ marginTop: 12 }}>Content: </p>
                                            <br />
                                            <EditorPage content1={content} />
                                        </Card>
                                        <Card title="Preview profiles for search engines" sectioned actions={[{ content: "Website SEO Editing" }]}>
                                            <p>Add a title and description to see how this Page will appear in your search engine listing</p>
                                        </Card>
                                        <br />
                                    </Layout.Section>

                                    <Layout.Section secondary>
                                        <Card title="Visibility" sectioned>
                                            <TimeVisibility />
                                            <Button plain="Example App">Set display date</Button>
                                        </Card>
                                        <Card title="Online shop" sectioned>
                                            <Select
                                                label="Theme template"
                                                options={options}
                                                onChange={handleSelectChange}
                                                value={selected}
                                            />
                                            <br />
                                            <TextStyle variation="subdued">Specify a template in your current theme to define how the page should be displayed.</TextStyle>
                                        </Card>
                                    </Layout.Section>
                                </Layout>

                                <PageActions
                                    primaryAction={{
                                        disabled: !title && !content,
                                        content: "Save",
                                        onAction: handleSave
                                    }}
                                    secondaryActions={[{
                                        content: props.id ? "Delete Page" : "Cancel",
                                        destructive: props.id ? true : false,
                                        onAction: props.id ? handleCancelUpdate : handCanCelPage
                                    }]}
                                />
                            </>
                        )
                    }
                    {toastMarkup}
                </Page>
            </Frame>
        </>
    );
}
