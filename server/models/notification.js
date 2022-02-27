module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('notification', {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.STRING
        }
    }, 
    {
        timestamps: true
    });

    Notification.associate = function(models) {
        models.notification.belongsTo(models.crypto);
    }

    return Notification;
};
