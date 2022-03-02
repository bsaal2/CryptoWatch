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
        },
        resourceId: {
            type: DataTypes.BIGINT
        }
    }, 
    {
        timestamps: true
    });

    return Notification;
};
