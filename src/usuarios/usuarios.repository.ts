import { Injectable } from "@nestjs/common";
import { NUsuario, Usuario } from "./usuarios.entity";

export abstract class UsuarioRepository {
    abstract get(idUsuario: number): Promise<Usuario>
    abstract save(usuario: Usuario): Promise<Usuario>
    abstract delete(idUsuario: number): Promise<boolean>
}

@Injectable()
export class UsuarioRepositoryMemory implements UsuarioRepository {
    private usuarios: NUsuario.IPropsUsuario[] = [
        {
            idUsuario: 1,
            nomeUsuario: 'William',
            login: 'william.lomar',
            senha: '123456',
            tipoUsuario: NUsuario.ITipoUsuario.Admin
        }
    ];

    async get(idUsuario: number): Promise<Usuario> {
        const userInfo = this.usuarios.find((usuario) => usuario.idUsuario == idUsuario);
        if (!userInfo) throw new Error(`Usuario ${idUsuario} não cadastrado!`);

        return new Usuario(userInfo);
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

    async delete(idUsuario: number): Promise<boolean> {
        const userIndex = this.usuarios.findIndex(usuario => usuario.idUsuario == idUsuario);
        if (userIndex == -1) throw new Error("Usuário não encontrado!");
        this.usuarios.splice(userIndex, 1);
        return true
    }
}