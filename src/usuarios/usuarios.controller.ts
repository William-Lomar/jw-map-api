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
    async getAll(@Query() filter?: NUsuario.IPropsUsuarioFilter): Promise<NUsuario.IUsuarioInfo[]> {
        return this.usuarioService.getAll(filter);
    }

    @Post()
    async inserir(@Body() props: NUsuario.IPropsUsuarioInsert): Promise<NUsuario.IUsuarioInfo> {
        try {
            const newUser = await this.usuarioService.inserir(props);
            return newUser.getInfo();
        } catch (error) {
            throw new HttpException(`Erro ao inserir usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    async editar(@Body('props') props: NUsuario.IPropsUsuarioEdit, @Body('idUsuario') idUsuario: string): Promise<NUsuario.IUsuarioInfo> {
        try {
            const user = await this.usuarioService.editar(props, idUsuario);
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
