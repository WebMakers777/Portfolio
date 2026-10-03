import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ isLoading }) => {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const t = setTimeout(() => setShouldRender(false), 600);
            return () => clearTimeout(t);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={`loader-overlay ${!isLoading ? 'fade-out' : ''}`}>
            <div className="terminal-loader">
                <div className="terminal-header">
                    <div className="terminal-title">vincie@dev</div>
                    <div className="terminal-controls">
                        <div className="control close"></div>
                        <div className="control minimize"></div>
                        <div className="control maximize"></div>
                    </div>
                </div>
                <div className="text">Initializing...</div>
            </div>
        </div>
    );
};

export default Loader;
