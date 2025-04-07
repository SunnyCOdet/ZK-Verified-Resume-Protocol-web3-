import React from 'react';

const VerificationButton = ({ itemId, onVerify, status }) => {
  const getButtonState = () => {
    switch (status) {
      case 'pending':
        return { text: 'Verifying...', disabled: true, classes: 'bg-yellow-600 cursor-wait' };
      case 'failed':
        return { text: 'Verification Failed', disabled: false, classes: 'bg-red-600 hover:bg-red-700' };
      case 'verified': // Should ideally not be shown if badge is present, but handle just in case
         return { text: 'Verified', disabled: true, classes: 'bg-green-600 cursor-not-allowed' };
      default:
        return { text: 'Request Verification', disabled: false, classes: 'bg-teal-600 hover:bg-teal-700' };
    }
  };

  const { text, disabled, classes } = getButtonState();

  return (
    <button
      onClick={onVerify}
      disabled={disabled}
      className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 ${classes} ${disabled ? 'opacity-70' : ''}`}
    >
      {text}
    </button>
  );
};

export default VerificationButton;
