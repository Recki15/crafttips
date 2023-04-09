import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Ratings = db.define('ratings',{
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER(10),
        allowNull: true
    }
},{
    freezeTableName:true
});
 

(async () => {
    await db.sync();
})();
 
export default Ratings;