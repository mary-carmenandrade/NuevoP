import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DetallePlato = () => {
    const route = useRoute();
    const { plato } = route.params;

    const [platosMismoTipo, setPlatosMismoTipo] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    const navigation = useNavigation();

    const handlePlatoPress = (plato) => {
        navigation.navigate('DetallePlato', { plato });
    };

    useEffect(() => {
        const fetchPlatosMismoTipo = async () => {
            try {
                // Filtra los platos por el tipo del plato seleccionado
                const response = await axios.get(`https://api-dishes-5r7a.onrender.com/api/platos?type=${plato.tipo}`);

                // Filtra los platos por el tipo del plato seleccionado
                const filteredPlatos = response.data.filter(item => item.type === plato.type);
                // Elimina el plato actual de la lista filtrada
                const platosExcluyendoActual = filteredPlatos.filter(item => item.id !== plato.id);
                // Toma tres platos aleatorios del mismo tipo
                const randomPlatos = platosExcluyendoActual.sort(() => 0.5 - Math.random()).slice(0, 3);
                setPlatosMismoTipo(randomPlatos);
                setComentarios(plato.comments)
                console.log(plato.comments)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlatosMismoTipo();
    }, [plato]);

    const cometar = async () => {
        try {
            const data = {
                comment: nuevoComentario
            }
            const response = await axios.post(`https://api-dishes-5r7a.onrender.com/api/platos/${plato.id}/comment`, data)
            setComentarios(response.data.comments)
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.platoContainer}>
                {/* Detalles del plato seleccionado */}
                <Image source={{ uri: plato.image.url }} style={styles.image} />
                <Text style={styles.infoText}>Nombre: {plato.name}</Text>
                <Text style={styles.infoText}>Puntuación: {plato.rating}</Text>
                <Text style={styles.infoText}>Descripción: {plato.description}</Text>
                <Text style={styles.infoText}>Precio: {plato.price}</Text>
                <Text style={styles.infoText}>Tipo: {plato.type}</Text>
            </View>

            <Text style={styles.relatedText}>Otros platos del mismo tipo:</Text>
            <FlatList
                data={platosMismoTipo}
                keyExtractor={(item) => item.id}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePlatoPress(item)}>
                        <View style={styles.relatedPlatoContainer}>
                            <Image source={{ uri: item.image.url }} style={styles.relatedImage} />
                            <Text style={styles.relatedInfoText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.commentContainer}>
                <Text style={styles.commentTitle}>Comentarios:</Text>
                {comentarios.map((comentario, index) => (
                    <Text key={index} style={styles.comment}>
                        {comentario.comment}
                    </Text>
                ))}
            </View>

            <View style={styles.addCommentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Agregar comentario..."
                    onChangeText={(text) => setNuevoComentario(text)}
                    value={nuevoComentario}
                />
                <Button title="Agregar Comentario" onPress={cometar} />
            </View>

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
    commentContainer: {
        marginTop: 16,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    comment: {
        fontSize: 16,
        marginBottom: 4,
    },
    addCommentContainer: {
        marginTop: 16,
    },
    commentInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
    },
});

export default DetallePlato;
