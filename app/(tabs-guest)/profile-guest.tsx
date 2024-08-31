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
  const [form, setForm] = useState({
    gender: '',
    height: null,
    weight: null,
    age: null,
    goal: '',
  })

  const submit = async () => {
    Alert.alert("Login required", "Sign up to create your account now!")
  }

  const goToLogin = async () => {
    router.push('/sign-up')
  }



  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4'
      showsVerticalScrollIndicator={false}>
      
      <View className="w-full justify-center items-center mt-2 mb-6 px-4">
            
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              {/* <Image
                source={}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              /> */}
            </View>

            <InfoBox
              title={"Guest"}
              subtitle={''}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className="mt-5 flex-row">

            </View>

          </View>
          <CustomButton
          title={"Sign up now"}
          handlePress={goToLogin}
          containerStyles={"mt-7"}
          isLoading={uploading}
          textStyles={''}
          />
      
        <Text className='text-2xl text-white mt-10 font-psemibold'>
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

        

      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Profile


