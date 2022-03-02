import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from "../../store/store";
import { TRow, Pagination, Alert } from '../../shared';

const Home = () => {
    const { Crypto } = useContext(DataContext);

    useEffect(() => {
        Crypto.getAllCrypto(Crypto.page);

        return () => {
            Crypto.resetData();
        }
    }, [Crypto.page]);

    return (
        <div className="body">
            <div className="container">
                <div className="wrapper">
                    <h2>CryptoCurrency</h2>
                    <p>Total Record: { Crypto.totalRecord }</p>
                    
                    { Crypto.message && <Alert message={Crypto.message} /> }

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
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Crypto.cryptoList && Crypto.cryptoList.map((crypto, index) => {
                                return crypto.name && (
                                    <TRow key={index}  data={{...crypto, index}} />
                                )
                            })}
                        </tbody>
                    </table>

                    <Pagination StoreObj={Crypto} />
                </div>
            </div>
        </div>
    )
}

export default observer(Home);