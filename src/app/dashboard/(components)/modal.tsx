
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';


// Modal types
export type ModalType = 'validation' | 'confirmation' | 'success' | 'error';

export interface ModalProps {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string | string[];
  onConfirm: () => void;
  onCancel: () => void;
}



export default function Modal ({ isOpen, type, title, message, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null;

  const getBgColor = () => {
    switch (type) {
      case 'validation': return 'bg-yellow-50';
      case 'confirmation': return 'bg-blue-50';
      case 'success': return 'bg-green-50';
      case 'error': return 'bg-red-50';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'validation': return <AlertCircle className="h-10 w-10 text-yellow-500" />;
      case 'confirmation': return <AlertCircle className="h-10 w-10 text-blue-500" />;
      case 'success': return <CheckCircle className="h-10 w-10 text-green-500" />;
      case 'error': return <XCircle className="h-10 w-10 text-red-500" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'validation': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'confirmation': return 'bg-blue-500 hover:bg-blue-600';
      case 'success': return 'bg-green-500 hover:bg-green-600';
      case 'error': return 'bg-red-500 hover:bg-red-600';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/10">
      <div className={`${getBgColor()} p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all`}>
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-4">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {Array.isArray(message) ? (
              <ul className="list-disc pl-5 mb-4 text-sm space-y-1">
                {message.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-sm">{message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          {(type === 'confirmation' || type === 'validation') && (
            <button
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            className={`cursor-pointer px-4 py-2 ${getButtonColor()} text-white rounded transition-colors`}
            onClick={onConfirm}
          >
            {type === 'confirmation' ? 'Confirm' :
              type === 'validation' ? 'Review' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};