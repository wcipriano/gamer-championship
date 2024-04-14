import React, { useCallback, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { Container, TeamList, Header } from './styles';
import { Card } from '../../components/card';
import { useFocusEffect } from '@react-navigation/native';
import coverImg from '../../../assets/cover.webp';
import { Input } from '../../components/input/Input';
import { TeamModel } from "../../Model/NbaModel";
import { TeamController } from '../../Controller/TeamController';


type Props = {
  navigation: any;
}

export const Home = ({navigation}:Props) => {
  const [data, setData] = useState<TeamModel[]>([]);

  function handleEdit(id:any) {
    navigation.navigate('Team', {id:id});
  }

  // Load DB data before render screen
  useFocusEffect(useCallback(() => {
    handleFetchData();
  }, [])); 

  async function handleFetchData() {
    try{
      TeamController.get().then((teamList) => {
        setData(teamList);
        console.log('data: ', data);
      })
    }catch(err){
      console.log('Erro ao carregar times nba: ', err);
    }
  }

  const renderItem: ListRenderItem<TeamModel> = ({item}) => 
    <Card 
      data={item}
      onPress={() => handleEdit(item.id)}
    />;

  return (
      <Container>
        <Header source={coverImg}>
          <Input height={10} mb={0} placeholder="Pesquisar..." />
        </Header>
        <TeamList
          data={data}
          keyExtractor={(item: TeamModel) => item.id}
          renderItem={renderItem}
        />
    </Container>
  );
}
