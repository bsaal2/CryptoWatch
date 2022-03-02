import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from "../../store/store";
import { Pagination } from '../../shared';

const Notification = () => {
    const { Notification } = useContext(DataContext);

    useEffect(() => {
        Notification.getAllNotification(Notification.page);

        return () => {
            Notification.resetData();
        }
    }, [Notification.page]);

    return (
        <div className="body">
            <div className="container">
                <div className='wrapper'>
                    <h2>Notifications</h2>
                    <ul class="list-group">
                        { Notification.notificationList.map((value, index) => {
                            return (<li className="list-group-item">
                                        <strong>{ value.title } </strong> { value. description}
                                    </li>)
                        })}
                    </ul>

                    <Pagination StoreObj={Notification} />
                </div>
            </div>
        </div>
    )
}

export default observer(Notification);