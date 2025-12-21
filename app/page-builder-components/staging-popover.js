import { useState, useEffect } from 'react';
import { XMarkIcon, FolderIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import styles from '../page.module.css';
import { handleStagePreview } from './utils/stage-preview';
import BasePopover from './base-popover';

export default function StagingPopover({
    position,
    onClose,
    selectedComponents,
    className
}) {
    const [folderName, setFolderName] = useState("");
    const [existingFolders, setExistingFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Fetch existing staging folders
        const fetchFolders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/staging-preview');
                if (res.ok) {
                    const data = await res.json();
                    setExistingFolders(data.folders || []);
                }
            } catch (e) {
                console.error("Failed to fetch folders", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFolders();
    }, []);

    const handleSave = async () => {
        if (!folderName.trim()) {
            alert("Please enter a folder name");
            return;
        }

        setIsSaving(true);
        const success = await handleStagePreview(selectedComponents, folderName.trim());
        setIsSaving(false);

        if (success) {
            onClose();
        }
    };

    if (!position) return null;

    return (
        <BasePopover
            isOpen={true}
            onClose={onClose}
            position={position}
            className={className}
        >
            <div className={styles.popoverContent}>
                <div className={styles.exportInputWrapper} style={{ marginBottom: '16px' }}>
                    <span className="caption-bold">New Staging Page</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="folder-name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <p className={styles.exportHelperText} style={{ color: 'var(--content-neutral--caption)' }}>
                        Creates <code>app/staging/{folderName || '...'}</code>
                    </p>
                </div>

                <div className={styles.exportInputWrapper}>
                    <span className="caption-bold">Or overwrite existing:</span>
                    <div style={{
                        maxHeight: '160px',
                        overflowY: 'auto',
                        border: '1px solid var(--bdr)',
                        borderRadius: '6px',
                        background: 'var(--bg2)'
                    }}>
                        {isLoading ? (
                            <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: 'var(--grey-200)' }}>
                                Loading...
                            </div>
                        ) : existingFolders.length === 0 ? (
                            <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: 'var(--grey-200)' }}>
                                No existing staging pages found.
                            </div>
                        ) : (
                            existingFolders.map(folder => (
                                <div
                                    key={folder}
                                    onClick={() => setFolderName(folder)}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid var(--bdr)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '13px',
                                        background: folderName === folder ? 'var(--bg4)' : 'transparent'
                                    }}
                                >
                                    <FolderIcon style={{ width: '14px', height: '14px', color: 'var(--grey-200)' }} />
                                    {folder}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.popoverFooter}>
                <button
                    className={styles.generatorButton}
                    style={{ width: '100%' }}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Staging..." : "Create Staging"}
                </button>
            </div>
        </BasePopover>
    );
}
