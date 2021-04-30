import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BACKEND_SERVER } from '../../constantes';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash, PencilFill } from 'react-bootstrap-icons';
import EstSeccionFiltro from './est_seccion_filtro';

const EstSeccionLista = () => {
    const [token] = useCookies(['tec-token']);
    const [secciones, setSecciones] = useState([]);
    const [filtro, setFiltro] = useState('')

    const actualizaFiltro = str => {
        setFiltro(str);
    }

    useEffect(()=>{
        axios.get(BACKEND_SERVER + '/api/estructura/seccion/' + filtro, {
            headers: {
                'Authorization': `token ${token['tec-token']}`
              }
        })
        .then(res => {
            // console.log(res.data);
            setSecciones(res.data);
        })
    },[token, filtro]);

    return ( 
        <Container>
            <Row>
                <Col xs="12" sm="4">
                    <EstSeccionFiltro actualizaFiltro={actualizaFiltro}/>
                </Col>
                <Col>
                    <h5 className="mb-3 mt-3">Lista de secciones</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Zona</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secciones && secciones.map( sec => {
                                return (
                                    <tr key={sec.id}>
                                        <td>{sec.siglas_zona}</td>
                                        <td>{sec.nombre}</td>
                                        <td>
                                            <Link to={`/estructura/seccion/${sec.id}`}>
                                                <PencilFill className="mr-3 pencil"/>
                                            </Link>
                                            <Trash className="trash" />
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            
        </Container>
     );
}
 
export default EstSeccionLista;