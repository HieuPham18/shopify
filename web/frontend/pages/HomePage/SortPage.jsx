import { Button, Popover, Icon, ChoiceList } from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { SortMinor } from '@shopify/polaris-icons';
import { pageContext } from "../../context/pageContext";

export default function SortBy() {
    const [popoverActive, setPopoverActive] = useState(false);
    const { allPages } = useContext(pageContext)
    const { setAllPages } = useContext(pageContext)

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const activator = (<div style={{ display: "inline-block" }}>
        <Button onClick={togglePopoverActive} horizontal >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>
                    <Icon
                        source={SortMinor}
                        color="base"
                    />
                </span>
                <span>Classify</span>
            </div>
        </Button>
    </div>

    );

    const [value, setValue] = useState("disabled");

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
        []
    );

    const [selectedList, setSelectedList] = useState(["hidden"]);

    const handleChangeList = useCallback((value) => {
        
        setSelectedList(value)
        const selectedSort = value[0]
        const copyPages = [...allPages]

        if (selectedSort === 'latest') {
            const newPage = copyPages.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            setAllPages(newPage)

        }
        else if (selectedSort === 'old') {
            const newPage = copyPages.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
            setAllPages(newPage)
        }
        else if (selectedSort === 'az') {
            const newPage = copyPages.sort((a, b) => a.title.localeCompare(b.title))
            setAllPages(newPage)
        }
        else if (selectedSort === 'za') {
            const newPage = copyPages.sort((a, b) => b.title.localeCompare(a.title))
            setAllPages(newPage)
        }
    }, []);

    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <div style={{ padding: 12 }}>
                    <ChoiceList
                        title="Sort by"
                        choices={[
                            { label: "Latest updates", value: "latest" },
                            { label: "Oldest updates", value: "old" },
                            { label: "Title A-Z", value: "az" },
                            { label: "Title Z-A", value: "za" },
                        ]}
                        selected={selectedList}
                        onChange={handleChangeList}
                    />
                </div>
            </Popover>
        </div>
    );
}

{/* <Popover.Pane fixed>
                    <Popover.Section>
                        <p>Available sales channels</p>
                    </Popover.Section>
                </Popover.Pane>
                <Popover.Pane>
                    <Stack vertical>
                        <RadioButton
                            label="Display"
                            checked={value === "disabled"}
                            id="disabled"
                            name="accounts"
                            onChange={handleChange}
                        />
                        <RadioButton
                            label="Hidden"
                            id="optional"
                            name="accounts"
                            checked={value === "optional"}
                            onChange={handleChange}
                        />
                        <RadioButton
                            label="Display"
                            checked={value === "disabled"}
                            id="disabled"
                            name="accounts"
                            onChange={handleChange}
                        />
                        <RadioButton
                            label="Hidden"
                            id="optional"
                            name="accounts"
                            checked={value === "optional"}
                            onChange={handleChange}
                        />
                        <RadioButton
                            label="Display"
                            checked={value === "disabled"}
                            id="disabled"
                            name="accounts"
                            onChange={handleChange}
                        />
                    </Stack>
                </Popover.Pane> */}
