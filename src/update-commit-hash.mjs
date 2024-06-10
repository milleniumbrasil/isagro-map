import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

try {
    const commitHash = execSync('git rev-parse HEAD').toString().trim();
    console.log(commitHash);
                          
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const versionFilePath = path.join(dirname, '/pages/common/AuthContext.tsx');
    const versionFileContent = fs.readFileSync(versionFilePath, 'utf8');
    const updatedVersionFileContent = versionFileContent.replace(/export const COMMIT_HASH: string = ".*?";/, `export const COMMIT_HASH: string = "${commitHash}";`);
    fs.writeFileSync(versionFilePath, updatedVersionFileContent, 'utf8');
} catch (error) {
    console.error('Failed to obtain the commit hash:', error);
}