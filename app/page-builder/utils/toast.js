export const showToast = (message, type = 'success') => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lunar:toast', {
            detail: { message, type }
        }));
    }
};
