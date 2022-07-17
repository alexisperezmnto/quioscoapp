import { useEffect, useState } from 'react'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'
import Layout from '../layout/Layout'

export default function Total() {
    const [data, setData] = useState(false)

    const {pedido, nombre, total, setNombre, handleOrden} = useQuiosco()

    const comprobarPedido = () => {
        return pedido.length === 0 || nombre.trim() === '' || nombre.length < 3;
    }

    useEffect(() => {
        if(pedido.length === 0) setNombre('')
        setData(true)
    }, [])

    useEffect(() => {
        comprobarPedido()
    }, [pedido])

    if(!data) return

    return (
        <Layout pagina='Total'>
            <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10'>Confirma tu Pedido a Continuación</p>

            <form
                onSubmit={handleOrden}
            >
                <div>
                    <label 
                        htmlFor='nombre'
                        className='block uppercase text-slate-800 font-bold text-xl'
                    >
                        Nombre
                    </label>
                    <input 
                        type='text' 
                        className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2'
                        id='nombre'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='mt-10'>
                    <p>
                        Total a Pagar: <span className='font-bold'>{`${formatearDinero(total)}`}</span>
                    </p>
                </div>

                <div className='mt-5'>
                    <input
                        type='submit'
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}