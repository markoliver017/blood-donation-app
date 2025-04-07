import clsx from 'clsx';
import { Link, usePathname } from 'expo-router';
import React from 'react';

export default function SideNavList({
    isCollapsed,
    path,
    Icon,
    name,
    className,
}) {
    const currentRoute = usePathname();
    return (
        <Link
            href={path}
            className={clsx(
                'flex items-center gap-5 p-2 rounded shadow-sm',
                className,
                isCollapsed && 'justify-center',
                currentRoute === path
                    ? ' text-blue-700 bg-gray-200 font-semibold dark:text-blue-800 dark:bg-slate-200 hover:bg-gray-300'
                    : 'text-slate-900 dark:text-white hover:bg-gray-200 hover:text-blue-700 dark:hover:text-blue-100 dark:hover:bg-gray-700',
            )}
        >
            {Icon}
            {!isCollapsed && <span>{name}</span>}
        </Link>
    );
}
