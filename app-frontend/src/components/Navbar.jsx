import React from 'react';

const Navbar = ({ setCurrentPage }) => {
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div className="container">
        <a className="navbar-brand fw-bold" href="#" onClick={() => setCurrentPage('simulador')}>
        PRESTA-YA
        </a>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <button className="nav-link btn" onClick={() => setCurrentPage('simulador')}>Simulador</button>
            </li>
            <li className="nav-item">
            <button className="nav-link btn" onClick={() => setCurrentPage('garantia')}>Garantía</button>
            </li>
            {/* Agregar los demás links aquí */}
        </ul>
        </div>
</div>
    </nav>
);
};

export default Navbar;