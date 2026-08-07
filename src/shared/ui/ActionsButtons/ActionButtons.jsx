import React from 'react';
import { useNavChrome } from '../../lib/context/ButtonManagerContext';
import BackButton from './BackButton';
import FilterButton from './FilterButton';

const ActionButtons = () => {
    const { buttonType } = useNavChrome();

    if (!buttonType || !Array.isArray(buttonType)) {
        return null;
    }

    // Map over the array and render the corresponding buttons
    return (
        <>
            {buttonType.map(type => {
                switch (type) {
                    case 'filter':
                        return <FilterButton key="filter" />;
                    case 'back':
                        return <BackButton key="back" />;
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default ActionButtons;
