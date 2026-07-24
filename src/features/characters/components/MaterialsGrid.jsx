
import React from 'react';
import MaterialProgressCard from '../../../components/materials/MaterialProgressCard';

const MaterialsGrid = React.memo(({ materials, inventory, onInventoryChange, lang }) => {
    if (!materials || Object.keys(materials).length === 0) return null;
    return (
        <div className="materials-container wd" data-type="all">
            {Object.entries(materials)
                .filter(([key]) => typeof key === 'string' && key !== 'undefined')
                .map(([key, amount]) => (
                    <MaterialProgressCard
                        key={key}
                        materialKey={key}
                        calculatedAmount={amount}
                        ownedAmount={inventory[key] || 0}
                        onOwnedAmountChange={onInventoryChange}
                    />
            ))}
        </div>
    );
});

export default MaterialsGrid;
