import {
  getTodosProdutosNaApi,
  getProdutoNaApi,
  addProdutoNaApi,
  removeProdutoNaApi,
  atualizaProdutoNaApi,
} from '@/api/produto'

import { supabase } from '@/lib/supabase.js'

export function useProdutoService() {
  async function uploadArquivo(caminho, arquivo) {
    const { data, error } = await supabase.storage
      .from('produtos')
      .upload(caminho, arquivo)

    if (error) throw error

    const { data: url } = supabase.storage
      .from('produtos')
      .getPublicUrl(data.path)

    return url.publicUrl
  }

  async function uploadImagensProduto(idProduto, imagemPrincipal, imagensSecundarias) {
    const basePath = `${idProduto}/`

    let imagemPrincipalUrl = ''
    if (imagemPrincipal) {
      imagemPrincipalUrl = await uploadArquivo(
        basePath + 'principal_' + imagemPrincipal.name,
        imagemPrincipal
      )
    }

    const imagensSec = []
    for (const img of imagensSecundarias) {
      const url = await uploadArquivo(
        basePath + 'secundaria_' + img.name,
        img
      )
      imagensSec.push(url)
    }

    return {
      imagemPrincipal: imagemPrincipalUrl,
      imagensSecundarias: imagensSec,
    }
  }

  function extrairPathDaPublicUrl(url) {
    if (!url) return null
    try {
      const marker = '/produtos/'
      const idx = url.indexOf(marker)
      if (idx === -1) return null
      return decodeURIComponent(url.substring(idx + marker.length))
    } catch (err) {
      console.warn('Falha ao extrair path da publicUrl', url, err)
      return null
    }
  }

  async function buscarTodos() {
    return await getTodosProdutosNaApi()
  }

  async function buscarProduto(id) {
    return await getProdutoNaApi(id)
  }

  async function adicionarProduto(produto) {
    const idProduto = crypto.randomUUID()

    const imagens = await uploadImagensProduto(
      idProduto,
      produto.imagemPrincipal,
      produto.imagensSecundarias || []
    )

    return await addProdutoNaApi({
      id: idProduto,
      ...produto,
      ...imagens,
      criadoEm: new Date(),
    })
  }

  async function removerProduto(id) {
    let produto = null
    try {
      produto = await getProdutoNaApi(id)
    } catch (err) {
      throw err
    }

    const pathsParaRemover = []

    const principalUrl = produto?.imagemPrincipal
    if (principalUrl) {
      const p = extrairPathDaPublicUrl(principalUrl)
      if (p) pathsParaRemover.push(p)
    }

    const secundarias = produto?.imagensSecundarias ?? []
    for (const url of secundarias) {
      const p = extrairPathDaPublicUrl(url)
      if (p) pathsParaRemover.push(p)
    }

    if (pathsParaRemover.length > 0) {
      const { error } = await supabase.storage
        .from('produtos')
        .remove(pathsParaRemover)

      if (error) {
        console.error('Erro ao remover arquivos do bucket:', error)
        throw error
      }
    }

    return await removeProdutoNaApi(id)
  }

  async function atualizarProduto(id, produto) {
    return await atualizaProdutoNaApi(id, produto)
  }

  return {
    buscarTodos,
    buscarProduto,
    adicionarProduto,
    removerProduto,
    atualizarProduto,
  }
}
