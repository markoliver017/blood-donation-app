import { Link, usePathname } from 'expo-router';
import clsx from 'clsx';
import { Image } from 'react-native';

export default function Sidebar({ isCollapsed }) {
    const route = usePathname();
    //     usePathname
    // useLocalSearchParams
    // useSegments
    console.log(route);
    return (
        <aside
            // className="flex flex-col justify-between w-64 bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 h-screen"

            className={clsx(
                'flex flex-col justify-between w-64 bg-gray-200 dark:bg-gray-800 text-black dark:text-white h-screen',
                isCollapsed ? 'w-16 p-1' : 'w-64 p-4',
            )}
        >
            <div>
                <div className="flex justify-between items-center">
                    <h2
                        className={clsx(
                            'w-full text-lg font-bold flex gap-1 p-2',
                            isCollapsed ? 'justify-center' : '',
                        )}
                    >
                        <Image
                            source={{ uri: 'images/pcmc_logo.png' }} // Access from public folder
                            style={{ width: 30, height: 30 }}
                            className="cursor-pointer"
                            title="PCMC Logo"
                        />
                        {!isCollapsed && 'My App'}
                    </h2>
                    {/* Toggle Dark Mode Button */}
                </div>
                {/* <button className="p-2 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
                        {darkMode ? '🌙' : '☀️'}
                    </button> */}

                <nav className="mt-10">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/"
                                // className="block p-2 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                                className={clsx(
                                    'block p-2 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
                                    isCollapsed && 'text-center',
                                )}
                            >
                                🏠 {!isCollapsed && 'Home'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className={clsx(
                                    'block p-2 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
                                    isCollapsed && 'text-center',
                                )}
                            >
                                👤 {!isCollapsed && 'Profile'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/settings"
                                className={clsx(
                                    'block p-2 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
                                    isCollapsed && 'text-center',
                                )}
                            >
                                ⚙️ {!isCollapsed && 'Settings'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <footer className=" text-center p-4 text-gray-700 dark:text-gray-300">
                © {new Date().getFullYear()}
                {!isCollapsed && 'MyApp. All rights reserved.'}
            </footer>
        </aside>
    );
}
