import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { getString } from 'src/utils/getString';
import { NUsuario } from './usuarios.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Get(':id')
    async getInfo(@Param('id') idUsuario: string): Promise<NUsuario.IUsuarioInfo> {
        try {
            const userInfo = await this.usuarioService.getInfo(idUsuario);
            return userInfo;
        } catch (error) {
            throw new HttpException(`Erro ao consultar usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAll(@Query() filter?: NUsuario.UsuarioDTOFilter): Promise<NUsuario.IUsuarioInfo[]> {
        return this.usuarioService.getAll(new NUsuario.UsuarioDTOFilter(filter));
    }

    @Post()
    async inserir(@Body() insertDto: NUsuario.UsuarioDTOInsert): Promise<NUsuario.IUsuarioInfo> {
        try {
            const newUser = await this.usuarioService.inserir(new NUsuario.UsuarioDTOInsert(insertDto));
            return newUser.getInfo();
        } catch (error) {
            throw new HttpException(`Erro ao inserir usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    async editar(@Body() dtoEdit: NUsuario.UsuarioDTOEdit): Promise<NUsuario.IUsuarioInfo> {
        try {
            const user = await this.usuarioService.editar(new NUsuario.UsuarioDTOEdit(dtoEdit));
            return user.getInfo();
        } catch (error) {
            throw new HttpException(`Erro ao editar usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async excluir(@Param('id') idUsuario: string): Promise<boolean> {
        try {
            await this.usuarioService.excluir(idUsuario);
            return true;
        } catch (error) {
            throw new HttpException(`Erro ao deletar usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
