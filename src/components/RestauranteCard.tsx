import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { cores } from '../styles'
import { Restaurante } from '../types'
import { capitaliza, limitaTexto } from '../utils'

const Card = styled.li`
  position: relative;
  background-color: ${cores.branco};
  border: 1px solid ${cores.rosa};

  > img {
    width: 100%;
    height: 217px;
    object-fit: cover;
    display: block;
  }
`

const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

export const Tag = styled.span`
  padding: 6px 4px;
  background-color: ${cores.rosa};
  color: ${cores.bege};
  font-size: 12px;
  font-weight: 700;
`

const Conteudo = styled.div`
  padding: 8px;

  p {
    margin: 16px 0;
    font-size: 14px;
    line-height: 22px;
  }
`

const Titulo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
`

export const BotaoLink = styled(Link)`
  display: inline-block;
  padding: 4px 6px;
  background-color: ${cores.rosa};
  color: ${cores.bege};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
`

type Props = {
  restaurante: Restaurante
}

const RestauranteCard = ({ restaurante }: Props) => (
  <Card>
    <img src={restaurante.capa} alt={restaurante.titulo} />
    <Tags>
      {restaurante.destacado && <Tag>Destaque da semana</Tag>}
      <Tag>{capitaliza(restaurante.tipo)}</Tag>
    </Tags>
    <Conteudo>
      <Titulo>
        <h3>{restaurante.titulo}</h3>
        <span>{restaurante.avaliacao} ⭐</span>
      </Titulo>
      <p>{limitaTexto(restaurante.descricao, 250)}</p>
      <BotaoLink to={`/perfil/${restaurante.id}`}>Saiba mais</BotaoLink>
    </Conteudo>
  </Card>
)

export default RestauranteCard
