import { getString } from "src/utils/getString"

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

    export type IPropsUsuarioFilter = Partial<NUsuario.IPropsUsuario>;
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
        const erros = [];
        if (!idUsuario) erros.push('idUsuario')
        if (!nomeUsuario) erros.push('nomeUsuario')
        if (!login) erros.push('login')
        if (!senha) erros.push('senha')
        if (!tipoUsuario) erros.push('tipoUsuario')

        if (erros.length) throw new Error(`Propriedades ausentes para criar Usuario : ${getString(erros)}`);

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