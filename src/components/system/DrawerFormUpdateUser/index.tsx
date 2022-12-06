import { FaSave, FaTrash } from 'react-icons/fa'
import { reactSwal, sweetAlertOptions } from '@/utils/sweetAlert'

import Drawer from '@/components/shared/Drawer'
import { useCallback } from 'react'

interface IDrawerFormUpdateUserProps {
    open: boolean
    onClose: () => void
}

function DrawerFormUpdateUser({ open, onClose }: IDrawerFormUpdateUserProps): JSX.Element {
    const handleDeleteUser = useCallback(async () => {
        reactSwal
            .fire({
                title: 'Tem certeza que deseja remover dados?',
                cancelButtonColor: sweetAlertOptions.cancelButtonColor,
                cancelButtonText: 'Cancelar!',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                confirmButtonText: 'Sim, remover!',
                icon: 'question',
                showCancelButton: true,
                text: 'Esta ação não pode ser revertida',
            })
            .then(async (result) => {
                console.log(result)
            })
    }, [])

    return (
        <Drawer
            onClose={onClose}
            open={open}
            title='Atualize seus dados'
        >
            <form className='flex h-full flex-col divide-y divide-gray-200 bg-white border-t-2'>
                <div className='flex-1 flex flex-col overflow-y-auto px-4 space-y-2 py-4'></div>
                <div className='flex flex-shrink-0 justify-between px-4 py-4 items-center'>
                    <button
                        className='flex items-center justify-center py-1 px-1 sm:px-2 text-left text-sm sm:text-md text-red-600 font-semibold shadow rounded border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                        onClick={handleDeleteUser}
                        type='button'
                    >
                        <FaTrash className='w-4 h-4 mr-2' /> Remover dados
                    </button>
                    <button
                        className='flex items-center justify-center py-1 sm:py-2 px-2 sm:px-4 text-center text-lg text-white font-semibold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'
                        type='submit'
                    >
                        <FaSave className='w-4 h-4 mr-2' /> Salvar
                    </button>
                </div>
            </form>
        </Drawer>
    )
}

export default DrawerFormUpdateUser
