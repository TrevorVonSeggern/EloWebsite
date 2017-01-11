

declare module 'bcrypt-nodejs' {
    export function genSalt(n, func):(n:any, func:any) => void;

    export function hash(password, salt, na, cb):(password:any, salt:any, na:any, cb:any) => void;
    export function hashSync(password, salt):(password:any, salt:any, na:any, cb:any) => string;

    export function compare(cmp1, cmp3, cb):(cmp1:any, cmp2:any, cb:any)=>void;
}
