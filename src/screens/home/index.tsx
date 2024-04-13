import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import { Card, CardProps } from '../../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: any;
}

export const Home = ({navigation}:Props) => {
  const [data, setData] = useState<CardProps[]>([]);

  function handleEdit(id:any) {
    navigation.navigate('Usuario', {id:id});
  }

  // Load DB data before render screen
  useFocusEffect(useCallback(() => {
    handleFetchData();
  }, [])); 

  async function handleFetchData() {
    try{
      const response = await AsyncStorage.getItem('@formHook:cadastro');
      const data = response ? JSON.parse(response) : [];
      console.log('Registros armazenados: ', data);
      setData(data);
    } catch (err) {
      console.log('Erro ao carregar registros: ', err);
    }
  }

  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => 
          <Card 
            data={item}
            onPress={() => handleEdit(item.id)}
          />
        }
      />
    </View>
  );
}
