import { Page, SkeletonPage, Layout, Card, SkeletonTabs, Grid } from "@shopify/polaris";
import { LoadingLine } from "./LoadingLine";
import { LoadingSpiner } from "./LoadingSpiner";


export default function SkeletonHomePage() {
  return (
    <>
      <LoadingLine />
      <Page>
        <SkeletonPage>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <SkeletonTabs count={2} />
                <br />
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 2 }}>
                    <div style={{ height: 36, border: '1px solid #ccc', borderRadius: 4, backgroundColor: '#f1f2f3' }}></div>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 10, xl: 10 }}>
                    <Card>
                      <div style={{ height: 36, border: '1px solid #ccc', borderRadius: 4, backgroundColor: '#f1f2f3' }}></div>
                    </Card>
                  </Grid.Cell>
                </Grid>
                <div style={{ height: 120, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <LoadingSpiner />
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      </Page>
    </>

  );
}

