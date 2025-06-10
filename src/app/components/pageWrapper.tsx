'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={pathname}
                initial={{ y: 100, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 1}}
                transition={{
                    duration: 0.8,
                    ease: [0.5, 0.5, 0.5, 1],   
                    
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
