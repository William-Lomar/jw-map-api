import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuarios.controller';
import { UsuarioService } from './usuarios.service';
import { NUsuario } from './usuarios.entity';
import { UsuarioRepository, UsuarioRepositoryMemory } from './usuarios.repository';

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioController],
            providers: [ //Quando o database estiver implementado o teste pode continuar com o memory
                { provide: UsuarioRepository, useClass: UsuarioRepositoryMemory },
                UsuarioService
            ],
        }).compile();

        usuarioController = app.get<UsuarioController>(UsuarioController);
    });

    describe('root', () => {
        it('Deve retornar as informações de usuário corretamente', async () => {
            const infoExpected = {
                idUsuario: 1,
                nomeUsuario: 'William',
                tipoUsuario: NUsuario.ITipoUsuario.Admin
            }

            const res = await usuarioController.getInfo('1');
            expect(res).toStrictEqual(infoExpected);
        });
    });
});
