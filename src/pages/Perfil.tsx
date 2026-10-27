import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import PratoCard from '../components/PratoCard'
import ModalPrato from '../components/ModalPrato'
import { Container, breakpoints } from '../styles'
import { useGetRestauranteQuery } from '../services/api'
import { Prato } from '../types'

const Lista = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 56px 0 120px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const Mensagem = styled.p`
  padding: 80px 0;
  text-align: center;
  font-weight: 700;
`

const Perfil = () => {
  const { id } = useParams()
  const { data: restaurante, isLoading, isError } = useGetRestauranteQuery(id as string)
  const [pratoSelecionado, setPratoSelecionado] = useState<Prato | null>(null)

  return (
    <>
      <Header tipo="perfil" />
      {isLoading && <Mensagem>Carregando...</Mensagem>}
      {isError && <Mensagem>Restaurante não encontrado.</Mensagem>}
      {restaurante && (
        <>
          <Banner restaurante={restaurante} />
          <Container>
            <Lista>
              {restaurante.cardapio.map((prato) => (
                <PratoCard key={prato.id} prato={prato} aoClicar={() => setPratoSelecionado(prato)} />
              ))}
            </Lista>
          </Container>
        </>
      )}
      {pratoSelecionado && (
        <ModalPrato prato={pratoSelecionado} aoFechar={() => setPratoSelecionado(null)} />
      )}
      <Footer />
    </>
  )
}

export default Perfil
