import { useState } from 'react';
import { updateUser } from '../../logic/LogicUpdateUsuario';

const EditUserFieldDialog = ({ isOpen, onClose, user, field, onUpdate }) => {
  const [value, setValue] = useState(user[field] || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (field === 'imagen') {
      setImage(e.target.files[0]);
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (field === 'password' && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    let updateData;
    if (field === 'password') {
      updateData = { [field]: password };
    } else if (field === 'imagen') {
      const formData = new FormData();
      formData.append('imagen', image);
      updateData = formData;
    } else {
      updateData = { [field]: value };
    }
    try {
      const updatedUser = await updateUser(updateData);
      onUpdate(field, field === 'imagen' ? URL.createObjectURL(image) : updatedUser[field]);
      onClose();
    } catch (error) {
      console.error('Hubo un error al actualizar el usuario:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          {field === 'password' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          ) : field === 'imagen' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">{field}:</label>
              <input
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 hover:scale-105 transition"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserFieldDialog;
