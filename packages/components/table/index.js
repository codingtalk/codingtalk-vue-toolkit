import Table from './src/index.jsx'

Table.install = (app) => {
    app.component(Table.name, Table)
}

export default Table