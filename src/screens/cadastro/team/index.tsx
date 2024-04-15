import React, { useEffect, useState } from 'react';
import { VStack, Heading, Center, HStack, Modal } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Toast from 'react-native-tiny-toast';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { RootTabParamList } from '../../../router';
import { ActivityIndicator } from 'react-native';
import { ExcluirItemDialog } from '../../../components/dialog';
import { TeamModel } from '../../../Model/NbaModel';
import { TeamController } from '../../../Controller/TeamController';


const SchemaRegister = yup.object({
  name: yup.string()
    .required('Nome obrigatório')
    .matches(/^[A-Za-z]*$/, "Use somente letras aqui")
    .min(3, 'Mínimo 3 digitos'),
  fullName: yup.string()
    .required('Nome completo obrigatório')
    .min(8, 'Mínimo 8 digitos')
    .max(20, 'Máximo 20 digitos'),
  abbreviation: yup.string()
    .required('Abreviação do nome obrigatória')
    .length(3, 'Abreviação deve ter exatamente 3 caracteres')
    // .uppercase('Use somente letras maiúsculas')
    .matches(/^[A-Z\s]+$/, "Use somente letras maiúsculas"), 
  city: yup.string()
    .required('Cidade obrigatória')
    .min(3, 'Mínimo 6 digitos'),
  conference: yup.string()
    .required('Conferencia obrigatória')
    .oneOf(['East', 'West', 'Leste', 'Oeste'], 'Divisão inválida. Use East ou West'),
  division: yup.string()    
})

type TeamRouterProp = BottomTabScreenProps<RootTabParamList, 'Team'>;

export const Team = ({route, navigation}: TeamRouterProp) => {
  const {control, handleSubmit, reset, setValue, formState:{errors}} = useForm<TeamModel>( {
    resolver: yupResolver(SchemaRegister) as any
  });

  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(true);
  const [showDeleDialog, setShowDeleDialog] = useState(false);
  const isEditing = !!route?.params?.id;

  // useEffect: Load data before render screen
  useEffect(() => {
    if(isEditing) {
      handleSearch(route.params.id);
      setSearchId(true);
    } else {
      setSearchId(false);
      reset();
      setLoading(false);
    }
    return() => setLoading(true);
  }, [route, isEditing]);

  useEffect(() => {
    if (route?.params?.id) handleSearch(route?.params?.id);
    else {
      reset();
      setLoading(false);
    }
    return () => setLoading(true);
  }, [route]);

  function handleList() {
    navigation.navigate('Home');
  }

  async function handleRegister(data:TeamModel) {
    console.log('Register data: ', data);
    try {
      TeamController.post('/teams', data)
        .then((response) => {
          console.log('Registro Response: ', response);
          if(response)  {
            console.log('Registro adicionado com suceso, ID: ', response.id);
            Toast.showSuccess(`Registro inserido: ${response.id}`);
            //Clear form
            reset();
            // Navegate do home (user list)
            handleList();
          } else {
            console.log('Erro ao inserir registro via API: ', response);
          }
        });
    } catch (err) {
      setLoading(false);
      console.log('Erro ao inserir registro', err);
    }
  }
  
  async function handleChangeRegister(data:TeamModel) {
    console.log('ChangeRegister data: ', data);
    try {
      TeamController.put('/teams', data)
        .then((response) => {
          console.log('Registro Response: ', response);
          if(response)  {
            console.log('Registro alterado com suceso, ID: ', response.id);
            Toast.showSuccess(`Registro atualizado: ${response.id}`);
            setLoading(false);
            setSearchId(false);
            reset();
            handleList();
          } else {
            console.log('Erro ao alterar registro via API: ', response);
          }
        });
    } catch (err) {
      setLoading(false);
      console.log('Erro ao alterar registro', err);
    }
  }

  async function handleDelete(data:TeamModel) {
    console.log('handleDelete data: ', data);
    try {
      TeamController.delete('/teams', data.id)
        .then((response) => {
          console.log('Registro Response: ', response);
          if(response)  {            
            console.log('Registro excluido com suceso, ID: ', data.id);
            Toast.showSuccess('Registro excluído com sucesso');
            setShowDeleDialog(false);
            setSearchId(false);
            reset();
            handleList();
          } else {
            console.log('Erro ao excluir registro via API: ', response);
          }
        });
    } catch (err) {
      console.log('Erro ao excluir registro', err);
    }
  }

  async function handleSearch(id:number) {
    try {
      setLoading(true);
      TeamController.getById('/teams', id)
        .then((response) => {
          console.log('Registro Response: ', response);
          if(response)  {            
            console.log('Registro recuperado com suceso: ', response.fullName);
            Object.keys(response).forEach((key => 
              setValue(key as keyof TeamModel, response?.[key as keyof TeamModel] as string) ));
            setSearchId(true);
            setLoading(false);
          } else {
            console.log('Registro não encontrado: ', response);
          }
        });
    } catch (err) {
      console.log('Erro ao buscar registro via API', err);
    }
  }


  if(loading) {
    return <ActivityIndicator size='large' color='#0000DD' />
  } else {
    return (
      <KeyboardAwareScrollView>
        <VStack bgColor="gray.300" flex={1} px={3}>
          <Center>
            <Heading my={5}>Cadastro de time</Heading>
            <Controller
              control={control}
              name="name"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe nome do time'
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                    value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="fullName"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe nome completo'
                  onChangeText={onChange}
                  errorMessage={errors.fullName?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="abbreviation"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe abreviação'
                  onChangeText={onChange}
                  errorMessage={errors.abbreviation?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe cidade'
                  onChangeText={onChange}
                  errorMessage={errors.city?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="conference"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe conferencia'
                  onChangeText={onChange}
                  errorMessage={errors.conference?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="division"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe divisão'
                  onChangeText={onChange}
                  errorMessage={errors.division?.message}
                  value={value}
                />
              )}
            />

            {
              searchId ? (
                <VStack style={{ flexDirection:"row" }}>
                    <Button width='48%' shadow={3} title='Alterar' color='#F48820' onPress={handleSubmit(handleChangeRegister)} />
                    <Button width='48%' style={{ marginLeft:10 }} shadow={3} title='Excluir' color='#CC0707' onPress={()=> setShowDeleDialog(true)} />
                </VStack>
              ) : (
                <VStack style={{ flexDirection:"row" }}>
                    <Button width='48%' title='Cadastrar' onPress={handleSubmit(handleRegister)}></Button>
                    <Button width='48%' style={{ marginLeft:10 }} title='Cancelar' color='#999' onPress={handleList}></Button>
                </VStack>
              )
            }
            
          </Center>
        </VStack>

        <Modal isOpen={showDeleDialog} onClose={() => setShowDeleDialog(false)}>
          <ExcluirItemDialog 
            msg='Deseja realmente excluir?'
            isVisible={showDeleDialog} 
            onCancel={() => setShowDeleDialog(false)}
            onConfirm={handleSubmit(handleDelete)}
          />
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}
