// src/components/QuantitySelector.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const QuantitySelector = ({ 
  initialQuantity = 1, 
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange,
  style
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    const newQuantity = Math.max(minQuantity, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(maxQuantity, quantity + 1);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        onPress={handleDecrease} 
        style={styles.button}
        disabled={quantity <= minQuantity}
      >
        <Entypo 
          name="minus" 
          size={20} 
          color={quantity <= minQuantity ? '#ccc' : '#5DBA3B'} 
        />
      </TouchableOpacity>
      
      <Text style={styles.quantity}>{quantity}</Text>
      
      <TouchableOpacity 
        onPress={handleIncrease} 
        style={styles.button}
        disabled={quantity >= maxQuantity}
      >
        <Entypo 
          name="plus" 
          size={20} 
          color={quantity >= maxQuantity ? '#ccc' : '#5DBA3B'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  button: {
    padding: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default QuantitySelector;