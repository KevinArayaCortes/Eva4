import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '@/FireBase/Firebase'
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Home() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const q = query(collection(db, "usuarios"), where("nUsuario", "==", usuario));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const usuarioDoc = querySnapshot.docs[0];
        const contra = usuarioDoc.data().contraseña;
        if (contra === contraseña) {
          alert('Inicio de sesión exitoso');
          setError('');
          router.push('./Componentes/Menu');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Usuario:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el usuario" name="nUsuario" value={usuario} onChange={(e) => setUsuario(e.currentTarget.value)}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Ingrese la contraseña" name="contraseña" value={contraseña} onChange={(e) => setContraseña(e.currentTarget.value)} />
      </Form.Group>

      <Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="button" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Form.Group>
    </Form>
  );
}
