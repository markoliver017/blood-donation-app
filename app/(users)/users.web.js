import React, { useEffect, useState } from 'react';
import { DataTable } from '@components/web/users/DataTable';
import { Checkbox } from '@components/web/ui/checkbox';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';

import { getAllUsers } from '@/api/users/usersQuery';
import SweetAlert from '@/components/web/helper/SweetAlert';
import { toast } from 'react-toastify';

const columns = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'full_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },

    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            const data = row.original;
            return <div className="flex items-center">{data.email}</div>;
        },
    },
    // {
    //     accessorKey: 'age',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Age" />
    //     ),
    // },
];

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchTokenAndUsers = async () => {
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
                    text:
                        'Error fetching users: ' + error.response.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchTokenAndUsers();
    }, []);

    return (
        <div >
            <DataTable data={users} columns={columns} />
        </div>
    );
};

export default App;
