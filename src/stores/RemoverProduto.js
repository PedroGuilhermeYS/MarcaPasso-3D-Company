import { db } from '@/firebase/firebase'
import { supabase } from '@/supabase/supabase'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'

export async function removerProduto(id) {
  if (!id) {
    throw new Error('ID inválido')
  }

  const pasta = id

  const refDoc = doc(db, 'produtos', id)

  const { data: arquivos } = await supabase.storage
    .from('produtos')
    .list(pasta, { limit: 1000 })

  if (arquivos && arquivos.length > 0) {
    const caminhos = arquivos.map(a => `${pasta}/${a.name}`)

    await supabase.storage
      .from('produtos')
      .remove(caminhos)
  }

  await deleteDoc(refDoc)
}