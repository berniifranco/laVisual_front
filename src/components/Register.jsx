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
    }, []);

    const passRegEx = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

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
    const [terminos, setTerminos] = useState('');
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);

    const signup = (e) => {
        e.preventDefault();
        setLoading(true);
        let errors = {};
        if (!nombre.trim()) {
            errors.nombre = 'Se requiere un nombre.'
        };
        if (!email.trim()) {
            errors.email = 'Se requiere un E-Mail.';
        } else if (/\S+@\S+\.\S+/.test(errors.email)) {
            errors.email = 'El formato es inválido.';
        };
        if (!usuario.trim()) {
            errors.usuario = 'Se requiere un usuario.'
        };
        if (!contrasena.trim()) {
            errors.contrasena = 'Se requiere una contraseña.'
        } else if (contrasena.length < 8) {
            errors.contrasena = 'La contraseña debe tener entre 8 y 16 caracteres.';
        } else if (!passRegEx.test(contrasena)) {
            errors.contrasena = 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial.'
        };
        if (!direccion.trim()) {
            errors.direccion = 'Se requiere una direccion.'
        };
        if (!ciudad.trim()) {
            errors.ciudad = 'Se requiere una ciudad.'
        };
        if (!provincia.trim()) {
            errors.provincia = 'Se requiere una provincia.'
        };
        if (!pais.trim()) {
            errors.pais = 'Se requiere un pais.'
        };
        if (!terminos.trim()) {
            errors.terminos = 'Debes aceptar los términos y condiciones.'
        };
        if (Object.keys(errors).length === 0) {
            const requestData = { nombre, email, usuario, contrasena, direccion, ciudad, piso, departamento, provincia, pais, terminos };
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
                        setTerminos('');
                        setErrores({});
                    } else {
                        setErrores(errores);
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un problema al registrar el usuario'
                        });
                        setLoading(false);
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un problema al registrar el usuario'
            });
            setLoading(false);
            setErrores(errors);
        }
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
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)} />
                    {errores.nombre && <span className='text-danger'>{errores.nombre}</span>}
                </div>
                <div className="col-6">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input type="text" className="form-control" id="usuario" value={usuario} onChange={(ev) => setUsuario(ev.target.value)} />
                    {errores.usuario && <span className='text-danger'>{errores.usuario}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                    {errores.email && <span className='text-danger'>{errores.email}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" onChange={(ev) => setContrasena(ev.target.value)} />
                    {errores.contrasena && <span className='text-danger'>{errores.contrasena}</span>}
                </div>
                <div className="col-12">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" placeholder="1234 Main St" value={direccion} onChange={(ev) => setDireccion(ev.target.value)} />
                    {errores.direccion && <span className='text-danger'>{errores.direccion}</span>}
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
                    {errores.ciudad && <span className='text-danger'>{errores.ciudad}</span>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <input type="text" className="form-control" id="provincia" value={provincia} onChange={(ev) => setProvincia(ev.target.value)} />
                    {errores.provincia && <span className='text-danger'>{errores.provincia}</span>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="pais" className="form-label">País</label>
                    <select id="pais" className="form-select" onChange={(ev) => setPais(ev.target.value)}>
                        <option>Elige...</option>
                        {paises.map((pais, i) => {
                            return <option value={pais} key={i}>{pais}</option>
                        })}
                    </select>
                    {errores.pais && <span className='text-danger'>{errores.pais}</span>}
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="terminos" value={terminos} onChange={(ev) => {
                            if (ev.target.checked) {
                                setTerminos('terminos');
                            } else {
                                setTerminos('');
                            }
                        }} />
                        <label className="form-check-label" htmlFor="terminos">
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    {errores.terminos && <span className='text-danger'>{errores.terminos}</span>}
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Registrarme</button>
                </div>
            </form>
        </div>
    )
};

export default Register;