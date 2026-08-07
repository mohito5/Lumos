import React from 'react';
import { useParams } from 'react-router-dom';

const WeaponDetailPage = () => {
    const { id } = useParams();

    // TODO: Fetch weapon data based on id

    return (
        <div>
            <h1>Weapon Detail Page for {id}</h1>
        </div>
    );
};

export default WeaponDetailPage;
