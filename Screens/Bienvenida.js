// Bienvenida.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Bienvenida = ({ navigation }) => {
  const handlePlatosPress = () => {
    navigation.navigate('Platos');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/04/b0/66/04b066ebc3e690523a615d40d533658d.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Imagen como icono */}
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8512/8512348.png' }} style={styles.icon} />

        {/* Título */}
        <Text style={styles.title}>¡Bienvenido a EncuentraTuSabor!</Text>

        {/* Botón para ir a la vista de Platos */}
        <TouchableOpacity style={styles.button} onPress={handlePlatosPress}>
          <Text style={styles.buttonText}>Ver Platos</Text>
        </TouchableOpacity>

        {/* Botones para categorías */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={[styles.category, { backgroundColor: '#FFC300' }]} onPress={() => navigation.navigate('Entradas')}>
            <Image source={{ uri: 'https://1.bp.blogspot.com/-6SQEXK5yspg/UOWz0YyEELI/AAAAAAAAA1Y/O88pY9Qa3Fw/s1600/palta-victoria.png' }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Entradas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.category, { backgroundColor: '#FF5733' }]} onPress={() => navigation.navigate('Principal')}>
            <Image source={{ uri: 'https://rinconcitonorteño.com/wp-content/uploads/2023/02/pescado-a-la-plancha-1024x683.png' }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Principal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.category, { backgroundColor: '#C70039' }]} onPress={() => navigation.navigate('Postres')}>
            <Image source={{ uri: 'https://trigodeoro.com.pe/wp-content/uploads/2021/06/postre-selva-negra.png' }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Postres</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFC300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  category: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  categoryText: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Bienvenida;
