module.exports = (sequelize, DataTypes) => {
    const Crypto = sequelize.define('crypto', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
        marketCap: {
            type: DataTypes.STRING
        },
        change: {
            type: DataTypes.STRING
        }
    }, 
    {
        timestamps: true
    });

    return Crypto;
};
