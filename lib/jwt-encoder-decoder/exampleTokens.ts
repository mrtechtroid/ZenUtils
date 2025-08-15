import jwt from "jsonwebtoken"

const secrets = { HS256: "secret", HS384: "secret", HS512: "secret" /* add RS/ES if needed */ }
export function getExampleToken(alg: string) {
  return jwt.sign({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000) }, secrets[alg], {
    algorithm: alg as jwt.Algorithm,
    header: { alg, typ: "JWT" },
  })
}
