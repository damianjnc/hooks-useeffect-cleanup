import * as React from 'react';


 const List = props => {
     console.log('rendering the list...')
    return (
        <ul>
            {props.items.map(item => (
                <li onClick={() => props.onClickHandler(item.id)} key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};
 export default List;