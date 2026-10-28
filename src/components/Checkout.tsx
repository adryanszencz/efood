import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { BotaoClaro } from './PratoCard'
import { cores } from '../styles'
import { fechar, limpar } from '../store/reducers/carrinho'
import { useFinalizarPedidoMutation } from '../services/api'
import { Prato } from '../types'
import { formataPreco } from '../utils'

const Formulario = styled.form`
  h2 {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 700;
  }

  ${BotaoClaro} + ${BotaoClaro} {
    margin-top: 8px;
  }
`

const Campo = styled.div`
  flex: 1;
  margin-bottom: 8px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
  }

  input {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: 2px solid ${cores.bege};
    background-color: ${cores.bege};
    color: #4b4b4b;
    font-size: 14px;
    font-weight: 700;
  }

  input.erro {
    border-color: #ff0000;
  }
`

const Linha = styled.div<{ $colunas?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$colunas || '1fr 1fr'};
  column-gap: 34px;
`

const Botoes = styled.div`
  margin-top: 16px;
`

const Confirmacao = styled.div`
  h2 {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 700;
  }

  p {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 22px;
  }
`

const Aviso = styled.p`
  margin-top: 8px;
  font-size: 14px;
`

type Etapa = 'entrega' | 'pagamento' | 'confirmacao'

const camposIniciais = {
  destinatario: '',
  endereco: '',
  cidade: '',
  cep: '',
  numero: '',
  complemento: '',
  nomeCartao: '',
  numeroCartao: '',
  cvv: '',
  mes: '',
  ano: ''
}

type Campos = typeof camposIniciais

// só deixa números, para validar CEP, cartão, CVV e data
const soNumeros = (valor: string) => valor.replace(/\D/g, '')

const errosEntrega = (c: Campos) => ({
  destinatario: c.destinatario.trim().length < 5,
  endereco: c.endereco.trim().length < 5,
  cidade: c.cidade.trim().length < 3,
  cep: soNumeros(c.cep).length !== 8,
  numero: soNumeros(c.numero).length === 0
})

const errosPagamento = (c: Campos) => {
  const mes = Number(c.mes)
  return {
    nomeCartao: c.nomeCartao.trim().length < 5,
    numeroCartao: soNumeros(c.numeroCartao).length !== 16,
    cvv: soNumeros(c.cvv).length !== 3,
    mes: !(mes >= 1 && mes <= 12),
    ano: soNumeros(c.ano).length !== 4
  }
}

type Props = {
  itens: Prato[]
  valorTotal: number
  aoVoltar: () => void
}

const Checkout = ({ itens, valorTotal, aoVoltar }: Props) => {
  const dispatch = useDispatch()
  const [finalizarPedido, { data, isLoading, isError }] = useFinalizarPedidoMutation()
  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [campos, setCampos] = useState<Campos>(camposIniciais)
  const [tentouEnviar, setTentouEnviar] = useState(false)

  const aoMudar = (e: ChangeEvent<HTMLInputElement>) =>
    setCampos({ ...campos, [e.target.name]: e.target.value })

  const erros: Partial<Record<keyof Campos, boolean>> =
    etapa === 'entrega' ? errosEntrega(campos) : errosPagamento(campos)
  const temErro = Object.values(erros).some(Boolean)

  const classe = (campo: keyof Campos) => (tentouEnviar && erros[campo] ? 'erro' : '')

  const campo = (nome: keyof Campos, rotulo: string, props: Record<string, unknown> = {}) => (
    <Campo>
      <label htmlFor={nome}>{rotulo}</label>
      <input id={nome} name={nome} value={campos[nome]} onChange={aoMudar} className={classe(nome)} {...props} />
    </Campo>
  )

  const irParaPagamento = (e: FormEvent) => {
    e.preventDefault()
    setTentouEnviar(true)
    if (temErro) return
    setTentouEnviar(false)
    setEtapa('pagamento')
  }

  const pagar = async (e: FormEvent) => {
    e.preventDefault()
    setTentouEnviar(true)
    if (temErro) return

    try {
      await finalizarPedido({
        products: itens.map((item) => ({ id: item.id, price: item.preco })),
        delivery: {
          receiver: campos.destinatario,
          address: {
            description: campos.endereco,
            city: campos.cidade,
            zipCode: campos.cep,
            number: Number(soNumeros(campos.numero)),
            complement: campos.complemento
          }
        },
        payment: {
          card: {
            name: campos.nomeCartao,
            number: campos.numeroCartao,
            code: Number(campos.cvv),
            expires: { month: Number(campos.mes), year: Number(campos.ano) }
          }
        }
      }).unwrap()
      setEtapa('confirmacao')
      dispatch(limpar())
    } catch {
      // a mensagem de erro aparece abaixo dos botões (isError)
    }
  }

  const concluir = () => {
    dispatch(fechar())
    aoVoltar()
  }

  if (etapa === 'confirmacao' && data) {
    return (
      <Confirmacao>
        <h2>Pedido realizado - {data.orderId}</h2>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no
          endereço fornecido.
        </p>
        <p>Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.</p>
        <p>
          Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e
          bem-estar durante a refeição.
        </p>
        <p>Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!</p>
        <BotaoClaro type="button" onClick={concluir}>
          Concluir
        </BotaoClaro>
      </Confirmacao>
    )
  }

  if (etapa === 'pagamento') {
    return (
      <Formulario onSubmit={pagar} noValidate>
        <h2>Pagamento - Valor a pagar {formataPreco(valorTotal)}</h2>
        {campo('nomeCartao', 'Nome no cartão')}
        <Linha $colunas="2fr 1fr">
          {campo('numeroCartao', 'Número do cartão', { inputMode: 'numeric', maxLength: 19 })}
          {campo('cvv', 'CVV', { inputMode: 'numeric', maxLength: 3 })}
        </Linha>
        <Linha>
          {campo('mes', 'Mês de vencimento', { inputMode: 'numeric', maxLength: 2 })}
          {campo('ano', 'Ano de vencimento', { inputMode: 'numeric', maxLength: 4 })}
        </Linha>
        <Botoes>
          <BotaoClaro type="submit" disabled={isLoading}>
            {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
          </BotaoClaro>
          <BotaoClaro type="button" onClick={() => setEtapa('entrega')}>
            Voltar para a edição de endereço
          </BotaoClaro>
        </Botoes>
        {tentouEnviar && temErro && <Aviso>Confira os campos destacados.</Aviso>}
        {isError && <Aviso>Não foi possível finalizar o pedido. Tente novamente.</Aviso>}
      </Formulario>
    )
  }

  return (
    <Formulario onSubmit={irParaPagamento} noValidate>
      <h2>Entrega</h2>
      {campo('destinatario', 'Quem irá receber')}
      {campo('endereco', 'Endereço')}
      {campo('cidade', 'Cidade')}
      <Linha>
        {campo('cep', 'CEP', { inputMode: 'numeric', maxLength: 9 })}
        {campo('numero', 'Número', { inputMode: 'numeric' })}
      </Linha>
      {campo('complemento', 'Complemento (opcional)')}
      <Botoes>
        <BotaoClaro type="submit">Continuar com o pagamento</BotaoClaro>
        <BotaoClaro type="button" onClick={aoVoltar}>
          Voltar para o carrinho
        </BotaoClaro>
      </Botoes>
      {tentouEnviar && temErro && <Aviso>Confira os campos destacados.</Aviso>}
    </Formulario>
  )
}

export default Checkout
