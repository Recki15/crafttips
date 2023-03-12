import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
 
const { DataTypes } = Sequelize;
 
const Posts = db.define('posts',{
    title:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cover_image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    short_desc:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    long_desc:{
        type: DataTypes.TEXT
    },
    tools:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    creator_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Posts;