import './usersList.module.css'

import { useState, useEffect } from 'react'
import { api } from './api/api.ts'
import { Menu } from './components/menu.jsx'

function List() {
    const navigate = useNavigate()
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editProductId, setEditProductId] = useState(null)
    const [editData, setEditData] = useState({ description: '', price: '', quantity: '' })

    useEffect(() => {
        const storedUser = localStorage.getItem('list')
        if (!storedUser) navigate("/")
    }, [navigate])

    const fetchProducts = async () => {
        try {
            const response = await api.get('/list')
            setLists(response.data)
        } catch (err) {
            setError('Error ao carregar Produtos', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        try {
            await api.delete(`/list/${id}`)
            setLists(lists.filter((unity) => unity.id !== id))
        } catch (err) {
            setError("Erro ao deletar usuário: ", err)
        }
    }

    const handleEditClick = (list) => {
        setEditProductId(list.id)
        setEditData({ description: list.description, price: list.price, quantity: list.price }) //nao mostra a senha antiga
    }

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
        <section>
            <Menu></Menu>
     
            <div style={{ padding: '2rem' }}>
                <h1>Lista de objetos</h1>
                <ul style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '1rem'}}>
                    {lists.map((item) => (
                        <li key={item.id}>
                            <strong>{item.description}</strong> - <br /><i>{item.price}</i> - <br /><i>{item.quantity}</i> - <br /><img src={item.image} alt="image" style={{width: 200, height: 200}}/>
                        </li>
                    )
                    )}
                </ul>
            </div>
            </section>
        </>
    )
}

export default List
