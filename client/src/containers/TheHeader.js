import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { DataContext } from '../store/store';

const TheHeader = () => {
    const { Notification } = useContext(DataContext);
    console.log(Notification);

    useEffect(() => {
        Notification.getNotificationCount();

        return () => {
            Notification.resetData();
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">CryptoWatch</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to="/watchlist">WatchList</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <Link className='notification-link' to="/notification">Notification 
                        { Notification.totalRecord > 0 && (<span className="badge bg-secondary">{ Notification.totalRecord }</span>) }
                    </Link>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default observer(TheHeader);