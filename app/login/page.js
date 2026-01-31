"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import styles from "./page.module.css";
import globalStyles from "../page.module.css";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                // Redirect to home on success
                router.refresh(); // Refresh to update middleware state
                router.push("/");
            } else {
                setError("Incorrect password");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src="/logo.svg"
                    alt="Lunar Logo"
                    width={48}
                    height={48}
                    className={styles.icon}
                />

                <div>
                    <h1 className={styles.title}>Restricted Access</h1>
                    <p className={styles.description}>Please enter the password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className={`${globalStyles.formInput} ${styles.loginInput}`}
                                autoFocus
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className={styles.eyeIcon} />
                                ) : (
                                    <EyeIcon className={styles.eyeIcon} />
                                )}
                            </button>
                        </div>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                    </div>



                    <button type="submit" className={`${globalStyles.generatorButton} ${styles.loginButton}`} disabled={loading}>
                        {loading ? "Verifying..." : "Access Builder"}
                    </button>
                </form>
            </div>
        </div>
    );
}
