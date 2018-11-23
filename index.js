const objects = require('./objects.json')
const fs = require('fs')
const util = require('util')

const writeFile = util.promisify(fs.writeFile)

const package = 'me.indexyz.strap.objects'

function makeAttrData(attrs) {
    let data = ''
    for (const attr of Object.keys(attrs)) {
        const item = attrs[attr]
        data += `    val ${attr}: ${item.type}`

        if (item.nullable) {
            data += '?'
        }

        data += ',\n'
    }
    return data.substr(0, data.length - 2)
}

async function main() {
    for (const key of objects) {
        const base = `package ${package}\n\ndata class ${key.name} (\n${makeAttrData(key.attrs)}\n)`
        
        
        await writeFile(`output/${key.name}.kt`, base)
    }
}

main()