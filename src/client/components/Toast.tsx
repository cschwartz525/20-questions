import React from 'react';

interface ToastProps {
    message: string;
}

const Toast = ({ message }: ToastProps) => {
    return (
        <div className="toast">
            {message}
        </div>
    );
};

export default Toast; 