from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.id import ID
from appwrite.query import Query
from appwrite.services.storage import Storage
from MenuWebScraper import MenuWebScraper
import os
import io
from PIL import Image
from appwrite.input_file import InputFile


endpoint =  'https://cloud.appwrite.io/v1'
platform= 'com.jsm.MyDormPlate'
projectId= '666215c8000015e76b48'
databaseId= '666217ac0022cf47b3c8'
userCollectionId= '666217d1001e4fd1337c'
food_dataCollectionId= '66621809001b4eae229d'
KINS_Collection = '668cbf00001dc123f815'
J2_Collection = '668cc0e2002042dbc963'
JCL_Collection = '668cbcc00027e779309b'


storageId= '6662197200304382d7af'
imageBucketID = '667b6aa50007d1f4f4fa'

client = Client()
client.set_endpoint('https://cloud.appwrite.io/v1')
client.set_project(projectId) 
# raghav_UT
client.set_key('03512dc7ea51b7f7d256f41f76f772cf0ec5510a43a332ede78c6bbe8e531158be834d2e025c315066c6aee5e575d153e348ab5b0110e2c77d9723521e304c888359c90025883a8501151e40e80b7e0cd336aec70955a9b9fd3ed57405cb862d7ac1567e59e8ae246245b5f75b16181784ffda0d9a908243cf1dd467bad71ba9')
db = Databases(client)
storage = Storage(client)


scrapyguy = MenuWebScraper()

GENERAL_J2_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=12&locationName=J2+Dining&naFlag=1'
GENERAL_JCL_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=01&locationName=Jester+City+Limits+(JCL)&naFlag=1'
GENERAL_KINS_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=01&locationName=Kins+Dining&naFlag=1'


J2_TodayFoodData = scrapyguy.collectMenuData(GENERAL_J2_LINK)
J2_NutriLinks = scrapyguy.scrapeLandingPage(GENERAL_J2_LINK, J2_TodayFoodData)


J2_TodayNutrientData = []
for link in J2_NutriLinks:
    J2_TodayNutrientData.append(scrapyguy.collectNutrientInfo(link))


J2_TodayImageURLs = []
for food in J2_TodayFoodData:
    print(food.getTitle())
    pathway = scrapyguy.downloadImage(food.getTitle())
    result = storage.create_file(
                    bucket_id= imageBucketID,
                    file_id= ID.unique(),
                    file= InputFile.from_path(pathway)
                )
    res = f'cloud.appwrite.io/v1/storage/buckets/{imageBucketID}/files/{result['$id']}/view?project={projectId}'
    J2_TodayImageURLs.append(res)

counter = 0
for food in J2_TodayFoodData:
    db.create_document(
    database_id= databaseId,
    collection_id= J2_Collection,
    document_id= ID.unique(),
    data= {
            'Title': food.getTitle(),
            'Category': food.getCat(),
            'Labels': food.getLabels(),
            'Time':  food.getTime(),
            'Location': food.getLoc(),
            'Calories': J2_TodayNutrientData[counter].get_calories(),
            'Fat': J2_TodayNutrientData[counter].get_fat(),
            'Saturated_Fat': J2_TodayNutrientData[counter].get_saturated_fat(),
            'Trans_Fat': J2_TodayNutrientData[counter].get_trans_fat(),
            'Cholesterol': J2_TodayNutrientData[counter].get_cholesterol(),
            'Sodium': J2_TodayNutrientData[counter].get_sodium(),
            'Carbohydrates': J2_TodayNutrientData[counter].get_carbs(),
            'Dietary_Fiber': J2_TodayNutrientData[counter].get_dietary_fibers(),
            'Total_Sugars': J2_TodayNutrientData[counter].get_total_sugars(),
            'Added_Sugars': J2_TodayNutrientData[counter].get_added_sugars(),
            'Protein': J2_TodayNutrientData[counter].get_protein(),
            'Vitamin_D': J2_TodayNutrientData[counter].get_vit_D(),
            'Calcium': J2_TodayNutrientData[counter].get_calcium(),
            'Iron': J2_TodayNutrientData[counter].get_iron(),
            'Potassium': J2_TodayNutrientData[counter].get_potassium(),
            'Ingredients_List': J2_TodayNutrientData[counter].get_ingredients_list(),
            'ImageURL': J2_TodayImageURLs[counter]
        }
    )
    counter = counter + 1



