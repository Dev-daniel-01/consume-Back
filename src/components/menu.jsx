import { useNavigate } from "react-router";
import menuImg from "../assets/menu.png";
import { useState } from "react";
import styles from "./menu.module.css"

export const Menu = () => {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);

    const gotoDashboard = () => navigate('/dashboard')
    const gotoUsers = () => navigate('/usersList')
    const gotoList = () => navigate('/list')

    const logout = () => {
        localStorage.removeItem('user')
        navigate("/")
    }
    
    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
            <img src={menuImg} alt="menuImg" onClick={() => setOpen(prev => !prev)}/>
            <p onClick={gotoDashboard}>Dashboard</p>
            <p>Criar Usuário</p>
            <p onClick={gotoUsers}>Lista de Usuários</p>
            <p>Criar Produto</p>
            <p  onClick={gotoList}>Lista de Produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}