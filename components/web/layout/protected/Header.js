import { Dropdown } from 'flowbite-react';
import { Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
    return (
        // <nav className="flex items-center bg-gray-200 dark:bg-gray-700 h-20 font-semibold dark:text-slate-200 shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]">
        <nav className="flex items-center bg-white dark:bg-[#1C1B22] dark:text-white h-20 font-semibold shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]">
            <div className="flex-1 px-2">
                <div className="flex justify-between items-center h-16 ">
                    <div className="flex-1 flex gap-2">
                        <button
                            className="p-2 rounded-md hover:bg-gray-400"
                            onClick={toggleSidebar}
                        >
                            <Menu />
                        </button>
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-300"
                            >
                                Page Title
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center ">
                        <div className="hidden md:flex space-x-6">
                            <a
                                href="/"
                                className="hover:text-blue-600 dark:hover:text-blue-300"
                            >
                                Home
                            </a>
                            <a
                                href="/profile"
                                className="hover:text-blue-600 dark:hover:text-blue-300"
                            >
                                Profile
                            </a>
                            <a
                                href="/settings"
                                className="hover:text-blue-600 dark:hover:text-blue-300"
                            >
                                Settings
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <Dropdown
                            label={
                                <img
                                    src="https://avatar.iran.liara.run/public/boy"
                                    width={40}
                                    className="hover:opacity-80"
                                />
                            }
                            arrowIcon={false}
                            inline
                            className="p-5 bg-white dark:text-slate-200"
                        >
                            <Dropdown.Header className="dark:text-slate-200 border-b">
                                <span className="block text-sm">
                                    Bonnie Green
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    name@flowbite.com
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item className="p-2 shadow-[rgba(0,0,15,0.5)_2px_2px_4px_0px] hover:shadow dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300">
                                Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item className="p-2 shadow-[rgba(0,0,15,0.5)_2px_2px_4px_0px] hover:shadow dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300">
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item className="p-2 shadow-[rgba(0,0,15,0.5)_2px_2px_4px_0px] hover:shadow dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300">
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}
