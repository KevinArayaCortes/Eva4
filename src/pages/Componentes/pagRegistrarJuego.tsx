import { registrarJuego } from '@/FireBase/Promesas';
import { Juego } from '@/Interfaces/IJuego';
import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const initialState: Juego = {
    nombre: "",
    genero: "",
    plataforma: "",
    jugadores: 0,
    conexion: ""
};

export const pagRegistrarJuego = () => {
    const [juego, setJuego] = useState<Juego>(initialState);
    const [error, setError] = useState<string>("");

    const handleJuego = (name: string, value: string) => {
        setJuego({ ...juego, [name]: value });
    };

    const registrar = () => {
        if (!juego.nombre || !juego.genero || !juego.plataforma || !juego.jugadores || !juego.conexion) {
            setError("Todos los campos son obligatorios");
            return;
        }

        registrarJuego(juego).then(() => {
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
                    <Form.Label>Nombre de Videojuego:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su Nombre de Videojuego:'
                        name='nombre'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Género:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Género de Videojuego:'
                        name='genero'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Plataforma:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Plataforma de Videojuego:'
                        name='plataforma'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cantidad de Jugadores:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingrese Cantidad de Jugadores:'
                        name='jugadores'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de Conexión:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Tipo de Conexión:'
                        name='conexion'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
                <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
            </Form>
        </>
    );
};

export default pagRegistrarJuego