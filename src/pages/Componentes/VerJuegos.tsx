import { borrarJuego, obtenerJuegos } from '@/FireBase/Promesas';
import { Juego } from '@/Interfaces/IJuego';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineFolderDelete } from "react-icons/md";

export const Ver = () => {
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [juegoBorrar, setJuego] = useState<Juego | null>(null);
    
    useEffect(() => {
        obtenerJuegos().then((juegos) => {
            setJuegos(juegos);
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió");
        });
    }, []);

    const handleShowModalJuego = (juego: Juego) => {
        setJuego(juego);
        setShowModal(true);
    };

    const handleCloseModalJuego = () => {
        setShowModal(false);
        setJuego(null);
    };

    const handleBorrarJuego = async () => {
        if (juegoBorrar) {
            try {
                await borrarJuego(juegoBorrar);
                setJuegos(juegos.filter(j => j.key !== juegoBorrar.key));
            } catch (e) {
                console.error(e);
                alert("Error al borrar el usuario");
            } finally {
                handleCloseModalJuego();
            }
        }
    };

    return (
        <>
            <h1>Videojuegos</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Genero</th>
                        <th>Plataforma</th>
                        <th>Jugadores</th>
                        <th>Conexion</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {juegos.map((j) => (
                        <tr key={j.key}>
                            <td>{j.nombre}</td>
                            <td>{j.genero}</td>
                            <td>{j.plataforma}</td>
                            <td>{j.jugadores}</td>
                            <td>{j.conexion}</td>
                            <td>
                                <Link href={{ pathname: 'editarJuego', query: { key: j.key } }}>
                                    <Button variant='info'><RiEdit2Fill /></Button>
                                </Link>
                                <Button variant='danger'  onClick={() => handleShowModalJuego(j)}><MdOutlineFolderDelete /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal de Confirmación Usuario */}
            <Modal show={showModal} onHide={handleCloseModalJuego}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este videojuego?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalJuego}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleBorrarJuego}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
        </>
    );
};

export default Ver;
