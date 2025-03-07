import Sidebar from '@/components/web/Sidebar';
import Header from '@/components/web/Header';
import Preloader from '@/components/web/Preloader';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@api/user';
import { ToastContainer, toast } from 'react-toastify';
import SweetAlert from '@/components/web/helper/SweetAlert';

export default function RootLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);

    //     return () => clearTimeout(timeout);
    // }, [users]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchTokenAndUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
                // setIsLoading(false);
            } catch (error) {
                toast.error(
                    'Error fetching users: ' + error.response.data.message,
                    {
                        position: 'bottom-right',
                        autoClose: 5000,
                    },
                );
                SweetAlert({
                    title: 'Error',
                    text:
                        'Error fetching users: ' + error.response.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }
            setIsLoading(false);
        };

        fetchTokenAndUsers();
    }, []);
    useEffect(() => {
        console.log(users);
    }, [users]);

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
