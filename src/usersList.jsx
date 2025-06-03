import './usersList.module.css'

import { useState, useEffect } from 'react'
import { api } from './api/api.ts'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function UsersList() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editUserId, setEditUserId] = useState(null)
    const [editData, setEditData] = useState({ name: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) navigate("/")
    }, [navigate])



    const fetchUsers = async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (err) {
            setError('Error ao carregar usuarios', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`)
            setUsers(users.filter((unity) => unity.id !== id))
        } catch (err) {
            setError("Erro ao deletar usuário: ", err)
        }
    }

    const handleEditClick = (user) => {
        setEditUserId(user.id)
        setEditData({ name: user.name, email: user.email, password: '' }) //nao mostra a senha antiga
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setEditData({ ...editData, [name]: value });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (editData.password !== confirmPassword) {
            setPasswordError('As senhas não coincidem');
            return;
        }
    
        setPasswordError('');

        try {
            await api.put(`/users/${editUserId}`, editData)
            setEditUserId(null)
            setConfirmPassword('');
            fetchUsers()
        } catch (err) {
            setError("Erro ao atualizar o usuário: ", err)
        }
    }


    if (loading) return <p>carregando...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <section>
                <Menu></Menu>

                <div style={{ padding: '2rem' }}>
                    <h1>Lista de usuarios</h1>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} style={{ marginTop: "2rem", marginLeft: "1rem" }}>
                                {editUserId === user.id ? (
                                    <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <input type="text" name='name' value={editData.name} onChange={handleEditChange} required />
                                        <input type="email" name='email' value={editData.email} onChange={handleEditChange} required />
                                        <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Nova Senha' required />
                                        <input type="password" name='confirmPassword' value={confirmPassword} onChange={handleEditChange} placeholder='Confirme a Senha' required />
                                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}                       
                                        <button type='submit'>Salvar</button>
                                        <button type='button' onClick={() => setEditUserId(null)}>Cancelar</button>
                                    </form>
                                ) : (
                                    <>
                                        <strong>{user.name}</strong> - <i>{user.email}</i>
                                        <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: '1rem' }}>
                                            <button onClick={() => handleEditClick(user)}>Editar</button>
                                            <button onClick={() => handleDelete(user.id)}>Deletar</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default UsersList