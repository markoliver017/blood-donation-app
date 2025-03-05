import Sidebar from '@/components/web/Sidebar';
import Header from '@/components/web/Header';
import Preloader from '@/components/web/Preloader';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
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
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={handleToggleSidebar} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Slot />
                </main>
            </div>
        </div>
    );
}
