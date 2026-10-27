import styled from 'styled-components'

import Logo from './Logo'
import { cores } from '../styles'

const Rodape = styled.footer`
  padding: 40px 0;
  background-color: ${cores.bege};
  text-align: center;

  p {
    max-width: 480px;
    margin: 0 auto;
    font-size: 10px;
  }
`

const Redes = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px 0 80px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${cores.rosa};
    color: ${cores.bege};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`

const Footer = () => (
  <Rodape>
    <Logo />
    <Redes>
      <li>
        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </a>
      </li>
      <li>
        <a href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />
          </svg>
        </a>
      </li>
      <li>
        <a href="#" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 5.9c-.7.3-1.5.6-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.8 9 11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.6 2.1 2.8 3.9 2.9A8.2 8.2 0 0 1 2 18.4 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
          </svg>
        </a>
      </li>
    </Redes>
    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega,
      qualidade dos produtos é toda do estabelecimento contratado.
    </p>
  </Rodape>
)

export default Footer
