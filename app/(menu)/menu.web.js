import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import SweetAlert from '@/components/web/helper/SweetAlert';
import MenusCreateModal from '@/components/web/menus/MenusCreateModal';
import useMenuStore from '@/store/useMenuStore';
import MenusViewModal from '@/components/web/menus/MenusViewModal';
import { deleteMenu } from '@/api/menu/menusQuery';
import MenuCard from '@/components/web/menus/MenuCard';
import { CirclePlus, PanelTopOpen } from 'lucide-react';

export default function Page() {
    const { menus, fetchMenus } = useMenuStore();
    const [processing, setProcessing] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [menuOnViewData, setMenuOnViewData] = useState(null);

    useEffect(() => {
        fetchMenus(setProcessing).catch((error) => {
            toast.error('Failed to fetch menus: ' + error.message, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        });
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

    const handleMenuDeletion = (menu_id) => {
        SweetAlert({
            title: 'Menu Deletion?',
            text: 'Are you sure you want to delete this menu?',
            showCancelButton: true,
            onConfirm: () => processDeleteMenu(menu_id),
        });
    };

    const processDeleteMenu = async (menu_id) => {
        try {
            const response = await deleteMenu(menu_id);
            if (!response.error) {
                SweetAlert({
                    title: 'Menu Deletion',
                    text: response.msg,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                fetchMenus();
            }
        } catch (error) {
            if (error.name === 'AxiosError') {
                SweetAlert({
                    title: 'Menu Deletion',
                    text:
                        error.message + ' - Please contact your administrator.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }

            if (error.response) {
                const errorResponse = error.response?.data?.error;
                if (typeof errorResponse == 'string') {
                    SweetAlert({
                        title: 'Error',
                        text:
                            'There was an error while trying to delete the menu: ' +
                            errorResponse,
                        icon: 'error',
                        confirmButtonText: 'Okay',
                    });
                }
            }
        }
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
                            <MenuCard
                                key={index}
                                menu={menu}
                                onView={handleOpenModalView}
                                onDelete={handleMenuDeletion}
                                fetchMenus={fetchMenus}
                                setProcessing={setProcessing}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
