import React from 'react';
import Modal from 'react-modal';

interface ResultModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  name: string;
  age: string;
  gender: string;
  country: string;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onRequestClose, name, age, gender, country }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal rounded-lg overflow-hidden bg-white w-80 mx-auto mt-20 shadow-lg text-black font-serif"
      overlayClassName="Overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Hi {name}, here is my guess</h2>
        <div className="mb-2">
          <span className="font-semibold">Age:</span> {age}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Gender:</span> {gender}
        </div>
        <div>
          <span className="font-semibold">Country:</span> {country}
        </div>
      </div>
      <button onClick={onRequestClose} className="w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white  transition duration-300">
        Close
      </button>
    </Modal>
  );
};

export default ResultModal;
