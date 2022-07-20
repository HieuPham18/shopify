import { Button, Popover, ActionList, Stack, RadioButton } from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function ActionListWithMediaExample() {
    const [active, setActive] = useState(true);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const activator = (
        <Button onClick={toggleActive} disclosure>
            Visibility
        </Button>
    );

    const [value, setValue] = useState("disabled");

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
        []
    );

    return (
        <Popover
            active={active}
            activator={activator}
            autofocusTarget="first-node"
            onClose={toggleActive}
        >
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
                <Button>Delete</Button>
            </Stack>
        </Popover>
    );
}

