import React, { useEffect, useState } from 'react';
import { VStack, Heading, Center, HStack, Modal } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { RootTabParamList } from '../../../router';
import { ActivityIndicator } from 'react-native';
import { ExcluirItemDialog } from '../../../components/dialog';


type FormDataProps = {
  id:string
  nome: string
  email: string
  senha: string
  confirmaSenha: string
}

const SchemaRegister = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').min(6, 'Mínimo 6 digitos').email('E-mail inválido'),
  senha: yup.string().required('Senha obrigatória').min(3, 'Mínimo 3 digitos').max(6, 'Máximo 6 dígitos'),
  confirmaSenha: yup.string()
    .required('Confirmação de senha obrigatória')
    .equals([yup.ref('senha')], 'Confirmação de senha incorreta')
    // .oneOf([yup.ref('senha')], 'Confirmação de senha inválida')
})

type UsuarioROuterProp = BottomTabScreenProps<RootTabParamList, 'Usuario'>;

export const Usuario = ({route, navigation}: UsuarioROuterProp) => {
  const {control, handleSubmit, reset, setValue, formState:{errors}} = useForm<FormDataProps>( {
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

  async function handleRegister(data:FormDataProps) {
    data.id = uuid.v4().toString();
    console.log('Register: ', data);
    try {
      //Get data from db
      // const response = await AsyncStorage.removeItem('@formHook:cadastro');
      const response = await AsyncStorage.getItem('@formHook:cadastro');
      const dbData = response ? JSON.parse(response) : [];
      //Save new record to db
      const newData = [...dbData, data];
      await AsyncStorage.setItem('@formHook:cadastro', JSON.stringify(newData));
      Toast.showSuccess('Cadastro realizado com sucesso');
      //Clear form
      reset();
      // Navegate do home (user list)
      handleList();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChangeRegister(data:FormDataProps) {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem('@formHook:cadastro');
      const dbData: FormDataProps[] = response ? JSON.parse(response) : [];
      const dbDataNw = dbData.filter(obj => obj.id !== data.id);
      const dbDataNew = [...dbDataNw, data];
      await AsyncStorage.setItem('@formHook:cadastro', JSON.stringify(dbDataNew));
      Toast.showSuccess('Cadastro alterado com sucesso');
      setLoading(false);
      setSearchId(false);
      reset();
      handleList();
    } catch (err) {
      setLoading(false);
      console.log('Erro ao alterar registro', err);
    }
  }

  async function handleDelete(data:FormDataProps) {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem('@formHook:cadastro');
      const dbData: FormDataProps[] = response ? JSON.parse(response) : [];
      const dbDataNew = dbData.filter(obj => obj.id !== data.id);
      await AsyncStorage.setItem('@formHook:cadastro', JSON.stringify(dbDataNew));
      Toast.showSuccess('Registro excluído com sucesso');
      setShowDeleDialog(false);
      setSearchId(false);
      reset();
      handleList();
    } catch(err) {
      console.log('Erro ao excluir registro', err);
    }
  }

  async function handleSearch(id:string) {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem('@formHook:cadastro');
      const dbData: FormDataProps[] = response ? JSON.parse(response) : [];
      const item = dbData?.find(item => item.id === id);
      if(item){
        Object.keys(item).forEach((key => 
          setValue(key as keyof FormDataProps, item?.[key as keyof FormDataProps] as string) ));
        setSearchId(true);
      }
    } catch (err) {
      console.log('Erro ao buscar registro', err);
    }
    setLoading(false);
  }

  if(loading) {
    return <ActivityIndicator size='large' color='#0000DD' />
  } else {
    return (
      <KeyboardAwareScrollView>
        <VStack bgColor="gray.300" flex={1} p={3}>
          <Center>
            <Heading my={10}>Cadastro de usuario</Heading>
            <Controller
              control={control}
              name="nome"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe o nome'
                    onChangeText={onChange}
                    errorMessage={errors.nome?.message}
                    value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe o email'
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="senha"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Informe a senha'
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.senha?.message}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmaSenha"
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder='Confirme sua senha'
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.confirmaSenha?.message}
                  value={value}
                />
              )}
            />

            {
              searchId ? (
                <VStack>
                  <HStack>
                    <Button rounded="md" shadow={3} title='Alterar' color='#F48820' onPress={handleSubmit(handleChangeRegister)} />
                  </HStack>
                  <HStack paddingTop={5}>
                    <Button rounded="md" shadow={3} title='Excluir' color='#CC0707' onPress={()=> setShowDeleDialog(true)} />
                  </HStack>
                </VStack>
              ) : (
                <Button title='Cadastrar' onPress={handleSubmit(handleRegister)}></Button>
              )
            }
            
          </Center>
        </VStack>

        <Modal isOpen={showDeleDialog} onClose={() => setShowDeleDialog(false)}>
          <ExcluirItemDialog 
            isVisible={showDeleDialog} 
            onCancel={() => setShowDeleDialog(false)}
            onConfirm={handleSubmit(handleDelete)}
          />
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}
