import { Checkbox } from '@components/web/ui/checkbox';
import DataTableColumnHeader from '@components/web/reusable_components/DataTableColumnHeader';
export const columns = [
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
