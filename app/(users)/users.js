import React from 'react';
import { Text } from 'react-native';
// import { DataTable } from '@/components/web/users/DataTable';

const data = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
    },
    {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        age: 25,
    },
];

const columns = [
    {
        title: 'Name',
        accessor: 'name',
    },
    {
        title: 'Email',
        accessor: 'email',
    },
    {
        title: 'Age',
        accessor: 'age',
    },
];

const App = () => {
    return <Text>Users Page</Text>;
};

export default App;
