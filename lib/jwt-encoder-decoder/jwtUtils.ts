import jwt from "jsonwebtoken"

export function decodeTokenParts(jwtStr: string) {
  const parts = jwtStr.split(".")
  if (parts.length !== 3) throw new Error("Invalid JWT")
  const [h, p, s] = parts
  const header = JSON.parse(atob(h))
  const payload = JSON.parse(atob(p))
  const signature = s
  return { header, payload, signature }
}

export function verifyJWT(token: string, secretOrKey: string, alg: string) {
  try {
    jwt.verify(token, secretOrKey, { algorithms: [alg] })
    return true
  } catch {
    return false
  }
}

export function encodeJWT(
  header: object,
  payload: object,
  secretOrKey: string,
  alg: string
): string {
  return jwt.sign(payload, secretOrKey, {
    algorithm: alg as jwt.Algorithm,
    header,
  })
}
