import { View, Text, ScrollView, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'
import {deleteAppwriteAccount, getAllFoodData, getCurrentUser, signOut, uploadUserHealthInput } from '@/lib/appwrite'
import { router } from 'expo-router'
import icons from '../constants/icons'
import InfoBox from '../components/InfoBox'

const Profile = () => {

  const [uploading, setUploading] = useState(false)
  const {user, setUser, setisLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    gender: '',
    height: null,
    weight: null,
    age: null,
    goal: '',
  })

  const logout = async () => {
    await signOut();
    router.replace('/sign-in');
    setUser(null);
    setisLoggedIn(false);    
  }

  const deleteAccount = async () => {
    await signOut();
    await deleteAppwriteAccount(user.$id)
    router.replace('/sign-in');
    setUser(null);
    setisLoggedIn(false); 
    Alert.alert("Account deleted", "Your account and data will be wiped from our servers within 24 hours. You will recieve a confirmation email when that happens.");
  }

  const submit = async () => {
    try {
      if ((form.gender === '') || (form.height === '') || (form.weight === '') ||
      (form.age === '') || (form.goal === '')){
        return Alert.alert("Please provide all fields");
      }
      setUploading(true);
      try {
        await uploadUserHealthInput({
          ...form, userId: user.$id
        } )
        Alert.alert("Health Info Added", "Uploaded successfully");
        router.push("/home");
        
      } catch (error) {
        throw new Error(error) 
      }


    } catch (error) {
      throw new Error(error)
    } finally{
      setForm({
        gender: '',
        height: null,
        weight: null,
        age: null,
        goal: '',
      })
    }
  }

  return (


    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4'
      showsVerticalScrollIndicator={false}>
      
      <View className="w-full justify-center items-center mt-2 mb-6 px-4">
            <TouchableOpacity className="w-full items-end mb-10"
            onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6 "
              
              />
            </TouchableOpacity>
          
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{uri:user.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              subtitle={''}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className="mt-5 flex-row">

            </View>

          </View>

      
        <Text className='text-2xl text-white font-psemibold'>
          Health Inputs
        </Text>
        <FormField
          title={"Height"}
          value={form.height}
          placeholder={"Enter height in inches"}
          handleChangeText={(e) => setForm({...form , height: e})}
          otherStyles='mt-10'
          keyType={'numeric'}
        />

        <FormField
          title={"Weight"}
          value={form.weight}
          placeholder={'Enter weight (lbs)'}
          handleChangeText={(e) => setForm({...form , weight: e})}
          otherStyles='mt-10'
          keyType={'numeric'}
        />
        
        <FormField
          title={"Age"}
          value={form.age}
          placeholder={'Enter age'}
          handleChangeText={(e) => setForm({...form , age: e})}
          otherStyles='mt-10'
          keyType={'numeric'}
          
        />
        <FormField
          title={"Gender"}
          value={form.gender}
          placeholder={'M/F'}
          handleChangeText={(e) => setForm({...form , gender: e})}
          otherStyles='mt-10'
          keyType={'default'}
        />

        <FormField
          title={"Goal"}
          value={form.goal}
          placeholder={'Bulk/Maintain/Cut'}
          handleChangeText={(e) => setForm({...form , goal: e})}
          otherStyles='mt-10'
          keyType={'default'}
        />

        <CustomButton
          title={"Submit"}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={uploading}
          textStyles={''}
        
        />

        <CustomButton
          title={"Delete Account"}
          handlePress={deleteAccount}
          containerStyles={"mt-11 bg-red-500"}
          isLoading={uploading}
          textStyles={''}
        />

        



      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Profile


