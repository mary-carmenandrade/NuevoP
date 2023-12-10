import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlatosScreen = () => {
    const [platos, setPlatos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();

    const handlePlatoPress = (plato) => {
        navigation.navigate('DetallePlato', { plato });
    };

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await axios.get('https://api-dishes-5r7a.onrender.com/api/platos');
                setPlatos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response);
            }
        };

        fetchPlatos();
    }, []);

    const renderPlatoItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePlatoPress(item)}>
            <View style={styles.box}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image.url }} style={styles.image} />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoText}>{item.name}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Puntuación:</Text>
                    <Text style={styles.infoText}>{item.rating}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Tipo:</Text>
                    <Text style={styles.infoText}>{item.type}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Precio:</Text>
                    <Text style={styles.infoText}>{item.price}</Text>
                </View>

                
            </View>
        </TouchableOpacity>
    );

    const filteredPlatos = platos.filter(
        (plato) =>
            plato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plato.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>SISTEMA DE RECOMENDACIONES DOÑA MERRY</Text>
                <Image
                    source={{
                        uri: 'https://img.freepik.com/fotos-premium/mujer-gorro-chef-posando-foto_871710-18087.jpg?w=740',
                    }}
                    style={styles.welcomeImage}
                />
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o descripción"
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
            />

            <FlatList
                data={filteredPlatos}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderPlatoItem}
                contentContainerStyle={styles.flatListContainer}
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
    welcomeContainer: {
        backgroundColor: '#87AB49',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#625E5B',
    },
    welcomeImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    box: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 8,
        margin: 5,// Alinear al centro
    },
    imageContainer: {
        width: '100%',
        height: 150, // Ajusta la altura de la imagen según tu preferencia
        marginBottom: 8,
        overflow: 'hidden',
        borderRadius: 8,
    },
    image: {
        height: 170,
        width: 150,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#548C7E',
    },
    flatListContainer: {
        flex: 1,
    },
});

export default PlatosScreen;
