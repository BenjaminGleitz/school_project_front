import React from 'react';
import './css/loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;