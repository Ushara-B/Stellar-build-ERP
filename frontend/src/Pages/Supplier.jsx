import React from 'react';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';

const Supplier = () => {
    // Example data for suppliers
    const suppliers = [
        { id: 1, name: 'Supplier 1' },
        { id: 2, name: 'Supplier 2' },
        { id: 3, name: 'Supplier 3' },
        { id: 4, name: 'Supplier 4' },
        { id: 5, name: 'Supplier 5' },

    
    ];

    return (
        <div>
            <AppBar />
                <Menu/>
        

            <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
                <h1>List of Suppliers sample page</h1>
                <ul>
                    {suppliers.map((supplier) => (
                        <li key={supplier.id}>{supplier.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Supplier;