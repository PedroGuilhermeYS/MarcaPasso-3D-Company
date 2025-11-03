import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePesquisaStore = defineStore('pesquisa', () => {
  const termo = ref('')

  function atualizarPesquisa(novoTermo) {
    termo.value = novoTermo
  }

  return { termo, atualizarPesquisa }
})