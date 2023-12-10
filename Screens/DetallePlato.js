import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DetallePlato = () => {
    const route = useRoute();
    const { plato } = route.params;

    const [platosMismoTipo, setPlatosMismoTipo] = useState([]);
    const navigation = useNavigation();

    const handlePlatoPress = (plato) => {
        navigation.navigate('DetallePlato', { plato });
    };

    useEffect(() => {
        const fetchPlatosMismoTipo = async () => {
            try {
                // Filtra los platos por el tipo del plato seleccionado
                const response = await axios.get(`http://192.168.132.117:3000/api/platos?tipo=${plato.tipo}`);

                // Filtra los platos por el tipo del plato seleccionado
                const filteredPlatos = response.data.filter(item => item.tipo === plato.tipo);

                // Elimina el plato actual de la lista filtrada
                const platosExcluyendoActual = filteredPlatos.filter(item => item._id !== plato._id);
                // Toma tres platos aleatorios del mismo tipo
                const randomPlatos = platosExcluyendoActual.sort(() => 0.5 - Math.random()).slice(0, 3);
                setPlatosMismoTipo(randomPlatos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlatosMismoTipo();
    }, [plato]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.platoContainer}>
                {/* Detalles del plato seleccionado */}
                <Image source={{ uri: plato.imagen }} style={styles.image} />
                <Text style={styles.infoText}>Nombre: {plato.nombre}</Text>
                <Text style={styles.infoText}>Puntuación: {plato.puntuacion}</Text>
                <Text style={styles.infoText}>Descripción: {plato.descripcion}</Text>
                <Text style={styles.infoText}>Precio: {plato.precio}</Text>
                <Text style={styles.infoText}>Tipo: {plato.tipo}</Text>
            </View>

            <Text style={styles.relatedText}>Otros platos del mismo tipo:</Text>
            <FlatList
                data={platosMismoTipo}
                keyExtractor={(item) => item._id}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePlatoPress(item)}>
                    <View style={styles.relatedPlatoContainer}>
                        <Image source={{ uri: item.imagen }} style={styles.relatedImage} />
                        <Text style={styles.relatedInfoText}>{item.nombre}</Text>
                    </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    platoContainer: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    infoText: {
        fontSize: 16,
        marginVertical: 8,
    },
    relatedText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    relatedPlatoContainer: {
        marginRight: 10,
    },
    relatedImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    relatedInfoText: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default DetallePlato;
