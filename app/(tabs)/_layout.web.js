import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slot } from 'expo-router';
import { useState } from 'react';
export default function TabLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for Web */}
            <Sidebar isCollapsed={isCollapsed} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={handleToggleSidebar} />
                <main className="flex-1 overflow-y-auto">
                    <Slot />
                </main>
            </div>
        </div>
    );
}
