import { randomBytes } from 'node:crypto';
// Alfabeto Crockford sin I, L, O, U: sin ambigüedades al dictarlo o copiarlo.
const A = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export function newCode(prefix = 'LARRE') {
  const b = randomBytes(8);
  let s = ''; for (let i = 0; i < 8; i++) s += A[b[i] % 32];
  return `${prefix}-${s.slice(0, 4)}-${s.slice(4)}`;
}
