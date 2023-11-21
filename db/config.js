const {config} = require('../config/config');


const URI = 'mysql://u3hnmfk61yauz82g:WHJ7omy0W1fiD9ln81SY@b1v3cepcxbpwmgtbgpyj-mysql.services.clever-cloud.com:3306/b1v3cepcxbpwmgtbgpyj';

module.exports = {
    development:{
        url:URI,
        dialect:'mysql'
    },
    production:{
        url:URI,
        dialect:'mysql'
    }
}