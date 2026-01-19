
const stagingComponents = [
    {
        "id": "scroll-group",
        "uniqueId": 1768402946467,
        "sectionId": "scroll-group-6102",
        "props": {
            "components": [
                {
                    "id": "feature-image-left",
                    "uniqueId": 1768318477960,
                    "sectionId": "product-knowledge",
                    "props": {
                        "buttonTargetDialogId": "1768802872249", // Points to uniqueId of dialog-lama
                        "title": "A New Standard of Calm"
                    }
                }
            ]
        }
    },
    {
        "id": "dialog-item-list",
        "uniqueId": 1768802872249,
        "sectionId": "dialog-lama",
        "props": {}
    },
    {
        "id": "dialog-accordion",
        "uniqueId": 1768802872762,
        "sectionId": "dialog-baru",
        "props": {}
    }
];

// --- Logic to Debug ---

const getPropResolver = (components) => {
    const sectionIdMap = new Map();
    const mapIds = (list) => {
        if (!list || !Array.isArray(list)) return;
        list.forEach(item => {
            if (item.uniqueId && item.sectionId) {
                sectionIdMap.set(String(item.uniqueId), item.sectionId);
            }
            if (item.components) mapIds(item.components);
            if (item.props?.components) mapIds(item.props.components);
        });
    };
    mapIds(components);
    // console.log("Map:", sectionIdMap);

    const resolveProps = (props) => {
        if (!props) return props;
        const newProps = Array.isArray(props) ? [...props] : { ...props };
        Object.keys(newProps).forEach(key => {
            const val = newProps[key];
            if (typeof val === 'string') {
                if (sectionIdMap.has(val)) {
                    newProps[key] = sectionIdMap.get(val);
                }
                if (key.includes('TargetDialogId')) {
                    const resolvedId = sectionIdMap.get(val) || val;
                    if (resolvedId !== val) {
                        newProps[key] = resolvedId;
                    }
                }
            } else if (typeof val === 'object' && val !== null) {
                newProps[key] = resolveProps(val);
            }
        });
        return newProps;
    };
    return resolveProps;
};

const extractBuilderData = (components) => {
    const data = {};
    const resolveProps = getPropResolver(components);

    const traverse = (list) => {
        if (!list || !Array.isArray(list)) return;

        list.forEach(item => {
            const finalId = item.sectionId || item.uniqueId;
            if (finalId) {
                let cleanItem = { ...item, ...(item.props || {}) };
                cleanItem = resolveProps(cleanItem);

                delete cleanItem.id;
                delete cleanItem.uniqueId;
                delete cleanItem.sectionId;
                delete cleanItem.props;
                delete cleanItem.components;

                if (finalId) cleanItem.sectionId = finalId;

                data[finalId] = cleanItem;
            }

            if (item.components && Array.isArray(item.components)) {
                traverse(item.components);
            }
            if (item.props && item.props.components && Array.isArray(item.props.components)) {
                traverse(item.props.components);
            }
        });
    };

    traverse(components);
    return data;
};

const extractedData = extractBuilderData(stagingComponents);
console.log(JSON.stringify(extractedData, null, 2));

if (extractedData['product-knowledge']) {
    console.log("SUCCESS: 'product-knowledge' found.");
} else {
    console.log("FAILURE: 'product-knowledge' NOT found.");
}
