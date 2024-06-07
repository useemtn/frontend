const ConfirmUserDialog = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-sm">
          <h2 className="text-lg font-medium mb-4">{message}</h2>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onConfirm}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmUserDialog;
  