import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ActionButtons from './ActionButtons/ActionButtons';

const HeaderActions = () => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        // Find the container element in the static HTML
        const portalContainer = document.querySelector('.nav-left-area');
        if (portalContainer) {
            setContainer(portalContainer);
        }
    }, []);

    if (!container) {
        return null;
    }

    // Render the ActionButtons component into the container using a portal
    return ReactDOM.createPortal(<ActionButtons />, container);
};

export default HeaderActions;
