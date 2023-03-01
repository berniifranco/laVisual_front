import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';

function Register() {

    const [paises, setPaises] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(paises1 => {
                let listadoPaises = [];
                paises1.map(pais => listadoPaises.push(pais.translations.spa.common))
                setPaises(listadoPaises)
            })
    }, [])

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [piso, setPiso] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [loading, setLoading] = useState(false);

    const signup = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestData = { nombre, email, usuario, contrasena, direccion, ciudad, piso, departamento, provincia, pais };
        fetch(`${API_BASE_URL}/users/signin`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(requestData),
            headers: { "Content-type": "application/json" }
        })
            .then((result) => {
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado con éxito'
                    });
                    setNombre('');
                    setUsuario('');
                    setEmail('');
                    setContrasena('');
                    setDireccion('');
                    setCiudad('');
                    setPiso('');
                    setDepartamento('');
                    setProvincia('');
                    setPais('');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema al registrar el usuario'
                    });
                }
            })
    }

    return (
        <div>
            {loading ? <div className="col-md-12 mt-3 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : ''}
            <form className="row g-3 m-5" onSubmit={(e) => signup(e)}>
                <div className="col-6">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)} placeholder="Lionel Messi" />
                </div>
                <div className="col-6">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input type="text" className="form-control" id="usuario" value={usuario} onChange={(ev) => setUsuario(ev.target.value)} placeholder="leomessi" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" onChange={(ev) => setContrasena(ev.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" placeholder="1234 Main St" value={direccion} onChange={(ev) => setDireccion(ev.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="piso" className="form-label">Piso</label>
                    <input type="text" className="form-control" id="piso" value={piso} onChange={(ev) => setPiso(ev.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" value={departamento} onChange={(ev) => setDepartamento(ev.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="ciudad" value={ciudad} onChange={(ev) => setCiudad(ev.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <input type="text" className="form-control" id="provincia" value={provincia} onChange={(ev) => setProvincia(ev.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="pais" className="form-label">País</label>
                    <select id="pais" className="form-select" onChange={(ev) => setPais(ev.target.value)}>
                        <option>Elige...</option>
                        {paises.map((pais, i) => {
                                return <option value={pais} key={i}>{pais}</option>
                            })}
                    </select>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="aceptar" />
                        <label className="form-check-label" htmlFor="aceptar">
                            Acepto los términos y condiciones
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Registrarme</button>
                </div>
            </form>
        </div>
    )
};

export default Register;