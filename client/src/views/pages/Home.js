import { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from "../../store/store";

const Home = () => {
    const [page, setPage] = useState(0);
    const { Crypto } = useContext(DataContext);
    const params = { params: { page, pageSize: 10 }};


    useEffect(() => {
        Crypto.getAllCrypto(params);
    }, [page]);

    const paginationLength = Math.ceil(Crypto.totalRecord /  10);
    const paginationArray = (paginationLength > 0 && new Array(paginationLength).fill(0)) || [];
    return (
        <div className="body">
            <div className="container">
                <div className="wrapper">
                    <h2>CryptoCurrency</h2>
                    <p>Total Record: { Crypto.totalRecord }</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Logo</th>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Market Cap</th>
                                <th scope="col">24 H</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Crypto.cryptoList && Crypto.cryptoList.map((crypto, index) => {
                                return crypto.name && (
                                    <tr key={crypto.id}>
                                        <th scope="row"> { index + 1 }</th>
                                        <td><img src={crypto.logo} alt={crypto.name} width={'25'} height={'25'} /></td>
                                        <td>{ crypto.code } </td>
                                        <td>{ crypto.name }</td>
                                        <td>{ crypto.price }</td>
                                        <td>{ crypto.marketCap }</td>
                                        <td>{ crypto.change } </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            { page === 0 && <li className="page-item disabled"><span className="page-link">Previous</span></li> }
                            { page > 0 && <li className="page-item" onClick={() => setPage(page-1) }><span className="page-link">Previous</span></li> }
                            
                            { paginationArray.map((value, index) => {
                                return (
                                    <li onClick={() => setPage(index) } key={index} className={ page === index ? 'page-item active' : 'page-item'}>
                                        <span className="page-link">
                                            { index + 1 }
                                        </span>
                                    </li>
                                )
                            })}
                         
                            { page === paginationLength - 1 && <li className="page-item disabled"><span className="page-link">Next</span></li> }
                            { page < paginationLength - 1 && <li onClick={() => setPage(page + 1)} className="page-item"><span className="page-link">Next</span></li> }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default observer(Home);