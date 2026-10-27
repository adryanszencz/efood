import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { BotaoClaro } from './PratoCard'
import { cores } from '../styles'
import { RootReducer } from '../store'
import { fechar, remover } from '../store/reducers/carrinho'
import { formataPreco } from '../utils'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`

const Sidebar = styled.aside`
  width: 360px;
  max-width: 100%;
  height: 100%;
  padding: 32px 8px;
  overflow-y: auto;
  background-color: ${cores.rosa};
  color: ${cores.bege};
`

const Item = styled.li`
  position: relative;
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: ${cores.bege};
  color: ${cores.rosa};

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 900;
  }

  span {
    font-size: 14px;
  }
`

const Lixeira = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  border: none;
  background: none;
  color: ${cores.rosa};
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 16px;
  font-size: 14px;
  font-weight: 700;
`

const Vazio = styled.p`
  text-align: center;
  font-size: 14px;
`

const Carrinho = () => {
  const dispatch = useDispatch()
  const { itens, estaAberto } = useSelector((state: RootReducer) => state.carrinho)

  if (!estaAberto) return null

  // o valor da compra é a soma do preço de todos os produtos do carrinho
  const valorTotal = itens.reduce((total, item) => total + item.preco, 0)

  return (
    <Overlay onClick={() => dispatch(fechar())}>
      <Sidebar onClick={(e) => e.stopPropagation()} aria-label="Carrinho">
        {itens.length === 0 ? (
          <Vazio>O carrinho está vazio. Adicione um prato para continuar.</Vazio>
        ) : (
          <>
            <ul>
              {itens.map((item, indice) => (
                <Item key={`${item.id}-${indice}`}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <span>{formataPreco(item.preco)}</span>
                  </div>
                  <Lixeira type="button" aria-label={`Remover ${item.nome}`} onClick={() => dispatch(remover(indice))}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" />
                    </svg>
                  </Lixeira>
                </Item>
              ))}
            </ul>
            <Total>
              <span>Valor total</span>
              <span>{formataPreco(valorTotal)}</span>
            </Total>
            <BotaoClaro type="button">Continuar com a entrega</BotaoClaro>
          </>
        )}
      </Sidebar>
    </Overlay>
  )
}

export default Carrinho
