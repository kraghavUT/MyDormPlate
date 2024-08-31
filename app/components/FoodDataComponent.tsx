import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from "expo-router";
import React, { useEffect, useState } from 'react'
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import {HeartIcon as HeartSolid} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import { addFavorite, removeFavorite, getImage, checkIfLiked } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const FoodDataComponent = ({foods: {Title, Category, Labels, Time, 
    Calories, Fat,	Saturated_Fat,	Trans_Fat,	Cholesterol, Sodium, 
    Carbohydrates,	Dietary_Fiber,	Total_Sugars, Added_Sugars, Protein, 
    Vitamin_D,	Calcium, Iron, Potassium, Ingredients_List, Location, 
    ImageURL}}) => {


     
        const getIngredientsList = () => {
            var tags = [];
            var ingredients = [];
            var isGlutFree = true
            for(var i = 0; i <Labels.length; i++){
                if (Labels[i].includes('Vegan')) tags.push('Vegan');
                else if (Labels[i].includes('Veggie')) tags.push('Vegetarian');
                else if (Labels[i].includes('Wheat')) isGlutFree = false;
                else if (Labels[i].includes('Halal')) tags.push('Halal');
                else ingredients.push(Labels[i]);
            }
            if(isGlutFree) 
                tags.push('Gluten Free')
            const retVar = []
            retVar[0] = ingredients
            retVar[1] = tags        
            return retVar;
        };
    
        const modifyDescription = (baseDescription, ingredientsList) => {
            if (ingredientsList.length > 0) {
              return `${baseDescription} ${ingredientsList.join(' ⋅ ')}`;
            }
            return baseDescription;
          };
    
        const doubleList = getIngredientsList();
        const ingredientsList = doubleList[0]
        const tagsList = doubleList[1]
        var modifiedIngredientsList;
        var modifiedTagList;
    
        if(ingredientsList.length > 0){
            modifiedIngredientsList = modifyDescription('', ingredientsList);
        }
               
        if(tagsList.length>0){
            modifiedTagList = modifyDescription('', tagsList);
        }   
        
        var isUserNull = false;
        
        const navigation = useNavigation();
        const {user} = useGlobalContext();
        if(user == null){
            isUserNull = true;
        }

        const [isLiked, setIsLiked] = useState(false);

        const checkLikeStatus = async () => {
            if(isUserNull){
                return;
            }
            if(await checkIfLiked(user.$id, Title, Time, Location)){
                setIsLiked(true);
            }
        }

        checkLikeStatus()

        const toggleLike = async () => {
            if(isUserNull){
                return;
            }
            if (isLiked) { 
                await removeFavorite(user.$id, Title, Time, Location);
                setIsLiked(false)
            } else {
                await addFavorite(user.$id, Title, Time, Location);
                setIsLiked(true)
            }
        }

  return (
    <View className='relative'>
        <TouchableOpacity onPress={
            () => router.push({
                pathname: '/MoreInfoFoodScreen',
                params:{Title, Category, modifiedTagList, modifiedIngredientsList, Time, Calories, Fat,	Saturated_Fat,	Trans_Fat,	Cholesterol, Sodium, 
                    Carbohydrates,	Dietary_Fiber,	Total_Sugars, Added_Sugars, Protein, 
                    Vitamin_D,	Calcium, Iron, Potassium, Ingredients_List, ImageURL, Location}
            })
        }
        
        className='bg-primary mr-3 shadow'>
            <Image source={{ uri: ImageURL }} 
            className='h-36 w-80 rounded-sm'
            />
            <View className='px-2 pb-10'>
                <Text className='text-white font-bold text-lg pt-2'>{Title}</Text>

                <View className='flex-row items-center space-x-1'>
                    <Text className='text-xs text-white'>
                        {modifiedTagList}
                    </Text>
                    <TouchableOpacity className='absolute top-[-30px] right-[-10]'
                        onPress={toggleLike}
                        activeOpacity={1}    
                    >
                    {
                        isUserNull ? (
                            <HeartSolid color="red" opacity={1} size={0} />
                        ) : isLiked ? (
                            <HeartSolid color="red" opacity={1} size={30} />
                        ) : (
                            <HeartOutline color="red" opacity={1} size={30} />
                        )
                    }
                            

                    </TouchableOpacity>
                </View>
            </View>
        
        </TouchableOpacity>

    </View>

  )
}

export default FoodDataComponent