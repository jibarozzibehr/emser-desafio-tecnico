export interface UsuariosResponse {
    status: number,
    users?: [
        {
            id: number,
            username: string,
            password: string,
            nombre: string,
            apellido: string,
            telefono: number,
            email: string,
            tipo: number,            
            activo: boolean
        }
    ],
    description?: string,
    user?: {
        id: number,
        username: string,
        password: string,
        nombre: string,
        apellido: string,
        telefono: number,
        email: string,
        tipo: number,            
        activo: boolean
    }
}