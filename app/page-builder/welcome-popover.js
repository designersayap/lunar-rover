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
            <div className={styles.welcomeContainer}>
                {/* Big Logo 1:1 */}
                <div className={styles.welcomeLogoWrapper}>
                    <Image
                        src="https://res.cloudinary.com/dp3tcw3wj/image/upload/v1768450282/logo_lunar_lunar_white_m0tyym.svg"
                        alt="Lunar Logo"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Title & Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--pb-space-sm)" }}>
                    <h2 className={`${styles.sectionTitle} ${styles.welcomeTitle}`}>
                        Welcome to Lunar
                    </h2>
                    <p className={`${styles.bodyRegular} ${styles.welcomeDescription}`}>
                        Designer Sayap&apos;s Web Builder
                    </p>
                </div>

                {/* Primary CTA */}
                <button
                    onClick={onClose}
                    className={`${styles.primaryButton} ${styles.welcomeButton}`}
                >
                    Start Now
                </button>
            </div>
        </BasePopover>
    );
}
