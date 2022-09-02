module.exports = function loader(source) {
    const alt = new RegExp(/<json-table>([\s\S]*?)<\/json-table>/, 'g')

    const temp = source.match(alt)

    if (temp) {
        for (let i of temp) {
            const jsonObjStr = i.replace(/(<json-table>)|(<\/json-table>)/g, '')
            const str = jsonObjStr.replace(/\s|\n/g, '')
            source = source.replace(i, `\n[import:vue](../../components/Json2Table.js?jsonObj=${str})\n`)
        }
    }
    return source;
}