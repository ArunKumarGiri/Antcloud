'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Navigation from './navigation';
import Footer from './footer';
import PageWrapper from './pageWrapper';
import Maintenance from './Maintenance';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();

    useEffect(() => {
        // Handle SAM source code logic
        if (pathname === "/signup" && query && query.includes("source=SAM")) {
            const tvCode = query.split("&code=")[1];
            const start = new Date();
            localStorage.setItem("_antCQR", `ANTCQR^${tvCode}^${start.valueOf()}`);
        }

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [pathname, query]);

    // Determine header visibility
    const showHeader = !(
        pathname === "/stream" ||
        pathname === "/windows/stream" ||
        pathname === "/test" ||
        pathname === "/adminstream" ||
        pathname === "/mobilePricing" ||
        (pathname === "/controllerMapping" && query.includes('type=mobile'))
    );

    // Determine footer visibility
    const showFooter = !(
        pathname === "/mobilePricing" ||
        (pathname === '/stream' && query.includes("type=mobile")) ||
        (pathname === "/controllerMapping" && query.includes('type=mobile'))
    );

    return (
        <>
            {showHeader ? <Maintenance /> : <> </>}
            {showHeader?<Navigation/> :<> </>}
            <PageWrapper>{children}</PageWrapper>
            {showFooter ?<Footer /> : <> </>}
        </>
    );
}
