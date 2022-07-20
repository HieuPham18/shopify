import { useNavigate } from "@shopify/app-bridge-react";
import { Card, EmptyState, Layout, Page } from "@shopify/polaris";

export default function NoPage() {
    const navigate = useNavigate()
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <EmptyState
                            heading="Add pages to your online store"
                            action={{ content: "Add Pages"
                            ,onAction: ()=>navigate('/NewPage') }}
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                            <p>Write clear page titles and descriptions to improve search engine optimization (SEO) and help customers find your site.</p>
                        </EmptyState>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page >

    );
}

