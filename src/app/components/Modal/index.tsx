import React, { useEffect, useState, createRef } from 'react'
import Styled from './styles'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const GenericModal: React.FC<Props> = (props) => {
  const modalRef = createRef<HTMLDivElement>()
  const { open, onClose } = props
  const [internalOpen, setInternalOpen] = useState(open)

  const handleClick = () => {
    onClose?.()
  }

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeEsc)
    return () => window.removeEventListener('keydown', closeEsc)
  }, [])

  useEffect(() => {
    if (!modalRef.current) return

    const modal = modalRef.current

    setTimeout(() => {
      if (open) setInternalOpen(true)
      else setInternalOpen(false)
    })

    const detectMousePosition = (e: MouseEvent) => {
      if (internalOpen) return

      var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        modalWidth = modal.offsetWidth,
        modalHeight = modal.offsetHeight,
        _x = e.clientX,
        _y = e.clientY

      var x = _x - windowWidth / 2 + modalWidth / 2
      var y = _y - windowHeight / 2 + modalHeight / 2

      modal.style.transformOrigin = `${x}px ${y}px`
    }

    document.addEventListener('click', detectMousePosition)

    return () => {
      document.removeEventListener('click', detectMousePosition)
    }
  }, [open])

  return (
    <Styled.ModalWrapper $open={internalOpen} onClick={handleClick}>
      <Styled.ModalContent
        id="modal-content"
        ref={modalRef}
        $open={internalOpen}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {props.children}
      </Styled.ModalContent>
    </Styled.ModalWrapper>
  )
}

export default GenericModal
