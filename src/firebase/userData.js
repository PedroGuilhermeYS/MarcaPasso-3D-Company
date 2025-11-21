import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function salvarCarrinho(uid, itens) {
  const ref = doc(db, "usuarios", uid, "dados", "carrinho");
  await setDoc(ref, { itens }, { merge: true });
}

export async function carregarCarrinho(uid) {
  const ref = doc(db, "usuarios", uid, "dados", "carrinho");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().itens : [];
}

export async function salvarFavoritos(uid, itens) {
  const ref = doc(db, "usuarios", uid, "dados", "favoritos");
  await setDoc(ref, { itens }, { merge: true });
}

export async function carregarFavoritos(uid) {
  const ref = doc(db, "usuarios", uid, "dados", "favoritos");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().itens : [];
}