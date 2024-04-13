import React, { useCallback, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { Container, UserList, Header } from './styles';
import { Card, CardProps } from '../../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import coverImg from '../../../assets/cover.webp';
import { Input } from '../../components/input/Input';


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

  const renderItem: ListRenderItem<CardProps> = ({item}) => 
    <Card 
      data={item}
      onPress={() => handleEdit(item.id)}
    />;

  return (
      <Container>
        <Header source={coverImg}>
          <Input height={10} mb={1} placeholder="Pesquisar..." />
        </Header>
        <UserList
          data={data}
          keyExtractor={(item: CardProps) => item.id}
          renderItem={renderItem}
        />
    </Container>
  );
}
