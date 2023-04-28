import { API_BASE_URL } from '../config';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Login () {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errores, setErrores] = useState({});

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        let errors = {};
        if (!email.trim()) {
            errors.email = 'Complete el e-mail';
        } else if (/\S+@\S+\.\S+/.test(errors.email)) {
            errors.email = 'El formato de e-mail no es valido';
        };
        if (!contrasena.trim()) {
            errors.contrasena = 'Ingrese la contraseña';
        };

        if (Object.keys(errors).length === 0) {
            const requestData = {email, contrasena};
            fetch(`${API_BASE_URL}/users/login`, {
                method: "post",
                mode: "cors",
                body: JSON.stringify(requestData),
                headers: { "Content-type": "application/json" }
            })
                .then((response => {
                    if (response.status === 201 || response.status === 200) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Login exitoso'
                        });
                        setEmail('');
                        setContrasena('');
                    } else {
                        setErrores(errors);
                        Swal.fire({
                            icon: 'error',
                            title: 'HubCredenciales inválidas'
                        });
                        setLoading(false);
                    }
                    return response.json();
                }))
                .then((result) => {
                    if(result.token) {
                        localStorage.setItem('token', result.token);
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales inválidas'
            });
            setLoading(false);
            setErrores(errors);
        }
    }

    return (
        <div className="login">
            { loading ? <div className='col-md-12 mt-3 text-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : '' }
            <form className='row g-3 m-5' onSubmit={(e) => login(e)}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                    {errores.email && <span className='text-danger'>{errores.email}</span>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" onChange={(ev) => setContrasena(ev.target.value)} />
                    {errores.contrasena && <span className='text-danger'>{errores.contrasena}</span>}
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    )
};

export default Login;