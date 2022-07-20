import { ChoiceList, Filters } from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { pageContext } from "../../context/pageContext";

function FilterPage() {
    const [availability, setAvailability] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const { setFilter } = useContext(pageContext)
    const handleAvailabilityChange = useCallback(
        (value) => setAvailability(value),
        []
    );

    const handleFiltersQueryChange = useCallback(
        (value) => { setQueryValue(value), setFilter(value) },
        []
    );

    const handleAvailabilityRemove = useCallback(() => setAvailability(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleFiltersClearAll = useCallback(() => {
        handleAvailabilityRemove();
        handleQueryValueRemove();
    }, [
        handleAvailabilityRemove,
        handleQueryValueRemove,
    ]);

    const filters = [
        {
            key: "availability",
            label: "Availability",
            filter: (
                <ChoiceList
                    title="Availability"
                    titleHidden
                    choices={[
                        { label: "Display", value: "Display" },
                        { label: "Hidden", value: "Hidden" },
                    ]}
                    selected={availability || []}
                    onChange={handleAvailabilityChange}
                />
            ),
            shortcut: true,
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(availability)) {
        const key = "availability";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, availability),
            onRemove: handleAvailabilityRemove,
        });
    }


    return (
        <Filters
            queryValue={queryValue || ""}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleFiltersClearAll}
        >
        </Filters>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case "availability":
                return value.map((val) => `Available on ${val}`).join(", ");
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === "" || value == null;
        }
    }
}


export default FilterPage;