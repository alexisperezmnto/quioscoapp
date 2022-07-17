import Head from 'next/head'
import Modal from 'react-modal'
import useQuiosco from '../hooks/useQuiosco'
import Sidebar from '../components/Sidebar'
import ModalProducto from '../components/ModalProducto'
import Pasos from '../components/Pasos'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#__next')

export default function Layout ({children, pagina}) {
    const router = useRouter()
    const {modal, handleChangeModal, toastMessage, setToastMessage, categoryChanged, setCategoryChanged} = useQuiosco()

    useEffect(() => {
        if(categoryChanged) {
            document.getElementById('main').scrollTo(0, 0)
            setCategoryChanged(false)
        }
    }, [categoryChanged])

    useEffect(() => {
        if(router.pathname === '/' && toastMessage) {
            setToastMessage(false)
            toast.success('Orden creada correctamente', {
                toastId: 'orden'
            })
        }
    }, [router.pathname])


    return (
        <div className='md:h-screen md:overflow-hidden'>
            <Head>
                <title>Café - {pagina}</title>
                <meta name='description' content='Quiosco Caferería' />
            </Head>

            <nav className='sticky top-0 bg-white z-50'>
                <Pasos />
            </nav>

            <div className='md:flex'>
                <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5'>
                    <Sidebar />
                </aside>
                
                <main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 md:h-screen md:overflow-y-scroll' id='main'>
                    <div className='p-10 mb-[100px]'>
                        {children}
                    </div>
                </main>
            </div>

            {modal && (
                <Modal
                    closeTimeoutMS={300}
                    isOpen={modal}
                    onRequestClose={handleChangeModal}
                    style={customStyles}
                >
                    <ModalProducto />
                </Modal>
            )}

            <ToastContainer 
                autoClose='3000'
                hideProgressBar='true'
            />

            
        </div>
    )
}