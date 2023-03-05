import { Sequelize } from "sequelize";

const db = new Sequelize('crafts', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;