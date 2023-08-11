import {RouterProvider} from 'react-router-dom';
import User from './generated/com/example/application/UserDetailsService/User';
import {useEffect, useState} from 'react';
import Order from "Frontend/generated/com/example/application/UserDetailsService/Order";
import {Select} from "@hilla/react-components/Select";
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import {ComboBox} from "@hilla/react-components/ComboBox";
import {UserDetailsService} from "Frontend/generated/endpoints";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        UserDetailsService.getUsers().then(setUsers);
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            UserDetailsService.getOrders(selectedUserId).then(setOrders);
        } else {
            setOrders([]);
        }
    }, [selectedUserId]);

    return (
        <div className="flex flex-col items-start gap-l p-m">
            <h1>Hilla microservice example</h1>
            <ComboBox label="Select user to view orders"
                      items={users}
                      itemLabelPath="name"
                      itemValuePath="id"
                      onValueChanged={e => setSelectedUserId(e.detail.value)}/>
            <Grid items={orders}>
                <GridColumn path="product"/>
                <GridColumn path="price"/>
            </Grid>
        </div>
    );

}
