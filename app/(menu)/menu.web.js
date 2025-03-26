import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    CirclePlus,
    Delete,
    EyeIcon,
    PanelTopOpen,
    UserIcon,
} from 'lucide-react';
import { toast } from 'react-toastify';
import SweetAlert from '@/components/web/helper/SweetAlert';
import { IconPickerItem } from 'react-icons-picker';
import MenusCreateModal from '@/components/web/menus/MenusCreateModal';
import useMenuStore from '@/store/useMenuStore';
import MenusViewModal from '@/components/web/menus/MenusViewModal';
import { Dropdown } from 'flowbite-react';

export default function Page() {
    const { menus, fetchMenus } = useMenuStore();
    const [processing, setProcessing] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [menuOnViewData, setMenuOnViewData] = useState(null);

    useEffect(() => {
        if (!menus.length) {
            fetchMenus(setProcessing).catch((error) => {
                toast.error('Failed to fetch menus: ' + error.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            });
        }
    }, []);

    const handleOpenModalView = (menu) => {
        setMenuOnViewData(menu);
        setOpenViewModal(true);
    };
    const handleCloseModalView = () => {
        setMenuOnViewData(null);
        setOpenViewModal(false);
    };

    const handleUpdate = (data) => {
        SweetAlert({
            element_id: 'menus_container',
            title: data.title || 'Notification',
            icon: data.status,
            text: data.message,
        });
        fetchMenus(setProcessing);
    };

    const handleClosingModal = () => {
        setOpenCreateModal(false);
    };

    return (
        <div
            id="menus_container"
            className={clsx(
                processing ? 'animate-pulse' : 'animate-none',
                'p-6 space-y-4',
            )}
        >
            <MenusCreateModal
                isOpen={openCreateModal}
                onClose={handleClosingModal}
                onSave={handleUpdate}
            />
            {menuOnViewData && (
                <MenusViewModal
                    isOpen={openViewModal}
                    onClose={handleCloseModalView}
                    onSave={handleUpdate}
                    menu={menuOnViewData}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                    Menu Management ( <small>{menus.length}</small> )
                </h2>
                <button
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition"
                    onClick={() => setOpenCreateModal(true)}
                >
                    <CirclePlus className="inline-block mr-2" /> Create
                </button>
            </div>

            {menus.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 p-10 border rounded-md shadow-lg dark:bg-gray-800">
                    <PanelTopOpen className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-300">
                        No menus found.
                    </p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Add a Menu
                    </button>
                </div>
            ) : (
                <div className="container mx-auto p-4">
                    {/* Page Content */}
                    <div className="flex flex-col gap-2">
                        {/* Menu Card */}
                        {menus.map((menu, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 "
                                whileHover={{ scale: 1.03 }} // This adds the hover effect
                                transition={{ duration: 0.5 }} // Smooth transition
                            >
                                <div className="flex justify-between">
                                    <h3 className="flex-items-center text-xl font-semibold text-gray-800 mb-3">
                                        <IconPickerItem
                                            value={menu.icon}
                                            size={24}
                                        />
                                        {menu.name}
                                    </h3>
                                    <Dropdown
                                        label={
                                            <span className="button bg-gray-200 text-black">
                                                &#8942;
                                            </span>
                                        }
                                        className="bg-white dark:text-white"
                                        arrowIcon={false}
                                        inline
                                    >
                                        <Dropdown.Header className="dark:text-slate-200 border-b">
                                            <p className="text-xs">
                                                Available Actions
                                            </p>
                                            <p className="text-sm font-bold">
                                                Menu: {menu.name}
                                            </p>
                                        </Dropdown.Header>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                            onClick={() =>
                                                handleOpenModalView(menu)
                                            }
                                        >
                                            <EyeIcon className="inline-block mr-2" />{' '}
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-600"
                                            // onClick={() =>
                                            //     handleRoleDeletion(menu.id)
                                            // }
                                        >
                                            <Delete className="inline-block mr-2" />{' '}
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                                <ul className="space-y-2">
                                    {['Sub-Menu', 'Sub-Menu', 'Sub-Menu'].map(
                                        (submenu, idx) => (
                                            <li
                                                key={idx}
                                                className="text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
                                            >
                                                {submenu}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
