// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CartItem from '../component/CartItem';
import axios from 'axios';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const CartScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontsLoaded] = useFonts({
    "Manjari-Bold": require("../assets/fonts/Manjari-Bold.ttf"),
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
    "Manjari-Thin": require("../assets/fonts/Manjari-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/carts/1');
        console.log("response==",response)
        const transformedItems = response.data.products.map(item => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.thumbnail,
          unit: '1 pc' 
        }));
        
        setCartItems(transformedItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params.cartItems);
    }
  }, [route.params?.cartItems]);

  const updateQuantity = async (id, newQuantity) => {
    try {
      if (newQuantity < 1) {
       
        setCartItems(prev => prev.filter(item => item.id !== id));
      } else {
       
        setCartItems(prev =>
          prev.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 2.0;
  const total = subtotal + delivery;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5DBA3B" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.replace('CartScreen')}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart ({cartItems.length})</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem 
              item={item} 
              onUpdateQuantity={updateQuantity}
            />
          )}
          contentContainerStyle={styles.cartList}
          ListEmptyComponent={
            <View style={styles.emptyCart}>
              <Text style={styles.emptyText}>Your cart is empty</Text>
              <TouchableOpacity
                style={styles.shopButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.shopButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          }
        />

        {cartItems.length > 0 && (
          <>
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>${delivery.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotal}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.paymentSummary}>Payment Summary</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#A4DD72',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  cartList: {
    paddingHorizontal: 16,
    paddingVertical:2,
  },
  itemContainer: {
    backgroundColor: '#Ffffff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAFCE3',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 12,
    color: '#5DBA3B',
    fontWeight: '600',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemUnit: {
    fontSize: 12,
    color: '#999',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 76,
    gap:10
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryBox: {
    marginHorizontal: 16,
    backgroundColor: '#Fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  paymentSummary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  seeAll: {
    fontSize: 14,
    color: '#5DBA3B',
  },
  checkoutButton: {
    backgroundColor: '#6cc51d',
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'rgba(174, 220, 129, 0.1)', // #AEDC81 with 10% opacity
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#5DBA3B',
    padding: 15,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  shopButton: {
    marginTop: 20,
    backgroundColor: '#5DBA3B',
    padding: 15,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;