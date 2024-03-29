import React from 'react';
import { VStack, Heading, Center} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';


type FormDataProps = {
  id:any
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

export const Usuario = () => {
  const {control, handleSubmit, formState:{errors}} = useForm<FormDataProps>( {
    resolver: yupResolver(SchemaRegister) as any
  });

  async function handleRegister(data:FormDataProps) {
    data.id = uuid.v4();
    console.log(data);
    try {
      //@TODO: Read data from Storage, add new record, and then save
      const responseData = await AsyncStorage.setItem('@formHook:cadastro', JSON.stringify(data));
      console.log(JSON.stringify(responseData));
    } catch (err) {
      console.log(err);
    }
    Toast.showSuccess('Cadastro realizado com sucesso');
  }

  return (
    <KeyboardAwareScrollView>
      <VStack bgColor="gray.300" flex={1} p={3}>
        <Center>
          <Heading my={10}>Cadastro de usuario</Heading>
          <Controller
            control={control}
            name="nome"
            render={({field: {onChange}}) => (
              <Input
                placeholder='Informe o nome'
                  onChangeText={onChange}
                  errorMessage={errors.nome?.message}
              ></Input>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange}}) => (
              <Input
                placeholder='Informe o email'
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              ></Input>
            )}
          />
          <Controller
            control={control}
            name="senha"
            render={({field: {onChange}}) => (
              <Input
                placeholder='Informe a senha'
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.senha?.message}
              ></Input>
            )}
          />
          <Controller
            control={control}
            name="confirmaSenha"
            render={({field: {onChange}}) => (
              <Input
                placeholder='Confirme sua senha'
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.confirmaSenha?.message}
              ></Input>
            )}
          />

          <Button title='Cadastrar' onPress={handleSubmit(handleRegister)}></Button>

        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
