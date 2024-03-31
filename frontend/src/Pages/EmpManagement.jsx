import AppBar from '../Components/Appbar';
import Drawer from '../Components/menu';
import { useState } from 'react';
import '../EmpManagement.css';

function EmpManagement(){
    const [cards] = useState([
        {
            title: 'Leave Management',
            text: 'sd'
        },

        {
            title: 'Attendance Management',
            text: 'sd'
        },

        {
            title: 'Pay Slips ',
            text: 'sd'
        },
    ])
    return(
        <div className='wrapper'>
        <div className='sidebar'>
            <AppBar />
            <Drawer />
        </div>
        <div className='content'>
            <section>
                <div className="container">
                    <div className="cards">
                        {
                            cards.map((card, i) => (

                        <div key={i} className="card">
                            <h3>
                                {card.title}
                            </h3>
                            <p>
                                {card.text}
                            </p>
                        </div>
                        ))
                            }
                    </div>
                </div>
            </section>
        </div>
        
        </div>


    );


}



export default EmpManagement