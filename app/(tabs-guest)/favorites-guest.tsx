import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../components/SearchInput'
import EmptyState from '../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllFoodData, getDiningHalls, getJ2Food, getFavPosts} from '@/lib/appwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

// import {images} from '../../constants'

const Favorites = () => {
 

  const goToLogin = async () => {
    router.push('/sign-up')
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>

      <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-3xl font-psemibold text-white">
                  Favorites
                </Text>
              </View>
              <View className="mt-1.5">
                {/* <StarIcon size={35}/> */}
              </View>

            </View>

            {/* <SearchInput
              
              />
             */}
          </View>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data = {[]}
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <FoodDataComponent foods={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
            
            </View>

            {/* <SearchInput
              
              />
             */}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subtitle="No favorites"
            title="Sign up to Add favorites"
          />
        )}
      />
      <CustomButton
            title={"Sign up now"}
            handlePress={goToLogin}
            containerStyles={"mt-7"}
            isLoading={''}
            textStyles={''}
        />
    </SafeAreaView>
  )
}

export default Favorites