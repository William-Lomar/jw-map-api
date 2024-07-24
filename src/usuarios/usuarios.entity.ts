export namespace NUsuario {
    export enum ITipoUsuario {
        Admin = 'Admin',
        Anciao = 'Anciao',
        Publicador = 'Publicador'
    }

    export interface IPropsUsuario {
        idUsuario: number
        nomeUsuario: string
        login: string
        senha: string
        tipoUsuario: NUsuario.ITipoUsuario
    }

    export type IUsuarioInfo = Omit<NUsuario.IPropsUsuario, 'login' | 'senha'>
}

export class Usuario {
    private idUsuario: number
    private nomeUsuario: string
    private login: string
    private senha: string
    private tipoUsuario: NUsuario.ITipoUsuario

    constructor({ idUsuario, nomeUsuario, login, senha, tipoUsuario }: NUsuario.IPropsUsuario) {
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.login = login;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }

    /**
     * Regra: Não será permitido exportar login e senha de um usuario do sistema
     */
    getJson(): NUsuario.IUsuarioInfo {
        return {
            idUsuario: this.idUsuario,
            nomeUsuario: this.nomeUsuario,
            tipoUsuario: this.tipoUsuario
        }
    }

    getProps(): NUsuario.IPropsUsuario {
        return {
            idUsuario: this.idUsuario,
            nomeUsuario: this.nomeUsuario,
            tipoUsuario: this.tipoUsuario,
            login: this.login,
            senha: this.senha
        }
    }
}