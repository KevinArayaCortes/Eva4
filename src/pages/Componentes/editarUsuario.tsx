import { actualizarUsuario, obtenerUsuario } from '@/FireBase/Promesas';
import { Usuario } from '@/Interfaces/IUsuario';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

const initialState: Usuario = {
    nUsuario: "",
    contraseña: "",
};

export const editarUsuario = () => {
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>(initialState);
    const [error, setError] = useState<string>("");

    const handleUsuario = (name: string, value: string) => {
        setUsuario({ ...usuario, [name]: value });
    };

    useEffect(() => {
        const key = router.query.key;
        if (key !== undefined && typeof key === "string") {
            obtenerUsuario(key).then((u) => {
                if (u !== undefined) {
                    setUsuario(u);
                }
            });
        }
    }, []);

    const modificar = () => {
        if (!usuario.nUsuario || !usuario.contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }

        actualizarUsuario(usuario).then(() => {
            alert("Se actualiza con éxito");
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
                        value={usuario.nUsuario}
                        name='nUsuario'
                        onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Ingrese su Contraseña:'
                        value={usuario.contraseña}
                        name='contraseña'
                        onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
                <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
            </Form>
        </>
    );
};

export default editarUsuario