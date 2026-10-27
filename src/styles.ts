import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  rosa: '#E66767',
  bege: '#FFEBD9',
  fundo: '#FFF8F2',
  branco: '#FFFFFF'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}

export const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body {
    background-color: ${cores.fundo};
    color: ${cores.rosa};
  }
`

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 90%;
  }
`
