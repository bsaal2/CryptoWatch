import { observer } from 'mobx-react';

const Pagination = ({ StoreObj }) => {
    const paginationLength = Math.ceil(StoreObj.totalRecord /  10);
    const paginationArray = (paginationLength > 0 && new Array(paginationLength).fill(0)) || [];

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { StoreObj.page === 0 && <li className="page-item disabled"><span className="page-link">Previous</span></li> }
                { StoreObj.page > 0 && <li className="page-item" onClick={() => StoreObj.setPage(StoreObj.page-1) }><span className="page-link">Previous</span></li> }
                
                { paginationArray.map((value, index) => {
                    return (
                        <li onClick={() => StoreObj.setPage(index) } key={index} className={ StoreObj.page === index ? 'page-item active' : 'page-item'}>
                            <span className="page-link">
                                { index + 1 }
                            </span>
                        </li>
                    )
                })}
                
                { StoreObj.page === paginationLength - 1 && <li className="page-item disabled"><span className="page-link">Next</span></li> }
                { StoreObj.page < paginationLength - 1 && <li onClick={() => StoreObj.setPage(StoreObj.page + 1)} className="page-item"><span className="page-link">Next</span></li> }
            </ul>
        </nav>
    )
}

export default observer(Pagination);