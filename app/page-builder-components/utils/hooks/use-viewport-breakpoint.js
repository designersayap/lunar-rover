import { useState } from 'react';

/**
 * Hook for managing viewport breakpoint state
 */
export function useViewportBreakpoint() {
    const [activeBreakpoint, setActiveBreakpoint] = useState('desktop');

    return {
        activeBreakpoint,
        setActiveBreakpoint
    };
}
