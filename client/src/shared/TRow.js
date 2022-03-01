import { observer } from 'mobx-react';

const TRow = ({ data }) => {
    return (
        <tr>
            <th scope="row"> { data.index + 1 }</th>
            <td><img src={data.logo} alt={data.name} width={'25'} height={'25'} /></td>
            <td>{ data.code } </td>
            <td>{ data.name }</td>
            <td>{ data.price }</td>
            <td>{ data.marketCap }</td>
            <td>{ data.change } </td>
        </tr>
    )
}

export default observer(TRow);