import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {

    const [error, setError] = useState('');

    const logout = (e) => {
        e.preventDefault();
        if (localStorage.getItem('token') != null) {
            localStorage.removeItem('token');
        } else {
            setError('Error, no ha iniciado sesión');
        };
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">La Visual</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className="nav-link active" aria-current="page">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Enlace</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Acción</a></li>
                                <li><a className="dropdown-item" href="#">Otra acción</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Algo más aquí</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/register' className="nav-link active" aria-current="register">Registrarse</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className="nav-link active" aria-current="login">Iniciar Sesión</Link>
                        </li>
                        <li className="nav-item">
                            <form onSubmit={(e) => logout(e)}>
                                <Link to='/' className="nav-link active" aria-current="login" onClick={(e) => logout(e)}>Cerrar Sesión</Link>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;