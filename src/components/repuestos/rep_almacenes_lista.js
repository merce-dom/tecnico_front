import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { BACKEND_SERVER } from '../../constantes';
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap';
import { Trash, PencilFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const RepAlmacenesLista = () => {
    const [token] = useCookies(['tec-token']);

    const [filtro, setFiltro] = useState('');
    const [almacenes, setAlmacenes] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        axios.get(BACKEND_SERVER + '/api/repuestos/almacen/' + filtro,{
            headers: {
                'Authorization': `token ${token['tec-token']}`
              }
        })
        .then( res => {
            console.log(res.data); 
            setAlmacenes(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    }, [token]);

    const handlerBorrar = () => {
        setShow(true);
    }

    const handlerClose = () => {
        setShow(false);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h5 className="mb-3 mt-3">Lista de Almacenes</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {almacenes && almacenes.map( almacen => {
                                return (
                                    <tr key={almacen.id}>
                                        <td>{almacen.empresa_siglas}</td>
                                        <td>{almacen.nombre}</td>
                                        <td>
                                            <Link to={`/repuestos/almacen/${almacen.id}`}>
                                                <PencilFill className="mr-3 pencil"/>
                                            </Link>
                                            <Trash className="trash"  onClick={handlerBorrar} />
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={show} onHide={handlerClose} backdrop="static" keyboard={ false } animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Almacen no permitido ...</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Por favor pongase en contacto con el administrador de la base de datos para borrar el almacén.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handlerClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default RepAlmacenesLista;