import React, { useCallback, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { View, FlatList , ImageBackground} from 'react-native';
import { styles } from './styles';
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

  async function handleFetchData(searchText:string="") {
    try{
      TeamController.get('/teams', searchText).then((teamList) => {
        setData(teamList);
        console.log('handleFetchData: ', teamList.length);
      })
    }catch(err){
      console.log('Erro ao carregar times nba: ', err);
    }
  }

  async function handleSearch(text:string):Promise<void> {
    await handleFetchData(text);
  }

  const renderItem: ListRenderItem<TeamModel> = ({item}) => 
    <Card 
      data={item}
      onPress={() => handleEdit(item.id)}
    />;

  return (
      <View style={styles.Container}>
        <ImageBackground style={styles.header} source={coverImg}>
          <Input height={10} mb={0.5} placeholder="Pesquisar..." 
                 onChangeText={(text) => handleSearch(text)}
          />
        </ImageBackground>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item: TeamModel) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
    </View>
  );
}
