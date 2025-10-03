import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const baseClasses = 'p-4 rounded-md text-center';
  const variantClasses = {
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
  };

  return <div className={`${baseClasses} ${variantClasses[variant]}`}>{children}</div>;
};

export default Message;