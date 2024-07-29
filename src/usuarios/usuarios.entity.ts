import { IsEnum, IsString, validateSync } from "@nestjs/class-validator"
import { OmitType, PartialType } from "@nestjs/mapped-types"
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

    export type IUsuarioInfo = Omit<NUsuario.IPropsUsuario, 'login' | 'senha'>
    export class UsuarioDTO {
        @IsString()
        idUsuario: string;
        @IsString()
        nomeUsuario: string;
        @IsString()
        login: string;
        @IsString()
        senha: string;
        @IsEnum(NUsuario.ITipoUsuario)
        tipoUsuario: NUsuario.ITipoUsuario;

        //Add esses parses no constructor para "higienizar" o objeto passado, removendo propriedades que não deveriam estar ali, 
        //possibilitando assim "limpar" o body de um request limpando propriedades que não deveriam estar ali
        constructor(dto: UsuarioDTO) {
            this.idUsuario = dto.idUsuario;
            this.nomeUsuario = dto.nomeUsuario;
            this.login = dto.login;
            this.senha = dto.senha;
            this.tipoUsuario = dto.tipoUsuario;
        }
    }

    export class UsuarioDTOFilter extends PartialType(UsuarioDTO) {
        constructor(dto: UsuarioDTOFilter) {
            super();
            if (!dto) return; //Quando a classe eh utilizada pelas rotinas do Nest não eh passado nenhum parametro no constructor

            this.idUsuario = dto.idUsuario;
            this.nomeUsuario = dto.nomeUsuario;
            this.login = dto.login;
            this.senha = dto.senha;
            this.tipoUsuario = dto.tipoUsuario;
        }
    }
    export class UsuarioDTOInsert extends OmitType(UsuarioDTO, ['idUsuario']) {
        constructor(dto: UsuarioDTOInsert) {
            super();
            if (!dto) return; //Quando a classe eh utilizada pelas rotinas do Nest não eh passado nenhum parametro no constructor

            this.nomeUsuario = dto.nomeUsuario;
            this.login = dto.login;
            this.senha = dto.senha;
            this.tipoUsuario = dto.tipoUsuario;
        }
    }

    export class UsuarioDTOEdit extends PartialType(UsuarioDTO) {
        @IsString()
        idUsuario: string;

        constructor(dto: UsuarioDTOEdit) {
            super();
            if (!dto) return; //Quando a classe eh utilizada pelas rotinas do Nest não eh passado nenhum parametro no constructor

            this.idUsuario = dto.idUsuario;
            this.nomeUsuario = dto.nomeUsuario;
            this.login = dto.login;
            this.senha = dto.senha;
            this.tipoUsuario = dto.tipoUsuario;
        }
    }
}

//Para o validadeSync funcionar deve ser passado a classe instanciada de UsuarioDTO, usada essa estrátegia pois pode ser possivel criar essa classe 
//passando apenas um objeto de chave e valor

export class Usuario {
    private dto: NUsuario.UsuarioDTO;

    constructor(usuarioDto: NUsuario.UsuarioDTO) {
        const dto = new NUsuario.UsuarioDTO(usuarioDto);
        const erros = validateSync(dto);
        if (erros.length) throw new Error(`Erro na validação para criar Usuario: ${getString(erros)}`);

        this.dto = dto;
    }

    /**
     * Regra: Não será permitido exportar login e senha de um usuario do sistema
     */
    getInfo(): NUsuario.IUsuarioInfo {
        return {
            idUsuario: this.dto.idUsuario,
            nomeUsuario: this.dto.nomeUsuario,
            tipoUsuario: this.dto.tipoUsuario
        }
    }

    /**
     * Usando para recuperar todas as informações do usuário
     * @returns 
     */
    getDto(): NUsuario.UsuarioDTO {
        return this.dto;
    }

    setProps(props: NUsuario.UsuarioDTOEdit) {
        const dto = new NUsuario.UsuarioDTOEdit(props);
        const erros = validateSync(dto);
        if (erros.length) throw new Error(`Erro ao setar novas propriedades do Usuario: ${erros}`);

        const { nomeUsuario, login, senha, tipoUsuario } = props;

        if (nomeUsuario) this.dto.nomeUsuario = nomeUsuario;
        if (login) this.dto.login = login;
        if (senha) this.dto.senha = senha;
        if (tipoUsuario) this.dto.tipoUsuario = tipoUsuario;
    }
}