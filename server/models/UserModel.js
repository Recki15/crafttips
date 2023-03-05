import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Posts from "./PostModel.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    permission_level:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    freezeTableName:true
});
 

(async () => {
    await db.sync();
})();
 
export default Users;