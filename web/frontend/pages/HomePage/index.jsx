import { Card, Icon, Tabs, Button, Page, Layout } from "@shopify/polaris";
import { FavoriteMajor } from '@shopify/polaris-icons';
import { useState, useCallback, useContext, useEffect } from "react";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useLocation } from "react-router-dom";
import ListPage from './ListPage'
import FilterPage from './FiltersPage'
import SortBy from "./SortPage";
import { pageContext } from "../../context/pageContext";
import SkeletonHomePage from "../Loading/SkeletonPage";
import { getAllPages } from "../../services/PageService";
import NoPage from "../DefaultPages/NoPage";

const tabs = [
    {
        id: "all-customers-1",
        content: "All",
        accessibilityLabel: "All customers",
        panelID: "all-customers-content-1",
    },
];

export default function Home() {
    const [selected, setSelected] = useState(0);
    const [loadPage, setLoadPage] = useState(null)
    const { setAllPages } = useContext(pageContext)
    const { change } = useContext(pageContext)

    const navigate = useNavigate()
    const app = useAppBridge()

    useEffect(() => {
        (async () => {
            const res = await getAllPages(app)
            setAllPages(res)
            setLoadPage(res)
        })()
    }, [change])

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        []
    );

    const handleOnlick = () => {
        navigate('/NewPage')
    }

    return (
        <>
            <Page fullWidth
                title="Pages"
                primaryAction={
                    <Button onClick={handleOnlick} primary>Add Pages</Button>
                }
            >
                {
                    loadPage === null ? <SkeletonHomePage /> :
                        loadPage.length === 0 ? <NoPage /> :
                            <Layout>
                                <Layout.Section>
                                    <Card>
                                        <Card sectioned>
                                            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                                <div style={{ display: "flex", alignItems: "flex-start", marginTop: 12 }}>
                                                    <div style={{ flex: 1 }}>
                                                        <FilterPage />
                                                    </div>
                                                    <div style={{ margin: "0px 8px" }}>
                                                        <Button disabled>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span>
                                                                    <Icon
                                                                        source={FavoriteMajor}
                                                                        color="base"
                                                                    />
                                                                </span>
                                                                <span>Save</span>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <SortBy />
                                                    </div>
                                                </div>
                                                <ListPage />
                                            </Tabs>
                                        </Card >
                                    </Card>
                                </Layout.Section>
                            </Layout>
                }
            </Page>
        </>


    );
}

