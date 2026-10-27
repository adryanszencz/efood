import styled from 'styled-components'

import Header from '../components/Header'
import Footer from '../components/Footer'
import RestauranteCard from '../components/RestauranteCard'
import { Container, breakpoints } from '../styles'
import { useGetRestaurantesQuery } from '../services/api'

const Lista = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px 80px;
  padding: 80px 0 120px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 0 80px;
  }
`

const Mensagem = styled.p`
  padding: 80px 0;
  text-align: center;
  font-weight: 700;
`

const Home = () => {
  const { data: restaurantes, isLoading, isError } = useGetRestaurantesQuery()

  return (
    <>
      <Header tipo="home" />
      <Container>
        {isLoading && <Mensagem>Carregando restaurantes...</Mensagem>}
        {isError && <Mensagem>Não foi possível carregar os restaurantes.</Mensagem>}
        {restaurantes && (
          <Lista>
            {restaurantes.map((restaurante) => (
              <RestauranteCard key={restaurante.id} restaurante={restaurante} />
            ))}
          </Lista>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Home
