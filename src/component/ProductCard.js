// src/components/ProductCard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import QuantitySelector from './QuantitySelector';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const ProductCard = ({ 
  item, 
  isFavorite, 
  showQuantity,
  currentQuantity = 1,
  onToggleFavorite, 
  onAddToCart,
  onQuantityChange
}) => {
  const bounceValue = new Animated.Value(1);

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
    onToggleFavorite();
  };


  const [fontsLoaded] = useFonts({
    "Manjari-Bold": require("../assets/fonts/Manjari-Bold.ttf"),
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
    "Manjari-Thin": require("../assets/fonts/Manjari-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.heartIcon} onPress={handleFavoritePress}>
        <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={18}
            color={isFavorite ? 'red' : '#ccc'}
          />
        </Animated.View>
      </TouchableOpacity>

      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.qty}>{item.stock} in stock</Text>
      <View  style={styles.divider}/>
      {showQuantity ? (
        <QuantitySelector 
          initialQuantity={currentQuantity}
          onQuantityChange={onQuantityChange}
          style={styles.quantitySelector}
        />
      ) : (
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={onAddToCart}
        >
          <Ionicons name="cart-outline" size={16} color="#4CAF50" />
          <Text style={styles.cartText}>Add to cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
  card: {
    width: wp('44%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
    position: 'relative',
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: hp('12%'),
    resizeMode: 'contain',
  },
  name: {
    fontSize: wp('3%'),
    fontWeight: '400',
    marginVertical: hp('0.5%'),
    color:"#000"
  },
  qty: {
    fontSize: wp('3.2%'),
    color: '#777',
  },
  price: {
    fontSize: wp('2.9%'),
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: hp('1%'),
    
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('-1%'),
    paddingVertical: hp('0.7%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
  },
  cartText: {
    color: '#000',
    marginLeft: wp('1.5%'),
    fontSize: wp('3%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#Ebebeb', 
    marginVertical: 10,         
    width: '100%',              
  },
  heartIcon: {
    position: 'absolute',
    top: wp('2%'),
    right: wp('2%'),
  },
  newLabel: {
    position: 'absolute',
    top: wp('2%'),
    left: wp('2%'),
    backgroundColor: '#fff2cc',
    paddingHorizontal: wp('2%'),
    borderRadius: wp('1.5%'),
    fontSize: wp('3%'),
    color: '#444',
  },

  tabIcon: {
    backgroundColor: '#4CAF50',
    padding: wp('2%'),
    borderRadius: wp('5%'),
  },

  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '60%',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper:{
    justifyContent:"space-between",
    marginLeft:16,
    marginRight:12
  }
});

export default ProductCard;