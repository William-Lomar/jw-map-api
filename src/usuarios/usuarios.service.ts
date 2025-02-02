import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuarios.repository";
import { NUsuario, Usuario } from "./usuarios.entity";
import { randomUUID } from "crypto";

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    /**
     * Retorna as informações de um usuário
     * @param idUsuario 
     */
    async getInfo(idUsuario: string): Promise<NUsuario.IUsuarioInfo> {
        const usuario = await this.usuarioRepository.get(idUsuario);
        return usuario.getInfo();
    }

    /**
     * Retorna as informações de todos os usuários
     * @param idUsuario 
     */
    async getAll(filter?: NUsuario.UsuarioDTOFilter): Promise<NUsuario.IUsuarioInfo[]> {
        const usuarios = await this.usuarioRepository.getAll(filter);
        return usuarios.map(u => u.getInfo());
    }

    async inserir(dtoInsert: NUsuario.UsuarioDTOInsert): Promise<Usuario> {
        await this.validarLoginDuplicado(dtoInsert.login);
        const usuario = new Usuario({ ...dtoInsert, idUsuario: randomUUID() });
        await this.usuarioRepository.save(usuario);
        return usuario;
    }

    async editar(dtoEdit: NUsuario.UsuarioDTOEdit): Promise<Usuario> {
        if (dtoEdit.login) await this.validarLoginDuplicado(dtoEdit.login);
        const usuario = await this.usuarioRepository.get(dtoEdit.idUsuario);
        usuario.setProps(dtoEdit);
        await this.usuarioRepository.save(usuario);
        return usuario;
    }

    async excluir(idUsuario: string): Promise<void> {
        await this.usuarioRepository.delete(idUsuario);
    }

    private async validarLoginDuplicado(login: string): Promise<void> {
        const usuarios = await this.usuarioRepository.getAll({ login });
        if (usuarios.length) throw new Error("Já existe um usuário com este login!");
    }
}