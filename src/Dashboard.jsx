import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Menu } from "./components/menu";
import { api } from "./api/api";
import styles from "./Dashboard.module.css"


function Dashboard() {
    const navigate = useNavigate();
    
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0)
   

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(!storedUser)
            navigate("/")
    }, [navigate])

    useEffect(() => {
        async function fetchData(){
            try{
                const[userRes, productsRes] = await Promise.all([
                    api.get("/users"),
                    api.get("/list")
                ])
                setUserCount(userRes.data.length)
                setProductCount(productsRes.data.length)
            }catch(err){
                console.log("erro ao buscar dados do dashboard", err)
            }
        }
        fetchData()
    }, [])
    
    
    return( 
        <section>
            <Menu />
            <div className={styles.wrapNav}>
                <div className={styles.wrapItem} onClick={() => navigate("/")}>
                     <p>Criar produtos </p>   
                </div>
                <div className={styles.wrapItem} onClick={() => navigate("/list")}>
                    <p>Lista de produtos - ({productCount}) produtos</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate("/#")}>
                    <p>Criar usuario</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate("/usersList")}>
                    <p>Lista usuarios - ({userCount}) listas</p>
                </div>
            </div>
        </section>

    )
}

export default Dashboard

