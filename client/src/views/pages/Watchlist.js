import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from '../../store/store';
import { TRow, Pagination, Alert } from '../../shared';

const Watchlist = () => {
    const { Wishlist } = useContext(DataContext);

    useEffect(() => {
        Wishlist.getAllWishlist(Wishlist.page);

        return () => {
            Wishlist.resetData();
        }
    }, [Wishlist.page]);

    return (
        <div className="body">
            <div className="container">
                <div className="wrapper">
                    <h2>Watchlist</h2>
                    <p>Total Record: { Wishlist.totalRecord }</p>

                    { Wishlist.message && <Alert message={Wishlist.message} /> }

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
                            { Wishlist.wishList && Wishlist.wishList.map((wish, index) => {
                                return (
                                    <TRow key={index}  data={{...wish.crypto, id: wish.id, min_price: wish.min_price, max_price:wish.max_price, index}} />
                                )
                            })}
                        </tbody>
                    </table>

                    <Pagination StoreObj={Wishlist} />
                </div>
            </div>
        </div>
    )
}

export default observer(Watchlist);