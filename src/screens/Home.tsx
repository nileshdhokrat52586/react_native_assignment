import React, { useEffect } from 'react';
import { View, Button, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, incrementCounter, loadPersistedData } from '../store/slices/homeSlice';
import { RootState, AppDispatch } from '../store';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { counter, items, loading } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(loadPersistedData());
  }, [dispatch]);

  const handleFetch = () => {
    dispatch(incrementCounter());
    dispatch(fetchData());
  };

  return (
    <View style={styles.container}>
      <AnimatedCounter value={counter} />
      <TouchableOpacity style={styles.button} onPress={handleFetch}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" style={{ margin: 20 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:25,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#2c3e50',
  },
});
