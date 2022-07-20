import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { Toast, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { pageContext } from "../../context/pageContext";
import { deleteAll, getAllPages } from "../../services/PageService";

export default function ModalConfirmEdit(props) {
    const app = useAppBridge()
    const [active, setActive] = useState(true);
    const [activeToast, setActiveToast] = useState(false);
    const { setTitle } = useContext(pageContext)
    const { setContent } = useContext(pageContext)
    const { setAllPages } = useContext(pageContext)
    const { activeModalExit } = useContext(pageContext)
    const { activeHeader } = useContext(pageContext)
    const { setActiveModalExit } = useContext(pageContext)
    const { setActiveHeader } = useContext(pageContext)

    const navigate = useNavigate()

    const toggleActive = useCallback(() => setActiveToast((activeToast) => !activeToast), []);

    const toastMarkup = activeToast ? (
        <Toast content={`Delete ${props.dataDelete.length} Page Success`} onDismiss={toggleActive} />
    ) : null;

    const handleChange = useCallback(() => {
        setActiveModalExit(!activeModalExit);
    }, [activeModalExit]);


    const handleCancelChange = async () => {
        setTitle("")
        setContent("")
        setActiveModalExit(false)
        navigate('/')
    }


    return (
        <div>
            <Modal
                open={activeModalExit}
                onClose={handleChange}
                title={props.title}
                primaryAction={{
                    content: "Cancel changes",
                    destructive: true,
                    onAction: handleCancelChange,
                }}
                secondaryActions={[
                    {
                        content: "Continue Editing",
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