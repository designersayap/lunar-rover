"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import styles from "./page.module.css";

export default function LoginPage() {
    const [password, setPassword] = useState("");
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
                <LockClosedIcon className={styles.icon} />

                <div>
                    <h1 className={styles.title}>Restricted Access</h1>
                    <p className={styles.description}>Please enter the password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className={styles.input}
                            autoFocus
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Verifying..." : "Access Builder"}
                    </button>
                </form>
            </div>
        </div>
    );
}
