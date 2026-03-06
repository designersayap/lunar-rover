export const showToast = (message, type = 'success', duration = 5000) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lunar:toast', {
            detail: { message, type, duration }
        }));
    }
};
