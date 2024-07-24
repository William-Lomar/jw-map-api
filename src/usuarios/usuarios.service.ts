import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuarios.repository";
import { NUsuario } from "./usuarios.entity";

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    /**
     * Retorna as informações de um usuário
     * @param idUsuario 
     */
    async getInfoUsuario(idUsuario: number): Promise<NUsuario.IUsuarioInfo> {
        const usuario = await this.usuarioRepository.get(idUsuario);
        return usuario.getJson();
    }
}