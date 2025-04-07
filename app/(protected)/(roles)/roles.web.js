import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { CirclePlus, Delete, EyeIcon, UserIcon } from 'lucide-react';
import { DataTable } from '@/components/web/roles/DataTable';
import { columns } from '@components/web/roles/RoleColumns';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';
import { Dropdown } from 'flowbite-react';
import useRoleStore from '@/store/useRoleStore';
import { toast } from 'react-toastify';
import RolesCreateModal from '@/components/web/roles/RolesCreateModal';
import SweetAlert from '@/components/web/helper/SweetAlert';
import RolesViewModal from '@/components/web/roles/RolesViewModal';
import { deleteRole } from '@/api/roles/rolesQuery';

export default function Page() {
    const { roles, fetchRoles } = useRoleStore();
    const [processing, setProcessing] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [roleOnViewData, setRoleOnViewData] = useState(null);

    useEffect(() => {
        if (!roles.length) {
            fetchRoles(setProcessing).catch((error) => {
                toast.error('Failed to fetch roles: ' + error.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            });
        }
    }, []);

    const handleOpenModalView = (role) => {
        setRoleOnViewData(role);
        setOpenViewModal(true);
    };
    const handleCloseModalView = () => {
        setRoleOnViewData(null);
        setOpenViewModal(false);
    };

    const handleUpdate = (data) => {
        SweetAlert({
            element_id: 'roles_container',
            title: data.title || 'Notification',
            icon: data.status,
            text: data.message,
        });
        fetchRoles(setProcessing);
    };

    const handleRoleDeletion = (role_id) => {
        SweetAlert({
            title: 'Role Deletion?',
            text: 'Are you sure you want to delete this role?',
            showCancelButton: true,
            onConfirm: () => processDeleteRole(role_id),
        });
    };

    const processDeleteRole = async (role_id) => {
        try {
            const response = await deleteRole(role_id);
            if (!response.error) {
                SweetAlert({
                    title: 'Role Deletion',
                    text: response.msg,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                fetchRoles();
            }
        } catch (error) {
            if (error.name === 'AxiosError') {
                SweetAlert({
                    title: 'Role Deletion',
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
                            'There was an error while trying to delete the role: ' +
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
            id="roles_container"
            className={clsx(
                processing ? 'animate-pulse' : 'animate-none',
                'p-6 space-y-4',
            )}
        >
            <RolesCreateModal
                isOpen={openCreateModal}
                onClose={handleClosingModal}
                onSave={handleUpdate}
            />
            {roleOnViewData && (
                <RolesViewModal
                    isOpen={openViewModal}
                    onClose={handleCloseModalView}
                    onUpdate={handleUpdate}
                    role={roleOnViewData}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                    Roles Management ( <small>{roles.length}</small> )
                </h2>
                <button
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition"
                    onClick={() => setOpenCreateModal(true)}
                >
                    <CirclePlus className="inline-block mr-2" /> Create
                </button>
            </div>

            {roles.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 p-10 border rounded-md shadow-lg dark:bg-gray-800">
                    <UserIcon className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-300">
                        No roles found.
                    </p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Add a Role
                    </button>
                </div>
            ) : (
                <DataTable
                    className="shadow-md rounded-md overflow-hidden bg-white dark:bg-gray-800"
                    data={roles}
                    columns={[
                        ...columns,
                        {
                            id: 'actions',
                            header: ({ column }) => (
                                <DataTableColumnHeader
                                    column={column}
                                    title="Action"
                                />
                            ),
                            cell: ({ row }) => {
                                const role = row.original;
                                return (
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
                                                Role: {role.role_name}
                                            </p>
                                        </Dropdown.Header>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                            onClick={() =>
                                                handleOpenModalView(role)
                                            }
                                        >
                                            <EyeIcon className="inline-block mr-2" />{' '}
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-600"
                                            onClick={() =>
                                                handleRoleDeletion(role.id)
                                            }
                                        >
                                            <Delete className="inline-block mr-2" />{' '}
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown>
                                );
                            },
                        },
                    ]}
                />
            )}
        </div>
    );
}
