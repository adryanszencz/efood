import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Prato } from '../../types'

type CarrinhoState = {
  itens: Prato[]
  estaAberto: boolean
}

const initialState: CarrinhoState = {
  itens: [],
  estaAberto: false
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Prato>) => {
      state.itens.push(action.payload)
    },
    remover: (state, action: PayloadAction<number>) => {
      // remove apenas uma unidade, pela posição na lista
      state.itens.splice(action.payload, 1)
    },
    abrir: (state) => {
      state.estaAberto = true
    },
    fechar: (state) => {
      state.estaAberto = false
    }
  }
})

export const { adicionar, remover, abrir, fechar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
