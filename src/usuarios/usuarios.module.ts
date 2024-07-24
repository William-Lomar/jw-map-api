import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuarios.controller";
import { UsuarioService } from "./usuarios.service";
import { UsuarioRepository, UsuarioRepositoryMemory } from "./usuarios.repository";

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [
        { provide: UsuarioRepository, useClass: UsuarioRepositoryMemory },
        UsuarioService
    ]
})
export class UsuariosModule { }
