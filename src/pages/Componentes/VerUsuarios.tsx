import { obtenerUsuarios, borrarUsuario } from '@/FireBase/Promesas';
import { Usuario } from '@/Interfaces/IUsuario';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserDeleteOutline } from "react-icons/ti";

export const Ver = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [usuarioBorrar, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        obtenerUsuarios().then((usuarios) => {
            setUsuarios(usuarios);
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió");
        });
    }, []);
    
    const handleShowModalUsuario = (usuario: Usuario) => {
        setUsuario(usuario);
        setShowModal(true);
    };

    const handleCloseModalUsuario = () => {
        setShowModal(false);
        setUsuario(null);
    };

    const handleBorrarUsuario = async () => {
        if (usuarioBorrar) {
            try {
                await borrarUsuario(usuarioBorrar);
                setUsuarios(usuarios.filter(u => u.key !== usuarioBorrar.key));
            } catch (e) {
                console.error(e);
                alert("Error al borrar el usuario");
            } finally {
                handleCloseModalUsuario();
            }
        }
    };

    return (
        <>
            <h1>Usuarios</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.key}>
                            <td>{u.nUsuario}</td>
                            <td>
                                <Link href={{ pathname: 'editarUsuario', query: { key: u.key } }}>
                                    <Button variant='info'><LiaUserEditSolid /></Button>
                                </Link>
                                <Button variant='danger' onClick={() => handleShowModalUsuario(u)}><TiUserDeleteOutline /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>            

            {/* Modal de Confirmación Usuario */}
            <Modal show={showModal} onHide={handleCloseModalUsuario}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUsuario}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleBorrarUsuario}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
        </>
    );
};

export default Ver;
