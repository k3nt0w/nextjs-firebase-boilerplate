import * as admin from 'firebase-admin'

declare global {
  namespace Express {
    interface Request {
      firebaseServer: admin.app.App
    }
    interface Session {
      firebaseUser: admin.auth.DecodedIdToken
      firebaseToken: string
    }
  }
}
