import Sidebar from '@/components/web/layout/protected/Sidebar';
import Header from '@/components/web/layout/protected/Header';
import Preloader from '@/components/web/layout/protected/Preloader';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function RootLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen">
            {isLoading && <Preloader isLoading={isLoading} />}
            {/* Sidebar for Web */}
            <Sidebar isCollapsed={isCollapsed} />

            {/* Main Content Area */}
            <div
                className="flex-1 flex flex-col"
                // style={{
                //     backgroundImage: 'url(/images/pcmc_bg.jpg)',
                //     backgroundSize: 'cover',
                //     backgroundPosition: 'center',
                // }}
            >
                <ToastContainer />
                <Header toggleSidebar={handleToggleSidebar} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 dark:bg-[#23222b] dark:text-white">
                    <Slot />
                </main>
            </div>
        </div>
    );
}
