import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const router = useRouter()

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [toastMessage, setToastMessage] = useState(false)
    const [categoryChanged, setCategoryChanged] = useState(false)

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const {data} = await axios('/api/categorias')
                setCategorias(data.categorias) 
            } catch(error) {
                console.log(error)
            }
        }

        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)
        setCategoriaActual(categoria[0])
        setCategoryChanged(true)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handlePedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoPedido => productoPedido.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoPedido => productoPedido.id === producto.id ? producto : productoPedido)
            setPedido(pedidoActualizado)
            toast.success('Producto guardado correctamente')
        } else {
            setPedido([
                ...pedido,
                producto
            ])
            
            toast.success('Producto agregado correctamente')
        }
        
        setModal(false)
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.find(producto => producto.id === id)
        setProducto(productoActualizar)
        setModal(true)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizar = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizar)
    }

    const handleOrden = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
            
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            
            setToastMessage(true)
            router.push('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                producto,
                modal,
                pedido,
                nombre,
                total,
                toastMessage,
                categoryChanged,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                handlePedido,
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                handleOrden,
                setToastMessage,
                setCategoryChanged
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}


export {
    QuioscoProvider
}

export default QuioscoContext