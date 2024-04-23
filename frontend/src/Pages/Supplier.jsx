
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
            </div>
        </div>
    );
};

export default Supplier;