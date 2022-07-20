import { Page, SkeletonPage, Layout, Card, SkeletonBodyText } from "@shopify/polaris";
import { LoadingLine } from "./LoadingLine";


export default function SkeletonAddPage(props) {
  return (
    <Page>
      <LoadingLine />
      <SkeletonPage title={props.title}>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
            <Card sectioned >
              <SkeletonBodyText />
            </Card>
            <Card sectioned >
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card >
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
            </Card>
            <Card subdued>
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
      <SkeletonPage primaryAction></SkeletonPage>
    </Page>

  );
}

