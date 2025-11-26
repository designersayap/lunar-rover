import { ArrowLongRightIcon, SparklesIcon } from "@heroicons/react/20/solid";

/**
 * Buttons Showcase Page
 * Displays all button variants with their class names
 */
export default function ButtonsPage() {
    const buttonVariants = [
        { name: "Primary", classes: "btn btn-primary" },
        { name: "Ghost Neutral", classes: "btn btn-ghost-neutral" },
        { name: "Neutral", classes: "btn btn-neutral" },
        { name: "Outline", classes: "btn btn-outline" },
        { name: "Ghost", classes: "btn btn-ghost" },
    ];

    const buttonSizes = ["sm", "md", "lg"];

    return (
        <main style={{ padding: "var(--padding-2xl)", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 className="h1" style={{ marginBottom: "var(--space-100)", color: "var(--grey-500)" }}>Button Variants</h1>

            {/* Button Variants by Size */}
            {buttonSizes.map((size) => (
                <section key={size} style={{ marginBottom: "var(--space-180)" }}>
                    <h2 className="h3" style={{ marginBottom: "var(--space-100)", color: "var(--grey-500)", textTransform: "capitalize" }}>
                        Size: {size.toUpperCase()}
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-100)" }}>
                        {buttonVariants.map((variant) => (
                            <div
                                key={variant.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--space-100)",
                                    padding: "var(--space-80)",
                                    border: "1px solid var(--grey-100)",
                                    borderRadius: "var(--round-80)",
                                }}
                            >
                                {/* Variant Name */}
                                <div style={{ minWidth: "200px" }}>
                                    <p className="caption-regular" style={{ color: "var(--grey-300)" }}>
                                        .{variant.classes.replace("btn ", "btn-")} .btn-{size}
                                    </p>
                                </div>

                                {/* Button Examples */}
                                <div style={{ display: "flex", gap: "var(--space-80)", flexWrap: "wrap" }}>
                                    {/* Text Only */}
                                    <button className={`${variant.classes} btn-${size}`}>
                                        Button
                                    </button>

                                    {/* With Icon Left */}
                                    <button className={`${variant.classes} btn-${size}`}>
                                        <SparklesIcon />
                                        Button
                                    </button>

                                    {/* With Icon Right */}
                                    <button className={`${variant.classes} btn-${size}`}>
                                        Button
                                        <ArrowLongRightIcon />
                                    </button>

                                    {/* With Both Icons */}
                                    <button className={`${variant.classes} btn-${size}`}>
                                        <SparklesIcon />
                                        Button
                                        <ArrowLongRightIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* Icon Buttons Section */}
            <section style={{ marginBottom: "var(--space-180)" }}>
                <h2 className="h3" style={{ color: "var(--grey-500)", marginBottom: "var(--space-100)" }}>
                    Icon Buttons
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-100)" }}>
                    {buttonVariants.map((variant) => (
                        <div
                            key={variant.name}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--space-100)",
                                padding: "var(--space-80)",
                                border: "1px solid var(--grey-100)",
                                borderRadius: "var(--round-80)",
                            }}
                        >
                            {/* Variant Name */}
                            <div style={{ minWidth: "200px" }}>
                                <p className="body-bold">{variant.name}</p>
                                <p className="caption-regular" style={{ color: "var(--grey-300)" }}>
                                    .btn-icon
                                </p>
                            </div>

                            {/* Icon Button Examples */}
                            <div style={{ display: "flex", gap: "var(--space-80)", alignItems: "center" }}>
                                {buttonSizes.map((size) => (
                                    <button key={size} className={`${variant.classes} btn-icon btn-${size}`}>
                                        <SparklesIcon />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
