import Image from 'next/image'
import { useRouter } from  'next/router'

const pasos = [
    {id: 1, nombre: 'Menú', url: '/'},
    {id: 2, nombre: 'Resumen', url: '/resumen'},
    {id: 3, nombre: 'Datos y Total', url: '/total'}
]

const Pasos = () => {
    const router = useRouter()

    const calcularProgreso = () => {
        if(router.pathname === '/') return 1
        if(router.pathname === '/resumen') return 50
        if(router.pathname === '/total') return 100
    }
    
    return (
        <>
            <div className='md: flex border-b-2'>
                <div 
                    className='md:w-4/12 xl:w-1/4 2xl:w-1/5 mt-2 hover:cursor-pointer'
                    onClick={() => router.push('/')}
                >
                    <Image 
                        width={300} 
                        height={80} 
                        src={'/assets/img/logo.svg'} 
                        alt='Imagen Logotipo' 
                    />
                </div>
                <div className='md:w-8/12 xl:w-3/4 2xl:w-4/5'>
                    <div className='flex justify-between p-5'>
                        {pasos.map(paso => (
                            <button 
                                key={paso.id}
                                className='text-2xl font-bold'
                                onClick={() => router.push(paso.url)}
                            >
                                {paso.nombre}
                            </button>
                        ))}
                    </div>

                    <div className='bg-gray-100 m-5'>
                        <div 
                            className='rounded-ful bg-amber-500 text-xs leading-none h-2 text-center text-white'
                            style={{width: `${calcularProgreso()}%`}}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pasos