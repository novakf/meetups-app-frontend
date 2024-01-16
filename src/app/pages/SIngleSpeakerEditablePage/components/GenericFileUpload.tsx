import React, { ChangeEvent, MouseEvent, useState } from 'react'
import styled from 'styled-components'
import UploadIcon from '../../../icons/UploadIcon'

type Props = {
  chosenFile: any
  isMobile?: boolean
  handleFile: (files: any) => void
}

const GenericFileUpload: React.FC<Props> = (props) => {
  const [imgSrc, setimgSrc] = useState(props.chosenFile)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()

    let reader = new FileReader()
    reader.onload = (e) => {
      setimgSrc(e.target?.result as any)
    }

    if (e.target.files && e.target.files[0]) {
      props.handleFile(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    inputRef.current?.click()
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()} $chosen={Boolean(props.chosenFile)}>
      <FileInput ref={inputRef} type="file" multiple={true} onChange={handleChange} />
      <InputLabel onClick={onButtonClick}>
        {!props.chosenFile ? (
          <UploadButton>
            <div>Фото спикера</div>
            <UploadIcon />
          </UploadButton>
        ) : (
          <UploadButton $hasImage>
            <ImageContainer>
              <Image src={typeof props.chosenFile == 'string' ? props.chosenFile : imgSrc} />
            </ImageContainer>
            <UploadIcon />
          </UploadButton>
        )}
      </InputLabel>
    </Form>
  )
}

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Image = styled.img`
  width: 100%;
`

const Form = styled.form<{ $chosen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fff;

  &:hover {
    ${(props) => props.$chosen && 'backdrop-filter: brightness(0.98);'}
  }
`

const FileInput = styled.input`
  display: none !important;
`

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
`

const UploadButton = styled.button<{ $hasImage?: boolean }>`
  display: flex;
  padding: 0;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  border: none;
  background-color: transparent;
  color: #000;
  z-index: 2;
  height: 100%;
  width: 100%;

  svg {
    position: absolute;
    opacity: 0;
    transition: 0.3s;
    height: 52px;

    ${(props) => props.$hasImage && 'path {stroke: white;}'}
  }
  div {
    transition: 0.3s;
  }
  img {
    transition: 0.3s;
  }

  &:hover {
    img {
      filter: blur(4px) opacity(0.8);
    }
    svg {
      opacity: 1;
    }
    div {
      ${(props) => !props.$hasImage && 'opacity: 0;'}
    }
  }
`

export default GenericFileUpload
