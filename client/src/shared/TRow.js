import { useContext } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from '../store/store';
import { MAX_PRICE, MIN_PRICE } from './constant';

const TRow = ({ data }) => {
    const { Crypto, Wishlist } = useContext(DataContext)
    return (
        <tr>
            <th scope="row"> { data.index + 1 }</th>
            <td><img src={data.logo} alt={data.name} width={'25'} height={'25'} /></td>
            <td>{ data.code } </td>
            <td>{ data.name }</td>
            <td>{ data.price }</td>
            <td>{ data.marketCap }</td>
            <td>{ data.change } </td>
            <td>
                { !data.min_price && !data.wishlist && ( <button onClick={() => Crypto.addToWishlist({ code: data.code, min_price: MIN_PRICE, max_price: MAX_PRICE })} className="btn btn-primary">
                    + Wishlist
                </button>) }

                { !data.min_price && data.wishlist && ( <button className="btn btn-success">
                    Wishlisted
                </button>) }

                {
                ( data.min_price &&
                  <button onClick={() => Wishlist.removeWishlist(data.id)} className="btn btn-primary">
                    - Remove
                  </button>
                )
                }
            </td>
        </tr>
    )
}

export default observer(TRow);