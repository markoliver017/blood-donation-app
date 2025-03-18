import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '@/api/users/usersQuery';
import { getAllRoles } from '@/api/roles/rolesQuery';
import Create from '@components/web/users/CreateModal';
import ViewModal from '@components/web/users/ViewModal';
import { Dropdown } from 'flowbite-react';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';
import { DataTable } from '@components/web/users/DataTable';
import { columns } from '@components/web/users/UserColumns';
import clsx from 'clsx';

import { CirclePlus, Delete, EyeIcon, UserCog, UserIcon } from 'lucide-react';

import SweetAlert from '@/components/web/helper/SweetAlert';
import { toast } from 'react-toastify';
import useRoleStore from '@/store/useRoleStore';

const App = () => {
    const { roles, fetchRoles } = useRoleStore();
    const [users, setUsers] = useState([]);
    const [userOnViewData, setUserOnViewData] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [roleOptions, setRoleOptions] = useState([]);
    const [processing, setProcessing] = useState(true);

    const handleOpenModalView = (user) => {
        setUserOnViewData(user);
        setViewModalVisible(true);
    };

    const handleCloseModalView = () => {
        setUserOnViewData(null);
        setViewModalVisible(false);
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    useEffect(() => {
        setRoleOptions(
            roles.map((role) => ({
                label: role.role_name,
                value: role.role_name,
                icon: UserCog,
                id: role.id,
            })),
        );
    }, [roles]);

    const fetchUsers = async () => {
        try {
            setProcessing(true);
            const usersData = await getAllUsers();
            setUsers(usersData);
            setProcessing(false);

        } catch (error) {
            if (error.name === 'AxiosError') {
                SweetAlert({
                    title: 'Fetching Users',
                    text:
                        error.message + ' - Please contact your administrator.',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }

            if (error.response) {
                SweetAlert({
                    title: 'Error',
                    text:
                        'Error fetching users: ' + error.response.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }
        }
        finally {

        }
    };

    const handleUpdate = (data) => {
        SweetAlert({
            element_id: 'users_container',
            title: data.title || 'Notification',
            icon: data.status,
            text: data.message,
        });
        fetchUsers();
    };

    const handleUserDeletion = (user_id) => {
        SweetAlert({
            title: 'User Deletion?',
            text: 'Are you sure you want to delete this user?',
            showCancelButton: true,
            onConfirm: () => processDeleteUser(user_id),
        });
    };

    const processDeleteUser = async (user_id) => {
        try {
            const response = await deleteUser(user_id);
            if (!response.error) {
                SweetAlert({
                    title: 'User Deletion',
                    text: response.msg,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                fetchUsers();
            }
        } catch (error) {
            if (error.name === 'AxiosError') {
                SweetAlert({
                    title: 'User Deletion',
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
                            'There was an error while trying to delete the user: ' +
                            errorResponse,
                        icon: 'error',
                        confirmButtonText: 'Okay',
                    });
                }
            }
        }
    };
    return (
        <div
            id="users_container"
            className={clsx(
                processing ? 'animate-pulse' : 'animate-none',
                'p-6 space-y-4',
            )}
        >
            <Create
                isOpen={createModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onSave={handleUpdate}
                roleOptions={roleOptions}
            />

            {userOnViewData && (
                <ViewModal
                    isOpen={viewModalVisible}
                    onClose={handleCloseModalView}
                    onUpdate={handleUpdate}
                    roleOptions={roleOptions}
                    user={userOnViewData}
                    onRefresh={fetchUsers}
                />
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                    Users Management ( <small>{users.length} </small>)
                </h2>
                <button
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <CirclePlus className="inline-block mr-2" /> Create
                </button>
            </div>

            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 p-10 border rounded-md shadow-lg dark:bg-gray-800">
                    <UserIcon className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-300">
                        No users found.
                    </p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => setCreateModalVisible(true)}
                    >
                        Add a User
                    </button>
                </div>
            ) : (
                <DataTable
                    data={users}
                    roleOptions={roleOptions}
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
                                const userData = row.original;
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
                                                User: {userData.full_name}
                                            </p>
                                        </Dropdown.Header>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                            onClick={() =>
                                                handleOpenModalView(userData)
                                            }
                                        >
                                            <EyeIcon className="inline-block mr-2" />{' '}
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="p-2 hover:shadow text-gray-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-600"
                                            onClick={() =>
                                                handleUserDeletion(userData.id)
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
                    className="shadow-md rounded-md overflow-hidden bg-white dark:bg-gray-800"
                />
            )}
        </div>
    );
};
export default App;
