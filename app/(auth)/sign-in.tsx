import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../constants'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link, router } from 'expo-router'
import {deleteGuestSessions, getCurrentUser, signIn, signInGuest} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';


const SignIn = () => {
  const {setUser, setisLoggedIn} = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password:''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields');
    }
    setisSubmitting(true);
    try{
        const rez = deleteGuestSessions();
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        if(!result){
          Alert.alert("Login failed", "Account deleted");
          return;
        }
        setUser(result);
        setisLoggedIn(true);

        Alert.alert("Success", "User signed in successfully");
        router.replace('/home');
    }catch(error){
      // console.log(error)
      // Alert.alert('Error');
    }finally{
      setisSubmitting(false);
    }

  }

  const guestSubmit = async () => {

    setisSubmitting(true);
    
    try{
        const rez = deleteGuestSessions();
        await signInGuest();
        Alert.alert("Success", "Signed in as guest");
        router.replace('/home-guest');
    }catch(error){
      // console.log(error)
      // Alert.alert('Error');
      
    }finally{
      setisSubmitting(false);
    }

  }

  

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>

          <Image source = {images.newLogo}
            className='w-[255px] h-[150px]'
          />
          
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'> 
          Log into MyDormPlate</Text>
          <FormField
            title = 'Email'
            value = {form.email}
            handleChangeText = {(e) => setForm({...form, email: e})}
            otherStyles = "mt-7"
            keyboardType = "email-address"
            placeholder={''}
            keyType={''}
          />

          <FormField
            title = 'Password'
            value = {form.password}
            handleChangeText = {(e) => setForm({...form, password: e})}
            otherStyles = "mt-7"
            placeholder={''}
            keyType={''}
          />

          <CustomButton
            title = "Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles={''}
          />

          <CustomButton
            title="Continue as Guest"
            handlePress={guestSubmit}
            containerStyles = "w-full mt-7"
            textStyles={''}
            isLoading={''}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn