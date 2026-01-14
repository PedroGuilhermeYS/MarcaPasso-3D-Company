import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { auth } from '@/firebase/firebase.js'
import { supabase } from '@/lib/supabase.js'

export const useProdutosStore = defineStore('produtos', () => {
  const produtos = ref([])
  const carregando = ref(false)
  const erro = ref(null)
  const db = getFirestore(auth.app)

  const carregarProdutos = async () => {
    carregando.value = true
    erro.value = null

    try {
      // Buscar produtos no Firebase
      const snap = await getDocs(collection(db, 'produtos'))
      const listaFirebase = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Buscar imagem principal de cada produto no Supabase
      const listaFinal = await Promise.all(
        listaFirebase.map(async (p) => {

          // Listar arquivos dentro da pasta
          const { data: arquivos, error } = await supabase
            .storage
            .from('produtos')
            .list(p.id)
            
          if (error) {
            console.warn(`Erro ao buscar imagens do produto ${p.id}:`, error)
            p.imagem = null
          } else {
            // Procurar foto principal
            const principal = arquivos.find(arq => arq.name.startsWith('principal_'))
            if (principal) {
              const { data: urlData } = supabase
                .storage
                .from('produtos')
                .getPublicUrl(`${p.id}/${principal.name}`)
              p.imagem = urlData.publicUrl
            } else {
              p.imagem = null
            }
          }

          return p
        })
      )

      produtos.value = listaFinal
      console.log('✅ Produtos carregados:', produtos.value)

    } catch (e) {
      console.error('Erro ao carregar produtos:', e)
      erro.value = e.message || 'Erro ao carregar produtos'
    } finally {
      carregando.value = false
    }
  }

  return { produtos, carregarProdutos, carregando, erro }
})
