
import {Sequelize} from 'sequelize';

const db = new Sequelize('node', 'root', 'Candelaria24',{

    host: 'localhost',
    dialect:'mysql',

});

export default db;
