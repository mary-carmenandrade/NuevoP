import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bienvenida from "./Screens/Bienvenida";
import Platos from "./Screens/Platos";
import Postres from "./Screens/Postres";
import Entradas from "./Screens/Entradas";
import Principal from "./Screens/Principal";
import DetallePlato from "./Screens/DetallePlato";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Bienvenida" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Bienvenida" component={Bienvenida} />
                <Stack.Screen name="Platos" component={Platos} />
                <Stack.Screen name="Postres" component={Postres} />
                <Stack.Screen name="Principal" component={Principal} />
                <Stack.Screen name="Entradas" component={Entradas} />
                <Stack.Screen name="DetallePlato" component={DetallePlato} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
