export interface UsuarioRequest {
    accessToken: string,
    id?: number,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    telefono?: number,
    email?: string,
    tipo?: number,
    activo?: boolean
}