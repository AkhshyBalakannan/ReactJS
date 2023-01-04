import success from '../../assets/icons/success.svg'
import failure from '../../assets/icons/failure.svg'

const Modal = ({type='success', title='', message=''}) => {

    const icon = type==='success' ? (<img src={success} />):(<img src={failure} />)

    return (
        <div className='modal-container'>
            <div className='modal-top'>
                {icon}
            </div>
            <div className='modal-bottom'>
                hello
            </div>
        </div>
    )
}

export default Modal
