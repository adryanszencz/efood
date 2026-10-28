import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Pedido, RespostaPedido, Restaurante } from '../types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getRestaurantes: builder.query<Restaurante[], void>({
      query: () => 'restaurantes'
    }),
    getRestaurante: builder.query<Restaurante, string>({
      query: (id) => `restaurantes/${id}`
    }),
    finalizarPedido: builder.mutation<RespostaPedido, Pedido>({
      query: (pedido) => ({
        url: 'checkout',
        method: 'POST',
        body: pedido
      })
    })
  })
})

export const { useGetRestaurantesQuery, useGetRestauranteQuery, useFinalizarPedidoMutation } = api

export default api
