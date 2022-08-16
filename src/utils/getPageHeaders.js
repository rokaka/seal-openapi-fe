export default function getPageHeaders() {
    const page = document.querySelector('.v-docs')
    const isDevDoc = /^\/dev_doc\/(.+)/.test(window.location.pathname)
    const headers = []
    if (page && isDevDoc) {
        const headerDom = page.querySelectorAll('h2')
        headerDom.forEach(item => {
            item.id
            headers.push({
                name: item.innerText,
                href: `#${item.id}`
            })
        })
    }
    return headers
}