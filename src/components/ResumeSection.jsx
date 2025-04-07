import React from 'react';
import VerificationButton from './VerificationButton';
import VerifiedBadge from './VerifiedBadge'; // Assuming you create this

const ResumeSection = ({ title, items, onVerify, verificationStatus }) => {
  return (
    <section className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-teal-300 border-b border-gray-600 pb-2">{title}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="p-4 bg-gray-700 rounded-md flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              {item.institution && <p className="font-bold text-lg text-white">{item.institution}</p>}
              {item.company && <p className="font-bold text-lg text-white">{item.company}</p>}
              {item.name && <p className="font-bold text-lg text-white">{item.name}</p>}

              {item.degree && <p className="text-gray-300">{item.degree}</p>}
              {item.role && <p className="text-gray-300">{item.role}</p>}

              {item.years && <p className="text-sm text-gray-400">{item.years}</p>}
              {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
               {verificationStatus[item.id] === 'verified' || item.verified ? (
                 <VerifiedBadge />
               ) : (
                 <VerificationButton
                   itemId={item.id}
                   onVerify={() => onVerify(item)}
                   status={verificationStatus[item.id] || null}
                 />
               )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ResumeSection;
