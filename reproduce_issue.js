
const componentDefaults = {
    "feature-left": {
        buttonVisible: true
    }
};

const item = {
    id: "feature-left",
    props: {
        buttonVisible: false
    }
};

// Simulation of export-nextjs.js logic
const generatePropsString = (item) => {

    // Logic from export-nextjs.js
    const props = { ...item, ...(item.props || {}) };

    // Simulating delete logic
    delete props.id;
    delete props.props;

    const propsString = Object.entries(props).map(([key, value]) => {
        if (value === undefined || value === null) return '';
        if (typeof value === 'string') {
            return `${key}={${JSON.stringify(value)}}`;
        } else if (typeof value === 'boolean') {
            return value ? `${key}` : `${key}={false}`;
        } else {
            return `${key}={${JSON.stringify(value)}}`;
        }
    }).filter(Boolean).join(' ');

    return `<Component ${propsString} />`;
};

console.log(generatePropsString(item));
