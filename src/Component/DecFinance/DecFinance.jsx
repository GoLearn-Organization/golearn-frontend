import React from 'react';
import Title from './Title/Title';
import DecFinanceDetails from './DecFinanceDetails/DecFinanceDetails';
import { useLocation } from 'react-router-dom';

const DecFinance = () => {
    const location = useLocation();
    console.log(location);
    
    return(
        <>
            <Title 
                data={location.state.id}
            />
            <DecFinanceDetails  
                data={location.state.id}
            />
        </>
    )
}

export default DecFinance;