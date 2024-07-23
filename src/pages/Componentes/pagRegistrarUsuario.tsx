import { registrarUsuario } from '@/FireBase/Promesas';
import { Usuario } from '@/Interfaces/IUsuario';
import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const initialState: Usuario = {
    nUsuario: "",
    contraseña: "",
};

export const pagRegistrarUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(initialState);
    const [error, setError] = useState<string>("");

    const handleUsuario = (name: string, value: string) => {
        setUsuario({ ...usuario, [name]: value });
    };

    const registrar = () => {
        if (!usuario.nUsuario || !usuario.contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }

        registrarUsuario(usuario).then(() => {
            alert("Se logró registrar");
            setError("");
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió");
        });
    };

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre de Usuario:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su Nombre de Usuario:'
                        name='nUsuario'
                        onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Ingrese su Contraseña:'
                        name='contraseña'
                        onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
                <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
            </Form>
        </>
    );
};

export default pagRegistrarUsuario