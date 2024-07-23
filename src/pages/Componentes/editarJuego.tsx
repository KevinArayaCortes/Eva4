import { actualizarJuego, obtenerJuego } from '@/FireBase/Promesas';
import { Juego } from '@/Interfaces/IJuego';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

const initialState: Juego = {
    nombre: "",
    genero: "",
    plataforma: "",
    jugadores: 0,
    conexion: ""
};

export const editarJuego = () => {
    const router = useRouter();
    const [juego, setJuego] = useState<Juego>(initialState);
    const [error, setError] = useState<string>("");

    const handleJuego = (name: string, value: string) => {
        setJuego({ ...juego, [name]: value });
    };

    useEffect(() => {
        const key = router.query.key;
        if (key !== undefined && typeof key === "string") {
            obtenerJuego(key).then((j) => {
                if (j !== undefined) {
                    setJuego(j);
                }
            });
        }
    }, []);

    const modificar = () => {
        if (!juego.nombre || !juego.genero || !juego.plataforma || !juego.jugadores || !juego.conexion) {
            setError("Todos los campos son obligatorios");
            return;
        }

        actualizarJuego(juego).then(() => {
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
                    <Form.Label>Nombre de Videojuego:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su Nombre de Videojuego:'
                        value={juego.nombre}
                        name='nombre'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Género:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Género de Videojuego:'
                        value={juego.genero}
                        name='genero'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Plataforma:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Plataforma de Videojuego:'
                        value={juego.plataforma}
                        name='plataforma'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cantidad de Jugadores:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingrese Cantidad de Jugadores:'
                        value={juego.jugadores}
                        name='jugadores'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de Conexión:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese Tipo de Conexión:'
                        value={juego.conexion}
                        name='conexion'
                        onChange={(e) => { handleJuego(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
                <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>

            </Form>
        </>
    );
};

export default editarJuego