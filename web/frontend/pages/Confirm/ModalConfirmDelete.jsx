import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { Toast, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { pageContext } from "../../context/pageContext";
import { deleteAll, getAllPages } from "../../services/PageService";

export default function ModalConfirmDelete(props) {
    const app = useAppBridge()
    const [activeToast, setActiveToast] = useState(false);
    const { setTitle } = useContext(pageContext)
    const { setContent } = useContext(pageContext)
    const { setPageID } = useContext(pageContext)
    const { change } = useContext(pageContext)
    const { setChange } = useContext(pageContext)
    const { setSelectedItems } = useContext(pageContext)
    const { activeModalDelete } = useContext(pageContext)
    const { setActiveModalDelete } = useContext(pageContext)
    const navigate = useNavigate()

    const toggleActive = useCallback(() => setActiveToast((activeToast) => !activeToast), []);

    const toastMarkup = activeToast ? (
        <Toast content={`Delete Page Success`} onDismiss={toggleActive} />
    ) : null;

    const handleChange = useCallback(() => setActiveModalDelete(!activeModalDelete), [activeModalDelete]);

    const handleDelete = async () => {
        await deleteAll(app, props.dataDelete)
        setActiveToast(!activeToast)
        setPageID(null)
        setSelectedItems([])
        setActiveModalDelete(!activeModalDelete)
        setChange(!change)
        setTitle('')
        setContent('')
        navigate('/')
    }

    return (
        <div>
            <Modal
                open={activeModalDelete}
                onClose={handleChange}
                title={props.title}
                primaryAction={{
                    content: "Delete",
                    destructive: true,
                    onAction: handleDelete,
                }}
                secondaryActions={[
                    {
                        content: "Cancel",
                        onAction: handleChange,

                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            {props.description}
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            {toastMarkup}
        </div>
    );
}