// src/components/CartItem.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CartItem = ({ item, onUpdateQuantity }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri:item.image}} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemPrice}>
          ${item.price.toFixed(2)} x {item.quantity}
        </Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          <Entypo name="plus" size={20} color="#5DBA3B" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          <Entypo name="minus" size={20} color="#5DBA3B" />
        </TouchableOpacity>
      </View>
    </View>
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
      fontWeight: 'bold',
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
      backgroundColor: '#5DBA3B',
      paddingVertical: 14,
      marginHorizontal: 16,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 20,
    },
    checkoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
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
  });
export default CartItem;