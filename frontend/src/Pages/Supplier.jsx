import React from 'react';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';

const Supplier = () => {
    // Example data for suppliers
    const suppliers = [
        { id: 1, name: 'Supplier 1' },
        { id: 2, name: 'Supplier 2' },
        { id: 3, name: 'Supplier 3' },
        // Add more suppliers as needed
    ];

    return (
        <div>
            <AppBar />
            <Menu />

            <h1>List of Suppliers</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier.id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Supplier;