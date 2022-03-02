import { observer } from 'mobx-react';

const Alert = ({ message }) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            { message }
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default observer(Alert);