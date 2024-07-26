export namespace NUsuario {
    export enum ITipoUsuario {
        Admin = 'Admin',
        Anciao = 'Anciao',
        Publicador = 'Publicador'
    }

    export interface IPropsUsuario {
        idUsuario: string
        nomeUsuario: string
        login: string
        senha: string
        tipoUsuario: NUsuario.ITipoUsuario
    }

    export type IPropsUsuarioEdit = Partial<Omit<NUsuario.IPropsUsuario, 'idUsuario'>>
    export type IPropsUsuarioInsert = Omit<NUsuario.IPropsUsuario, 'idUsuario'>

    export type IUsuarioInfo = Omit<NUsuario.IPropsUsuario, 'login' | 'senha'>
}

export class Usuario {
    private idUsuario: string
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
    getInfo(): NUsuario.IUsuarioInfo {
        return {
            idUsuario: this.idUsuario,
            nomeUsuario: this.nomeUsuario,
            tipoUsuario: this.tipoUsuario
        }
    }

    /**
     * Usando para recuperar todas as informações do usuário
     * @returns 
     */
    getProps(): NUsuario.IPropsUsuario {
        return {
            idUsuario: this.idUsuario,
            nomeUsuario: this.nomeUsuario,
            tipoUsuario: this.tipoUsuario,
            login: this.login,
            senha: this.senha
        }
    }

    setProps(props: NUsuario.IPropsUsuarioEdit) {
        const { nomeUsuario, login, senha, tipoUsuario } = props;

        if (nomeUsuario) this.nomeUsuario = nomeUsuario;
        if (login) this.login = login;
        if (senha) this.senha = senha;
        if (tipoUsuario) this.tipoUsuario = tipoUsuario;
    }
}