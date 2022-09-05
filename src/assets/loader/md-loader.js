module.exports = function loader(source) {
    const alt = new RegExp(/<json-table>([\s\S]*?)<\/json-table>/, 'g')

    const temp = source.match(alt)

    if (temp) {
        for (let i of temp) {
            const jsonObjStr = i.replace(/(<json-table>)|(<\/json-table>)/g, '')
            const str = jsonObjStr.replace(/\s|\n/g, '').replace('(', '（').replace(')', '）') // json中不能包含英文括号，)会被认为是是插入语句的结束符
            source = source.replace(i, `\n[import:vue](../../components/Json2Table.js?jsonObj=${str})\n`)
        }
    }
    return source;
}