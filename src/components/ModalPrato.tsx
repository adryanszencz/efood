import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { BotaoClaro } from './PratoCard'
import { cores, breakpoints } from '../styles'
import { Prato } from '../types'
import { formataPreco } from '../utils'
import { adicionar, abrir } from '../store/reducers/carrinho'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.73);
`

const Conteudo = styled.div`
  position: relative;
  display: flex;
  gap: 24px;
  width: 1024px;
  max-width: 90%;
  padding: 32px;
  background-color: ${cores.rosa};
  color: ${cores.branco};

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
  }

  h3 {
    font-size: 18px;
    font-weight: 900;
  }

  p {
    margin: 16px 0;
    font-size: 14px;
    line-height: 22px;
  }

  ${BotaoClaro} {
    width: auto;
    padding: 4px 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;

    img {
      width: 100%;
      height: 200px;
    }
  }
`

const Fechar = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: none;
  color: ${cores.branco};
  font-size: 20px;
  cursor: pointer;
`

type Props = {
  prato: Prato
  aoFechar: () => void
}

const ModalPrato = ({ prato, aoFechar }: Props) => {
  const dispatch = useDispatch()

  const adicionarAoCarrinho = () => {
    dispatch(adicionar(prato))
    aoFechar()
    dispatch(abrir())
  }

  return (
    <Overlay onClick={aoFechar}>
      <Conteudo onClick={(e) => e.stopPropagation()}>
        <Fechar type="button" aria-label="Fechar" onClick={aoFechar}>
          ✕
        </Fechar>
        <img src={prato.foto} alt={prato.nome} />
        <div>
          <h3>{prato.nome}</h3>
          <p>{prato.descricao}</p>
          <p>Serve: de {prato.porcao}</p>
          <BotaoClaro type="button" onClick={adicionarAoCarrinho}>
            Adicionar ao carrinho - {formataPreco(prato.preco)}
          </BotaoClaro>
        </div>
      </Conteudo>
    </Overlay>
  )
}

export default ModalPrato
