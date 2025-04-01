
function Modal({open, onClose, children}) {
    console.log(open)
  return (
    <div className={`${open ? 'visible bg-black/20' : 'hidden'} fixed inset-0  flexCenter transition-colors `}
    onClick={onClose} 
    >
        <div className="bg-white p-4 rounded-md ">
            {children}
        </div>

    </div>
  )
}

export default Modal