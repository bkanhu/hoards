import React from 'react';
import { X } from 'lucide-react';
// import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal ">
      <div className="modal-content w-full md:w-[550px]">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-lg font-semibold">Add</h2>
          <button className="close-button" onClick={onClose}>
            {/* Close */}
            <X height={16} width={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
