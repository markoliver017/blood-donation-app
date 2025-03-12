import React, { useEffect, useState } from 'react';
import { getAllRoles } from '@/api/roles/rolesQuery';
import Create from '@components/web/users/CreateModal';
import ViewModal from '@components/web/users/ViewModal';
import { Dropdown } from 'flowbite-react';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';
import { DataTable } from '@components/web/users/DataTable';
import { columns } from '@components/web/users/UserColumns';

import {
    CirclePlus,
    Command,
    Delete,
    DeleteIcon,
    Eye,
    ListTodo,
    MenuIcon,
    MoreHorizontal,
    ViewIcon,
} from 'lucide-react';

import { getAllUsers } from '@/api/users/usersQuery';
import SweetAlert from '@/components/web/helper/SweetAlert';
import { toast } from 'react-toastify';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userOnViewData, setUserOnViewData] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [roleOptions, setRoleOptions] = useState([]);

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

    const fetchRoles = async () => {
        try {
            const rolesData = await getAllRoles();
            setRoleOptions(
                rolesData.map((role) => ({
                    label: role.role_name,
                    value: role.role_name,
                    icon: role.icon,
                    id: role.id,
                })),
            );
        } catch (error) {
            console.error('Error fetching rolessss:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
        } catch (error) {
            toast.error(
                'Error fetching users: ' + error.response.data.message,
                {
                    position: 'bottom-right',
                    autoClose: 5000,
                },
            );
            SweetAlert({
                title: 'Error',
                text: 'Error fetching users: ' + error.response.data.message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div>
            <Create
                isOpen={createModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onSave={fetchUsers}
                roleOptions={roleOptions}
            />

            {userOnViewData && (
                <ViewModal
                    isOpen={viewModalVisible}
                    onClose={handleCloseModalView}
                    onUpdate={fetchUsers}
                    roleOptions={roleOptions}
                    user={userOnViewData}
                />
            )}
            <button
                className="button bg-green-800 dark:text-slate-200 hover:bg-green-900"
                onClick={() => setCreateModalVisible(true)}
            >
                <CirclePlus />
                Create
            </button>

            <DataTable
                data={users}
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
                                    label={<MenuIcon />}
                                    arrowIcon={false}
                                    inline
                                    className=" bg-white dark:text-slate-200"
                                >
                                    <Dropdown.Header className="dark:text-slate-200 border-b">
                                        <span className="block text-xs">
                                            Available Actions
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item
                                        className="p-2 hover:shadow dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300"
                                        icon={Eye}
                                        onClick={() =>
                                            handleOpenModalView(userData)
                                        }
                                    >
                                        View
                                    </Dropdown.Item>

                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        className="p-2 hover:shadow dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300"
                                        icon={Delete}
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default App;
