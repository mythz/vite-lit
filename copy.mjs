import fs from 'fs'
import path from 'path'

const litDir = path.resolve('../../NetCoreTemplates/blazor-vue/MyApp/wwwroot/lit')
fs.rmSync(litDir, { recursive: true, force: true })
fs.cpSync('dist/assets', litDir, { recursive: true, force: true })

const files = fs.readdirSync(litDir)
fs.renameSync(path.join(litDir, files[0]), path.join(litDir, 'index.js'))