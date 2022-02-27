module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('wishlist', {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        min_price: {
            type: DataTypes.FLOAT
        },
        max_price: {
            type: DataTypes.FLOAT
        }
    }, 
    {
        timestamps: true,
        paranoid: true
    });

    return Wishlist;
};
