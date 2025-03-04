import { Avatar, Dropdown } from 'flowbite-react';
import {
    CircleUser,
    CircleUserIcon,
    Menu,
    User,
    UserRoundCog,
} from 'lucide-react';

export default function Header({ toggleSidebar }) {
    return (
        <nav className="bg-slate-200 text-black shadow">
            <div className="px-2 ">
                <div className="flex justify-between items-center h-16 ">
                    <div className="flex-1 flex gap-2">
                        <button
                            className="p-2 rounded-md hover:bg-gray-400"
                            onClick={toggleSidebar}
                        >
                            <Menu />
                        </button>
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-semibold">
                                Page Title
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center ">
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="hover:text-gray-200">
                                Home
                            </a>
                            <a href="/profile" className="hover:text-gray-200">
                                Profile
                            </a>
                            <a href="/settings" className="hover:text-gray-200">
                                Settings
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <Dropdown
                            label={<CircleUserIcon />}
                            arrowIcon={false}
                            inline
                            className="bg-white"
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    Bonnie Green
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    name@flowbite.com
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Hidden by Default) */}
            <div className="md:hidden hidden" id="mobile-menu">
                <a href="/" className="block px-4 py-2 text-white">
                    Home
                </a>
                <a href="/profile" className="block px-4 py-2 text-white">
                    Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-white">
                    Settings
                </a>
            </div>
        </nav>
    );
}
