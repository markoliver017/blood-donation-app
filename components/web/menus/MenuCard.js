import { Delete, EyeIcon, LinkIcon, Plus, Trash } from 'lucide-react';
import { IconPickerItem } from 'react-icons-picker';
import { Dropdown } from 'flowbite-react';
import { motion } from 'framer-motion';
import SubMenuCreateModal from '@components/web/menus/SubMenuCreateModal';
import { useState } from 'react';
import SweetAlert from '@components/web/helper/SweetAlert';
import SubMenuViewModal from '@components/web/menus/SubMenuViewModal';

export default function MenuCard({
    menu,
    onView,
    onDelete,
    fetchMenus,
    setProcessing,
}) {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [submenuOnViewData, setSubmenuOnViewData] = useState(null);

    const handleClosingModal = () => {
        setOpenCreateModal(false);
    };

    const handleOpenModalView = (data) => {
        setSubmenuOnViewData(data);
        setOpenViewModal(true);
    };
    const handleCloseModalView = () => {
        setSubmenuOnViewData(null);
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

    return (
        <>
            <SubMenuCreateModal
                isOpen={openCreateModal}
                onClose={handleClosingModal}
                menu={menu}
                onSave={handleUpdate}
            />
            {submenuOnViewData && (
                <SubMenuViewModal
                    isOpen={openViewModal}
                    onClose={handleCloseModalView}
                    submenu={submenuOnViewData}
                    onUpdate={handleUpdate}
                />
            )}
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center">
                    <h3 className="flex items-center text-xl font-semibold text-gray-800">
                        <IconPickerItem
                            value={menu.icon}
                            size={24}
                            className="mr-2"
                        />
                        {menu.name}
                    </h3>
                    <Dropdown
                        label={
                            <span className="button bg-gray-200 p-1 rounded">
                                &#8942;&#8942;
                            </span>
                        }
                        arrowIcon={false}
                        inline
                    >
                        <Dropdown.Header className="border-b text-gray-700">
                            <p className="text-xs">Available Actions</p>
                            <p className="text-sm font-bold">
                                Menu: {menu.name}
                            </p>
                        </Dropdown.Header>
                        <Dropdown.Item
                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                            onClick={() => onView(menu)}
                        >
                            <EyeIcon className="inline-block mr-2" /> View
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onDelete(menu.id)}
                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                        >
                            <Trash className="inline-block mr-2 text-red-600" />{' '}
                            Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setOpenCreateModal(true)}
                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                        >
                            <Plus className="inline-block mr-2 text-blue-600" />{' '}
                            Add Sub-menu
                        </Dropdown.Item>
                    </Dropdown>
                </div>

                {/* Render submenus and links */}
                {menu.Submenus && menu.Submenus.length > 0 && (
                    <ul className="mt-3 space-y-2 border-l-2 border-gray-200 pl-4">
                        {menu.Submenus.map((submenu) => (
                            <li
                                key={submenu.id}
                                className="flex justify-between items-center text-gray-600 hover:text-blue-500 cursor-pointer"
                            >
                                <div
                                    className="flex-items-center"
                                    onClick={() => handleOpenModalView(submenu)}
                                >
                                    <IconPickerItem value={submenu.icon} />
                                    <span>{submenu.name}</span>
                                </div>
                                <Dropdown
                                    label={
                                        <span className="button bg-gray-200 p-1 rounded">
                                            &#8942;
                                        </span>
                                    }
                                    arrowIcon={false}
                                    inline
                                >
                                    <Dropdown.Item
                                        onClick={() => onAddLink(submenu.id)}
                                        className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                    >
                                        <LinkIcon className="inline-block mr-2 text-green-600" />{' '}
                                        Add Link
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            onDeleteSubMenu(submenu.id)
                                        }
                                        className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                    >
                                        <Trash className="inline-block mr-2 text-red-600" />{' '}
                                        Delete Sub-menu
                                    </Dropdown.Item>
                                </Dropdown>
                                {submenu.Links && submenu.Links.length > 0 && (
                                    <ul className="mt-1 pl-4 text-sm text-gray-500">
                                        {submenu.Links.map((link) => (
                                            <li
                                                key={link.id}
                                                className="hover:text-blue-400"
                                            >
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </>
    );
}
