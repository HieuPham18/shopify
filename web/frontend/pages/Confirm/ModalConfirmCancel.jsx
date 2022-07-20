import { useNavigate } from "@shopify/app-bridge-react";
import { Modal, TextContainer } from "@shopify/polaris";
import { useCallback, useContext } from "react";
import { pageContext } from "../../context/pageContext";

export default function ModalConfirmCancel(props) {
    const { setTitle } = useContext(pageContext)
    const { setContent } = useContext(pageContext)
    const { activeModalCancel } = useContext(pageContext)
    const { setActiveHeader } = useContext(pageContext)
    const { setActiveModalCancel } = useContext(pageContext)
    const { activeHeader } = useContext(pageContext)


    const navigate = useNavigate()
    const handleChange = useCallback(() => setActiveModalCancel(!activeModalCancel), [activeModalCancel]);

    const handleCancelChange = async () => {
        setTitle("")
        setContent("")
        setActiveModalCancel(!activeModalCancel)
        navigate('/')
    }

    return (
        <div>
            <Modal
                open={activeModalCancel}
                onClose={handleChange}
                title={props.title}
                primaryAction={{
                    content: "Leave Page",
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
        </div>
    );
}