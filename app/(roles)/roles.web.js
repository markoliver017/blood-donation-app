import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { CirclePlus, Delete, EyeIcon, UserIcon } from 'lucide-react';
import { DataTable } from '@components/web/roles/DataTable';
import { columns } from '@components/web/roles/RoleColumns';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';
import { Dropdown } from 'flowbite-react';
import useRoleStore from '@/store/useRoleStore';
import { toast } from 'react-toastify';

export default function Page() {
    const [processing, setProcessing] = useState(false);
    const { roles, fetchRoles } = useRoleStore();

    useEffect(() => {
        fetchRoles().catch((error) => {
            toast.error('Failed to fetch roles: ' + error.message, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        });
    }, []);

    return (
        <div
            id="roles_container"
            className={clsx(
                processing ? 'animate-pulse' : 'animate-none',
                'p-6 space-y-4',
            )}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                    Roles Management
                </h2>
                <button
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition"
                    // onClick={() => setCreateModalVisible(true)}
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
                        // onClick={() => setCreateModalVisible(true)}
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
                                            // onClick={() =>
                                            //     handleOpenModalView(userData)
                                            // }
                                        >
                                            <EyeIcon className="inline-block mr-2" />{' '}
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-600"
                                            // onClick={() =>
                                            //     handleUserDeletion(userData.id)
                                            // }
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
