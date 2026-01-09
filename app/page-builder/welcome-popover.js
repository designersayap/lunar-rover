import BasePopover from "./base-popover";
import styles from "../page.module.css";
import Image from "next/image";

export default function WelcomePopover({ isOpen, onClose }) {
    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            width={480}
            centerByDefault={true}
            className={styles.welcomePopover}
            overlayClassName={styles.modalOverlay}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px",
                textAlign: "center",
                gap: "24px"
            }}>
                {/* Big Logo 1:1 */}
                <div style={{
                    width: "240px",
                    height: "240px",
                    position: "relative",
                    marginBottom: "8px"
                }}>
                    <Image
                        src="/logo.svg"
                        alt="Lunar Logo"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Title & Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h2 className={styles.sectionTitle} style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        margin: 0,
                        color: "var(--base-white)"
                    }}>
                        Welcome to Lunar
                    </h2>
                    <p className="body-regular" style={{
                        color: "var(--grey-300)",
                        fontSize: "16px",
                        maxWidth: "300px",
                        margin: "0 auto"
                    }}>
                        Designer Sayap's Web Builder
                    </p>
                </div>

                {/* Primary CTA */}
                <button
                    onClick={onClose}
                    className={`${styles.primaryButton}`}
                    style={{
                        width: "100%",
                        maxWidth: "240px",
                        height: "48px",
                        marginTop: "16px",
                        borderRadius: "16px"
                    }}
                >
                    Start Now
                </button>
            </div>
        </BasePopover>
    );
}
