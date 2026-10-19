import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return(
        <header className="header">
            <div className="logo-container">
                <h1 className="logo-title">Pokemon pearl shop</h1>
            </div>
            <nav className="nav-menu">
                <a href="#home">Inicio</a>
                <a href="#productos">Productos</a>
                <a href="#admin">Administración</a>
            </nav>
        </header>
    );
};