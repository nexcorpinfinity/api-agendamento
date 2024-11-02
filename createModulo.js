/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Diretório criado: ${dir}`);
    }
}

function createFile(filePath, content) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Arquivo criado: ${filePath}`);
    }
}

function createModule(moduleName) {
    const baseDir = path.join(__dirname, 'src', 'modules', moduleName);
    const interfacesPath = path.join(baseDir, 'interfaces');

    const folders = [
        'controller',
        'service',
        'entities',
        'repository',
        'router',
        'middleware',
        'interfaces',
    ];

    folders.forEach((folder) => {
        createDirectory(path.join(baseDir, folder));
    });

    const interfaceImportPath = `../interfaces`;

    createFile(
        path.join(baseDir, 'controller', `${capitalize(moduleName)}Controller.ts`),
        `import { Request, Response } from 'express';\n\n` +
        `import { I${capitalize(moduleName)}Controller } from '${interfaceImportPath}/I${capitalize(moduleName)}Controller';\n` +
        `import { I${capitalize(moduleName)}Service } from '${interfaceImportPath}/I${capitalize(moduleName)}Service';\n\n` +
        `export class ${capitalize(moduleName)}Controller implements I${capitalize(moduleName)}Controller {\n` +
        `    public constructor(private readonly ${moduleName}Service: I${capitalize(moduleName)}Service) {}\n\n` +
        `    public get(req: Request, res: Response): void {\n` +
        `        res.json('ok');\n` +
        `    }\n` +
        `}\n`
    );

    createFile(
        path.join(baseDir, 'service', `${capitalize(moduleName)}Service.ts`),
        `import { I${capitalize(moduleName)}Repository } from '${interfaceImportPath}/I${capitalize(moduleName)}Repository';\n` +
        `import { I${capitalize(moduleName)}Service } from '${interfaceImportPath}/I${capitalize(moduleName)}Service';\n\n` +
        `export class ${capitalize(moduleName)}Service implements I${capitalize(moduleName)}Service {\n` +
        `    public constructor(private readonly ${moduleName}Repository: I${capitalize(moduleName)}Repository) {}\n` +
        `}\n`
    );

    createFile(
        path.join(baseDir, 'repository', `${capitalize(moduleName)}Repository.ts`),
        `import { ${capitalize(moduleName)}Entity } from '../entities/${capitalize(moduleName)}Entity';\n` +
        `import { I${capitalize(moduleName)}Repository } from '${interfaceImportPath}/I${capitalize(moduleName)}Repository';\n\n` +
        `export class ${capitalize(moduleName)}Repository implements I${capitalize(moduleName)}Repository {\n` +
        `    public constructor(private readonly ${moduleName}Entity = ${capitalize(moduleName)}Entity) {}\n` +
        `}\n`
    );

    createFile(
        path.join(baseDir, 'entities', `${capitalize(moduleName)}Entity.ts`),
        `import { Model, DataTypes } from 'sequelize';\n\n` +
        `import { sequelizeConnection } from '../../../config/db/database';\n\n` +
        `class ${capitalize(moduleName)}Entity extends Model {}\n\n` +
        `${capitalize(moduleName)}Entity.init({\n` +
        `    id: {\n` +
        `        type: DataTypes.UUID,\n` +
        `        defaultValue: DataTypes.UUIDV4,\n` +
        `        primaryKey: true,\n` +
        `    },\n` +
        `}, {\n` +
        `    tableName: '${moduleName}',\n` +
        `    sequelize: sequelizeConnection,\n` +
        `    underscored: true,\n` +
        `});\n\n` +
        `export { ${capitalize(moduleName)}Entity };`
    );

    createFile(
        path.join(baseDir, 'middleware', `${capitalize(moduleName)}Middleware.ts`),
        `export class ${capitalize(moduleName)}Middleware {}\n`
    );

    createFile(
        path.join(baseDir, 'router', `${capitalize(moduleName)}Router.ts`),
        `import { Router } from 'express';\n\n` +
        `import { ${capitalize(moduleName)}Controller } from '../controller/${capitalize(moduleName)}Controller';\n` +
        `import { ${capitalize(moduleName)}Repository } from '../repository/${capitalize(moduleName)}Repository';\n` +
        `import { ${capitalize(moduleName)}Service } from '../service/${capitalize(moduleName)}Service';\n\n` +
        `const ${moduleName}Router = Router();\n\n` +
        `const ${moduleName}Repository = new ${capitalize(moduleName)}Repository();\n` +
        `const ${moduleName}Service = new ${capitalize(moduleName)}Service(${moduleName}Repository);\n` +
        `const ${moduleName}Controller = new ${capitalize(moduleName)}Controller(${moduleName}Service);\n\n` +
        `${moduleName}Router.get('/', (req, res) => ${moduleName}Controller.get(req, res));\n\n` +
        `export { ${moduleName}Router };\n`
    );

    createFile(
        path.join(interfacesPath, `I${capitalize(moduleName)}Service.ts`),
        `export interface I${capitalize(moduleName)}Service {}\n`
    );
    createFile(
        path.join(interfacesPath, `I${capitalize(moduleName)}Controller.ts`),
        `export interface I${capitalize(moduleName)}Controller {}\n`
    );
    createFile(
        path.join(interfacesPath, `I${capitalize(moduleName)}Repository.ts`),
        `export interface I${capitalize(moduleName)}Repository {}\n`
    );

    console.log(`Módulo ${moduleName} criado com sucesso!`);
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const moduleName = process.argv[2];
if (!moduleName) {
    console.error('Por favor, forneça o nome do módulo.');
    process.exit(1);
}

createModule(moduleName.toLowerCase());
