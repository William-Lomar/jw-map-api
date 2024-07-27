import { Injectable } from "@nestjs/common";
import { NUsuario, Usuario } from "./usuarios.entity";

export abstract class UsuarioRepository {
    abstract get(idUsuario: string): Promise<Usuario>
    abstract getAll(filter?: NUsuario.IPropsUsuarioFilter): Promise<Usuario[]>
    abstract save(usuario: Usuario): Promise<Usuario>
    abstract delete(idUsuario: string): Promise<boolean>
}

@Injectable()
export class UsuarioRepositoryMemory implements UsuarioRepository {

    private usuarios: NUsuario.IPropsUsuario[] = [
        {
            idUsuario: '1',
            nomeUsuario: 'William',
            login: 'william.lomar',
            senha: '123456',
            tipoUsuario: NUsuario.ITipoUsuario.Admin
        }
    ];

    async get(idUsuario: string): Promise<Usuario> {
        const userInfo = this.usuarios.find((usuario) => usuario.idUsuario == idUsuario);
        if (!userInfo) throw new Error(`Usuario ${idUsuario} não cadastrado!`);

        return new Usuario(userInfo);
    }

    async getAll(filter?: NUsuario.IPropsUsuarioFilter): Promise<Usuario[]> {
        let usuarios = this.usuarios;

        if (filter) {
            usuarios = usuarios.filter((usuario) => {
                let encontrado = true;

                if (filter.idUsuario) encontrado = encontrado && usuario.idUsuario == filter.idUsuario
                if (filter.nomeUsuario) encontrado = encontrado && usuario.nomeUsuario == filter.nomeUsuario
                if (filter.login) encontrado = encontrado && usuario.login == filter.login
                if (filter.senha) encontrado = encontrado && usuario.senha == filter.senha
                if (filter.tipoUsuario) encontrado = encontrado && usuario.tipoUsuario == filter.tipoUsuario

                return encontrado;
            })
        }

        return usuarios.map(u => new Usuario(u));
    }

    async save(usuario: Usuario): Promise<Usuario> {
        const props = usuario.getProps();
        const userIndex = this.usuarios.findIndex(usuario => usuario.idUsuario == props.idUsuario);

        if (userIndex == -1) {
            this.usuarios.push(props);
        } else {
            this.usuarios[userIndex] = props;
        }

        return usuario;
    }

    async delete(idUsuario: string): Promise<boolean> {
        const userIndex = this.usuarios.findIndex(usuario => usuario.idUsuario == idUsuario);
        if (userIndex == -1) throw new Error("Usuário não encontrado!");
        this.usuarios.splice(userIndex, 1);
        return true
    }
}