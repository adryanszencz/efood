import styled from 'styled-components'

import { cores } from '../styles'
import { Prato } from '../types'
import { limitaTexto } from '../utils'

const Card = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: ${cores.rosa};
  color: ${cores.bege};

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    display: block;
  }

  h3 {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 900;
  }

  p {
    flex: 1;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 22px;
  }
`

export const BotaoClaro = styled.button`
  width: 100%;
  padding: 4px;
  border: none;
  background-color: ${cores.bege};
  color: ${cores.rosa};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`

type Props = {
  prato: Prato
  aoClicar: () => void
}

const PratoCard = ({ prato, aoClicar }: Props) => (
  <Card>
    <img src={prato.foto} alt={prato.nome} />
    <h3>{prato.nome}</h3>
    <p>{limitaTexto(prato.descricao, 140)}</p>
    <BotaoClaro type="button" onClick={aoClicar}>
      Mais detalhes
    </BotaoClaro>
  </Card>
)

export default PratoCard
