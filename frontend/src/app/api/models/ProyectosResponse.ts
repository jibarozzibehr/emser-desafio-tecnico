export interface ProyectosResponse {
    status: number,
    projects?: [
        {
            id: number,
            nombre: string,
            activo: boolean
        }
    ],
    description?: string,
    project?: {
        id: number,
        nombre: string,
        activo: boolean
    }
}