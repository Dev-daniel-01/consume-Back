import './usersList.module.css'

import { useState, useEffect } from 'react'
import { api } from './api/api'

function UsersList() {

    const [users, setUsers] = useState([])
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get('/users')
                setUsers(response.data)
            } catch (err) {
                setError('Error ao carregar usuarios', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        async function fetchList() {
            try {
                const response2 = await api.get('/list')
                setLists(response2.data)
            } catch (erro) {
                setError('Error ao carregar objetos', erro)
            } finally {
                setLoading(false)
            }
        }

        fetchList()
    }, [])

    if (loading) return <p>carregando...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div style={{ padding: '2rem' }}>
                <h1>Lista de usuarios</h1>
                <ul>
                    {users.map((item) => (
                        <li key={item.id}>
                            <strong>{item.name}</strong> - <i>{item.email}</i>
                        </li>
                    )
                    )}
                </ul>
            </div>

            <div style={{ padding: '2rem' }}>
                <h1>Lista de objetos</h1>
                <ul>
                    {lists.map((item) => (
                        <li key={item.id}>
                            <strong>{item.description}</strong> - <br /><i>{item.price}</i> - <br /><i>{item.quantity}</i> - <br /><img src={item.image} alt="image" style={{width: 200, height: 200}}/>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </>
    )
}

export default UsersList
