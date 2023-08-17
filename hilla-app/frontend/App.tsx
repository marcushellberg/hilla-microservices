import {RouterProvider} from 'react-router-dom';
import User from './generated/com/example/application/UserDetailsService/User';
import {useEffect, useState} from 'react';
import Order from "Frontend/generated/com/example/application/UserDetailsService/Order";
import {Select} from "@hilla/react-components/Select";
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import {ComboBox, ComboBoxSelectedItemChangedEvent} from "@hilla/react-components/ComboBox";
import {UserDetailsService} from "Frontend/generated/endpoints";
import UserDetail from "Frontend/generated/com/example/application/UserDetailsService/UserDetail";

export default function App() {
    const [userDetails, setUserDetails] = useState<UserDetail[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        UserDetailsService.getUserDetails().then(setUserDetails);
    }, []);

    function selectedUserChanged(e: ComboBoxSelectedItemChangedEvent<UserDetail>) {
        const orders = e.detail.value ? e.detail.value.orders : [];
        setOrders(orders);
    }

    return (
        <div className="flex flex-col items-start gap-l p-m">
            <h1>Hilla microservice example</h1>

            <ComboBox label="Select user to view orders"
                      items={userDetails}
                      itemLabelPath="user.name"
                      onSelectedItemChanged={selectedUserChanged}/>

            <Grid items={orders}>
                <GridColumn path="product"/>
                <GridColumn path="price"/>
            </Grid>
        </div>
    );

}
