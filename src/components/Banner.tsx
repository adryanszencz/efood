import styled from 'styled-components'

import { Container } from '../styles'
import { Restaurante } from '../types'
import { capitaliza } from '../utils'

const Imagem = styled.div`
  position: relative;
  height: 280px;
  background-size: cover;
  background-position: center;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${Container} {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 24px 0 32px;
  }

  span {
    font-size: 32px;
    font-weight: 100;
  }

  h2 {
    font-size: 32px;
    font-weight: 900;
  }
`

type Props = {
  restaurante: Restaurante
}

const Banner = ({ restaurante }: Props) => (
  <Imagem style={{ backgroundImage: `url(${restaurante.capa})` }}>
    <Container>
      <span>{capitaliza(restaurante.tipo)}</span>
      <h2>{restaurante.titulo}</h2>
    </Container>
  </Imagem>
)

export default Banner
