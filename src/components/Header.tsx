import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Logo from './Logo'
import { Container, cores, breakpoints } from '../styles'
import { RootReducer } from '../store'
import { abrir } from '../store/reducers/carrinho'

// Fundo com um padrão leve, como no layout
const Fundo = styled.header`
  background-color: ${cores.bege};
  background-image: radial-gradient(${cores.rosa}22 1.5px, transparent 1.5px);
  background-size: 24px 24px;
`

const HeaderHome = styled.div`
  padding: 40px 0;
  text-align: center;

  h1 {
    max-width: 540px;
    margin: 120px auto 0;
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    h1 {
      margin-top: 60px;
      font-size: 28px;
      line-height: 34px;
    }
  }
`

const HeaderPerfil = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 60px 0;
  font-size: 18px;
  font-weight: 900;

  a {
    color: ${cores.rosa};
    text-decoration: none;
  }

  button {
    justify-self: end;
    border: none;
    background: none;
    color: ${cores.rosa};
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 16px;
    padding: 32px 0;

    button {
      justify-self: center;
    }
  }
`

type Props = {
  tipo: 'home' | 'perfil'
}

const Header = ({ tipo }: Props) => {
  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.carrinho)

  if (tipo === 'home') {
    return (
      <Fundo>
        <Container>
          <HeaderHome>
            <Link to="/">
              <Logo />
            </Link>
            <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
          </HeaderHome>
        </Container>
      </Fundo>
    )
  }

  return (
    <Fundo>
      <Container>
        <HeaderPerfil>
          <Link to="/">Restaurantes</Link>
          <Link to="/">
            <Logo />
          </Link>
          <button type="button" onClick={() => dispatch(abrir())}>
            {itens.length} produto(s) no carrinho
          </button>
        </HeaderPerfil>
      </Container>
    </Fundo>
  )
}

export default Header
