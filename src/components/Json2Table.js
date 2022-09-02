export default {
    inject: ["filePath"],
    data() {
        return {
            jsonObj: JSON.parse(this.filePath),
        }
    },
    render() {

        const tableEle = (data, depth = 1) => {
            return (
                <fragment>
                    {Object.keys(data.properties).map(k => {
                        const item = data.properties[k]
                        const required = data.required
                        return (
                            <fragment>
                                <tr>
                                    <td class={{ "more-td": item.properties }}>
                                        <div style={{ marginLeft: depth * 20 + 'px', position: 'relative' }}>
                                            {item.properties && (
                                                <div
                                                    class="show-more"
                                                    onClick={() => {
                                                        if (
                                                            // eslint-disable-next-line no-prototype-builtins
                                                            !item.hasOwnProperty(
                                                                "oepn"
                                                            )
                                                        ) {
                                                            this.$set(
                                                                item,
                                                                "open",
                                                                !item.open
                                                            )
                                                        } else {
                                                            item.open = !item.open
                                                        }
                                                    }}
                                                >
                                                    {item.open ? '-' : '+'}
                                                </div>
                                            )}
                                            {k}
                                        </div>
                                    </td>
                                    <td>{item.type}</td>
                                    <td>
                                        {required && required.includes(k)
                                            ? "是"
                                            : "否"}
                                    </td>
                                    <td>{item.description}</td>
                                </tr>
                                {item.properties && item.open ? tableEle(item, depth + 1) : ''}
                            </fragment>
                        )
                    })
                    }
                </fragment>
            )
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>名称</th>
                        <th>类型</th>
                        <th>必填</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.jsonObj).length &&
                        tableEle(this.jsonObj)}
                </tbody>
            </table>
        )
    },
}
