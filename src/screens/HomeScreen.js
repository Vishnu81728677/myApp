// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ProductCard from '../component/ProductCard';
import { getProducts, searchProducts } from '../services/api';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      loadProducts();
    }
  }, [searchQuery]);

  const loadProducts = async () => {
    setLoading(true);
    const newProducts = await getProducts(page);
    setProducts(prev => page === 1 ? newProducts : [...prev, ...newProducts]);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchProducts(searchQuery);
    setProducts(results);
    setLoading(false);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const loadMore = () => {
    if (!loading && !searchQuery) {
      setPage(prev => prev + 1);
    }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.helloText}>
            Hey, Jasmin
          </Text>
          <Image source={require('../assets/images/image.png')} style={styles.profileImage} />
        </View>

        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            placeholder="Search Products or store"
            style={styles.searchInput}
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.featuredText}>Featured products</Text>
        <TouchableOpacity 
       >
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <ProductCard 
              item={item} 
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
             onAddToCart={() => navigation.navigate('CartScreen')}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="#4CAF50" /> : null}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (keep your existing styles)
  container: {
     flex: 1,
    backgroundColor: '#f1fff1',
    //  paddingHorizontal: wp('4%'),
  },
  topContainer: {
    backgroundColor: '#6cc51d', // light green shade from your screenshot
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
    paddingHorizontal: wp('4%'),
    paddingTop: hp('6%'),
    paddingBottom: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  helloText: {
    fontSize: wp('5%'),
    color: '#F8F9FB',
  },
 
  
  profileImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aedc81',
    borderRadius: wp('8%'),
    paddingHorizontal: wp('4%'),
    // marginTop: hp('2%'),
  },
  
  searchIcon: {
    marginRight: wp('2%'),
  },
  
  searchInput: {
    flex: 1,
    height: hp('6%'),
    fontSize: wp('4%'),
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
    marginLeft:20 ,marginRight:20,
    marginTop: hp('2%')
  },
  featuredText: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    fontFamily:"Manjari-Regular"
  },
  card: {
    width: wp('44%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: hp('12%'),
    resizeMode: 'contain',
  },
  name: {
    fontSize: wp('4%'),
    fontWeight: '500',
    marginVertical: hp('0.5%'),
  },
  qty: {
    fontSize: wp('3.2%'),
    color: '#777',
  },
  price: {
    fontSize: wp('4%'),
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecffee',
    marginTop: hp('1%'),
    paddingVertical: hp('0.7%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
  },
  cartText: {
    color: '#4CAF50',
    marginLeft: wp('1.5%'),
    fontSize: wp('3.5%'),
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
  discountLabel: {
    position: 'absolute',
    top: wp('2%'),
    left: wp('2%'),
    backgroundColor: '#ffe6e6',
    paddingHorizontal: wp('2%'),
    borderRadius: wp('1.5%'),
    fontSize: wp('3%'),
    color: '#cc0000',
  },
  bottomTab: {
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('6%'),
    right: wp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#fff',
    borderRadius: wp('6%'),
    elevation: 5,
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
    justifyContent:"space-evenly"
  }
});

export default HomeScreen;