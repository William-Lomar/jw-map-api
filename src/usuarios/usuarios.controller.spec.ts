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

        it('Deve inserir/editar e deletar um usuário corretamente', async () => {
            const newUser: Omit<NUsuario.IPropsUsuario, 'idUsuario'> = {
                nomeUsuario: 'William 2',
                tipoUsuario: NUsuario.ITipoUsuario.Admin,
                login: 'teste',
                senha: '123456'
            }

            const resInsert = await usuarioController.inserir(newUser);
            expect(resInsert).toMatchObject({ nomeUsuario: 'William 2', tipoUsuario: NUsuario.ITipoUsuario.Admin });
            expect(resInsert.idUsuario).toBeTruthy();

            const newUserInfo = await usuarioController.getInfo(resInsert.idUsuario);

            newUserInfo.nomeUsuario = 'William editado!';
            const resEdit = await usuarioController.editar(newUserInfo, newUserInfo.idUsuario);
            expect(resEdit).toMatchObject(newUserInfo);

            const deleteSucess = await usuarioController.excluir(newUserInfo.idUsuario);
            expect(deleteSucess).toBe(true);
        });
    });
});
