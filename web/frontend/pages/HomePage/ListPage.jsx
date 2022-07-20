import { useNavigate } from "@shopify/app-bridge-react";
import { ResourceList, ResourceItem, TextStyle, Toast, Modal, Pagination } from "@shopify/polaris";
import { useState, useContext } from "react";
import { pageContext } from "../../context/pageContext";
import ModalConfirmDelete from "../Confirm/ModalConfirmDelete";
import NoPageFound from "../DefaultPages/NoPageFound";

const resourceName = {
  singular: "page",
  plural: "pages",
};

export default function ListPage() {
  const { selectedItems } = useContext(pageContext)
  const { setSelectedItems } = useContext(pageContext)
  const [activeModal, setActiveModal] = useState(false);
  const { allPages } = useContext(pageContext)
  const { filter } = useContext(pageContext)
  const { setModalConfirm } = useContext(pageContext)
  const { activeModalDelete } = useContext(pageContext)
  const { setActiveModalDelete } = useContext(pageContext)
  const navigate = useNavigate()


  const bulkActions = [
    {
      content: "Show selected pages",
    },
    {
      content: "Hide selected pages",
    },
    {
      content: "Delete the pages",
      destructive: true,
      onAction: async () => {
        setActiveModalDelete(!activeModalDelete)
      }
    },
  ];

  return (
    <>
      <ModalConfirmDelete title={`Want to delete ${selectedItems.length} page?`} description={'Deleted pages cannot be recovered. Do you still want to continue?'} dataDelete={selectedItems} />
      {
        allPages !== null && <ResourceList
          resourceName={resourceName}
          items={allPages.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())) || item.body_html.toLowerCase().includes(filter.toLowerCase())}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          bulkActions={bulkActions}
          emptyState={<NoPageFound />}
        />
      }
      <div style={{ textAlign: 'center' }}>
        <Pagination
          label="Results"
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </div>can
    </>
  );

  function renderItem(item) {
    const { id, title, body_html, updated_at } = item;
    return (
      <ResourceItem
        id={id}
        onClick={() => navigate(`/EditorPage/${id}`)}
        accessibilityLabel={`View details`}
      // url={url}
      >
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>{body_html.replace(/<[^>]+>/g, "")}</div>
        <div>{updated_at}</div>
      </ResourceItem>
    );
  }
}