// Importar los componentes necesarios
import { useState } from 'react';
import { updateUser } from '../../logic/LogicUpdateUsuario';
import toast, { Toaster } from 'react-hot-toast';

// Función para validar la contraseña
const password_validate = (password) => {
    // Al menos una mayúscula, una minúscula, un número y un caracter especial
    var re = {
        capital: /(?=.*[A-Z])/,
        length: /(?=.{8,})/,
        specialChar: /(?=.*[@$!%.*?-_&])/,
        digit: /(?=.*[0-9])/,
    };
    // Validar la contraseña
    return (
        re.capital.test(password) &&
        re.length.test(password) &&
        re.specialChar.test(password) &&
        re.digit.test(password)
    );
};

// Función para editar un usuario
const EditUserFieldDialog = ({ isOpen, onClose, user, field, onUpdate }) => {
  // Establecer los estados de los campos
  const [value, setValue] = useState(user[field] || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  // Manejar los cambios en el campo imagen
  const handleChange = (e) => {
    if (field === 'imagen') {
      setImage(e.target.files[0]);
    } else {
      setValue(e.target.value);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que las contraseñas coincidan
    if (field === 'password') {
      if (password !== confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }
      if (!password_validate(password)) {
        toast.error('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial');
        return;
      }
    }

    // Actualizar el usuario con los datos proporcionados.
    let updateData;
    if (field === 'password') {
      updateData = { [field]: password };
    } else if (field === 'imagen') {
      // Crear un objeto FormData con los datos del formulario
      const formData = new FormData();
      formData.append('imagen', image);
      updateData = formData;
    } else {
      updateData = { [field]: value };
    }
    try {
      // Llamar a la función de actualización de usuario
      const updatedUser = await updateUser(updateData);
      onUpdate(field, field === 'imagen' ? URL.createObjectURL(image) : updatedUser[field]);

      // Cerrar el diálogo
      onClose();
    } catch (error) {
      console.error('Hubo un error al actualizar el usuario:', error);
    }
  };

  // Si el diálogo no se ha abierto, no mostrarlo
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

        {/* Formulario de edición de usuario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {field === 'password' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
                {/* Llamar a la función para manejar el cambio de contraseña */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
                {/* Llamar a la función para manejar el cambio de contraseña */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          ) : field === 'imagen' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen:</label>
              {/* Llamar a la función para manejar el cambio de imagen */}
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">{field}:</label>
              {/* Llamar a la función para manejar los cambios */}
              <input
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
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
      <Toaster />
    </div>
  );
};

export default EditUserFieldDialog;