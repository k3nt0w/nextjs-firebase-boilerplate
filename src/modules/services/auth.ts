import { ExNextPageContext } from 'next'
import { auth } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import Router from 'next/router'

export const authenticate = async (req: ExNextPageContext['req']): Promise<Credential | undefined> => {
  let credential: Credential | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const credential = req.session.credential
    return credential
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true)
      return {
        uid: user.uid,
        token: idTokenResult.token,
        displayName: user.displayName,
        avatarURL: user.photoURL
      }
    }
  }

  return credential
}

export const authorize = async (res: ExNextPageContext['res'], store: ExNextPageContext['store']) => {
  const credential = store.getState().auth.credential

  // サーバー上での処理
  if (res && !credential) {
    res!.writeHead(302, {
      Location: '/sign_in'
    })
    res!.end()
    return
  }

  // ブラウザ上
  if (!res && !credential) {
    Router.push('/sign_in')
  }
}
