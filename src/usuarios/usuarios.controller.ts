import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
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
            const userInfo = await this.usuarioService.getInfoUsuario(Number(idUsuario));
            return userInfo;
        } catch (error) {
            throw new HttpException(`Erro ao consultar usuário: ${getString(error)}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
