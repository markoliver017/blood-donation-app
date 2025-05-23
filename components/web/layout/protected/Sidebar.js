import { useState } from 'react';
import { Link, usePathname } from 'expo-router';
import clsx from 'clsx';
import { Image } from 'react-native';
import { motion } from 'framer-motion';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import { FaHome } from 'react-icons/fa';
import {
    CircleChevronDown,
    CircleChevronRight,
    Droplet,
    ListPlus,
    Menu,
    Settings,
    SquareUser,
    UserRoundCog,
    Users,
} from 'lucide-react';
import SideNavList from './SideNavList';

export default function Sidebar({
    isCollapsed,
    user = {
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        avatar: 'https://avatar.iran.liara.run/public/boy',
    },
}) {
    const routePath = usePathname();
    const themeMode = useColorScheme();
    const [dropdownOpen, setDropdownOpen] = useState({});

    return (
        <motion.aside
            initial={{ width: '290px' }}
            animate={{ width: isCollapsed ? '70px' : '290px' }}
        >
            <LinearGradient
                colors={
                    themeMode === 'dark'
                        ? ['#222', '#0B0638', '#000']
                        : ['#f2f9f9', '#fff', '#f2f9f9']
                } // Deep blue to bright blue gradient
                start={[0, 0]}
                end={[0, 1]}
                className={clsx(
                    'flex flex-col justify-between text-slate-900 dark:text-white h-screen',
                    isCollapsed ? 'p-1' : 'p-4',
                )}
            >
                <div>
                    <div className="flex justify-between items-center rounded mt-2">
                        <h2
                            className={clsx(
                                'w-full text-2xl font-bold flex gap-3 p-2 items-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded',
                                isCollapsed ? 'justify-center' : '',
                            )}
                        >
                            <Image
                                source={{ uri: 'images/pcmc_logo.png' }} // Access from public folder
                                style={{ width: 50, height: 50 }}
                                className="cursor-pointer"
                                title="PCMC Logo"
                            />
                            {!isCollapsed && <span>PCMC</span>}
                        </h2>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center mt-4 hover:bg-gray-300 hover:text-blue-900 dark:hover:text-blue-200 dark:hover:bg-slate-700 p-2 rounded cursor-pointer">
                        <img src={user.avatar} className="w-10 m-auto" />
                        {!isCollapsed && (
                            <div className="ml-2">
                                <h5 className="text-lg font-bold ">
                                    {user.name}
                                </h5>
                                <p className="text-blue-600 dark:text-slate-200">
                                    {user.email}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="mt-10">
                        <ul className="space-y-2">
                            <li>
                                <SideNavList
                                    isCollapsed={isCollapsed}
                                    path="/"
                                    Icon={<FaHome />}
                                    name="Dashboard"
                                    className="text-xl"
                                />
                            </li>
                            <li>
                                <SideNavList
                                    isCollapsed={isCollapsed}
                                    path="/profile"
                                    Icon={<SquareUser />}
                                    name="Profile"
                                    className="text-xl"
                                />
                            </li>

                            <li>
                                <div
                                    className={clsx(
                                        'flex items-center gap-5 p-2 rounded text-xl shadow-sm cursor-pointer',
                                        'text-slate-900 dark:text-white hover:bg-gray-200 hover:text-blue-700 dark:hover:text-blue-100 dark:hover:bg-gray-700',
                                        isCollapsed
                                            ? 'justify-center'
                                            : 'justify-between',
                                    )}
                                    onClick={() =>
                                        setDropdownOpen({
                                            ...dropdownOpen,
                                            dropdown: !dropdownOpen['dropdown'],
                                        })
                                    }
                                >
                                    <ListPlus />
                                    {!isCollapsed && (
                                        <>
                                            <span className="flex-1 text-base truncate">
                                                System Administration
                                            </span>
                                            {dropdownOpen['dropdown'] ? (
                                                <CircleChevronDown className="w-4" />
                                            ) : (
                                                <CircleChevronRight className="w-4" />
                                            )}
                                        </>
                                    )}
                                </div>
                                <ul
                                    className={clsx(
                                        'ml-5 transition-all duration-300',
                                        dropdownOpen['dropdown']
                                            ? 'max-h-screen opacity-100'
                                            : 'max-h-0 opacity-0 pointer-events-none',
                                    )}
                                >
                                    <li className="mt-2">
                                        <SideNavList
                                            isCollapsed={isCollapsed}
                                            path="/users"
                                            Icon={<Users />}
                                            name="Users Management"
                                            className="text-sm"
                                        />
                                    </li>
                                    <li className="mt-2">
                                        <SideNavList
                                            isCollapsed={isCollapsed}
                                            path="/roles"
                                            Icon={<UserRoundCog />}
                                            name="Roles Management"
                                        />
                                    </li>
                                    <li className="mt-2">
                                        <SideNavList
                                            isCollapsed={isCollapsed}
                                            path="/menu"
                                            Icon={<Menu />}
                                            name="Menu Management"
                                        />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <footer className="text-center p-4  dark:text-gray-300">
                    &copy; {new Date().getFullYear()}
                    {!isCollapsed && 'MyApp. All rights reserved.'}
                </footer>
            </LinearGradient>
        </motion.aside>
    );
}
