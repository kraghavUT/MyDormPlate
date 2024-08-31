import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../components/SearchInput'
import EmptyState from '../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllFoodData, getDiningHalls, getJ2Food, getFavPosts} from '@/lib/appwrite'
import FoodDataComponent from '../components/FoodDataComponent'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useState } from 'react'

// import {images} from '../../constants'

const Favorites = () => {

  const { user } = useGlobalContext();
  
  const{data: favs, refetch} = useAppwrite(getFavPosts, [user.$id])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    //recall
    await refetch();
    setRefreshing(false)
  }

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data = {favs}
        keyExtractor={(item) => item.$id}
        renderItem={({item})=> (
          <FoodDataComponent foods={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
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
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subtitle="No favorites"
            title="Add favorites by clicking the heart!"
          />
        )}
        refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Favorites