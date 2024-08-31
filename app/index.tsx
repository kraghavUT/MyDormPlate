import {Redirect, router} from 'expo-router'
import { StatusBar } from "expo-status-bar"
import { Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from './constants';
import CustomButton from './components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function Index() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn){
    return <Redirect href= '/home'/>
  }

  return (
    <SafeAreaView className= "bg-primary h-full">
      <ScrollView contentContainerStyle = {{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source = {images.newLogo}
            className="w-[350px] h-[200px]"
          />
          {/* <Image
            source = {images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          /> */}

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
          
              <Text className= "text-gray-200"> MyDormPlate</Text>
            </Text>
            
            {/* <Image
              source={images.path}
              className='w-[256px] h-[15px] absolute -bottom-2 -right-2'  
              resizeMode='contain'
            /> */}

          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>View menus from 
            your university dining halls to plan your busy days AND get meal suggestions tailored to
            your health goals. Join now for free!
          </Text>

          <CustomButton
            title="Login now"
            handlePress={() => router.push('/sign-in')}
            containerStyles = "w-full mt-7"
            textStyles={''}
            isLoading={''}
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style ='light'/>
    </SafeAreaView>
  );
}
