export interface ProyectosUsuariosResponse {
    status: number,
    projectsUsers?: [
        {
            id: number,
            username: string,
            project: string
        }
    ],
    description?: string
}