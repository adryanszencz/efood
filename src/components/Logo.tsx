import styled from 'styled-components'

import { cores } from '../styles'

const LogoTexto = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1px;
  color: ${cores.rosa};

  svg {
    width: 28px;
    height: 28px;
  }
`

// Logo simples do efood: talheres + nome
const Logo = () => (
  <LogoTexto aria-label="efood">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
    efood
  </LogoTexto>
)

export default Logo
