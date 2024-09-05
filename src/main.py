from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.id import ID
from appwrite.query import Query
from appwrite.services.storage import Storage


from appwrite.input_file import InputFile
from MenuWebScraper import MenuWebScraper

endpoint =  'https://cloud.appwrite.io/v1'
platform= 'com.jsm.MyDormPlate'
projectId= '666215c8000015e76b48'
databaseId= '666217ac0022cf47b3c8'
userCollectionId= '666217d1001e4fd1337c'
food_dataCollectionId= '66621809001b4eae229d'
diningHallCollectionId= '667253de002c1dabb4f9'
storageId= '6662197200304382d7af'



client = Client()
client.set_endpoint('https://cloud.appwrite.io/v1')
client.set_project(projectId)
client.set_key('03512dc7ea51b7f7d256f41f76f772cf0ec5510a43a332ede78c6bbe8e531158be834d2e025c315066c6aee5e575d153e348ab5b0110e2c77d9723521e304c888359c90025883a8501151e40e80b7e0cd336aec70955a9b9fd3ed57405cb862d7ac1567e59e8ae246245b5f75b16181784ffda0d9a908243cf1dd467bad71ba9')


db = Databases(client)
scrapyguy = MenuWebScraper()

storage = Storage(client)


# TodayFoodData = scrapyguy.collectMenuData("https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=12&locationName=J2+Dining&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=6%2f14%2f2024")
# TodayNutriLinks = scrapyguy.scrapeLandingPage("https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=12&locationName=J2+Dining&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=6%2f14%2f2024",
#                                               TodayFoodData)

# TodayNutrientData = []
# for link in TodayNutriLinks:
#     TodayNutrientData.append(scrapyguy.collectNutrientInfo(link))
    

# db.create_document(
#     database_id= databaseId,
#     collection_id= food_dataCollectionId,
#     document_id= ID.unique(),
#     data= {
#         'Title': TodayFoodData[0].getTitle(),
#         'Category': TodayFoodData[0].getCat(),
#         'Labels': TodayFoodData[0].getLabels(),
#         'Time':  TodayFoodData[0].getTime(),
#         'Calories': TodayNutrientData[0].get_calories(),
#         'Fat': TodayNutrientData[0].get_fat(),
#         'Saturated_Fat': TodayNutrientData[0].get_saturated_fat(),
#         'Trans_Fat': TodayNutrientData[0].get_trans_fat(),
#         'Cholesterol': TodayNutrientData[0].get_cholesterol(),
#         'Sodium': TodayNutrientData[0].get_sodium(),
#         'Carbohydrates': TodayNutrientData[0].get_carbs(),
#         'Dietary_Fiber': TodayNutrientData[0].get_dietary_fibers(),
#         'Total_Sugars': TodayNutrientData[0].get_total_sugars(),
#         'Added_Sugars': TodayNutrientData[0].get_added_sugars(),
#         'Protein': TodayNutrientData[0].get_protein(),
#         'Vitamin_D': TodayNutrientData[0].get_vit_D(),
#         'Calcium': TodayNutrientData[0].get_calcium(),
#         'Iron': TodayNutrientData[0].get_iron(),
#         'Potassium': TodayNutrientData[0].get_potassium(),
#         'Ingredients_List': TodayNutrientData[0].get_ingredients_list(),
#     }
# )

# counter = 0
# for food in TodayFoodData:
#     db.create_document(
#     database_id= databaseId,
#     collection_id= food_dataCollectionId,
#     document_id= ID.unique(),
#     data= {
#             'Title': food.getTitle(),
#             'Category': food.getCat(),
#             'Labels': food.getLabels(),
#             'Time':  food.getTime(),
#             'Location': food.getLoc(),
#             'Calories': TodayNutrientData[counter].get_calories(),
#             'Fat': TodayNutrientData[counter].get_fat(),
#             'Saturated_Fat': TodayNutrientData[counter].get_saturated_fat(),
#             'Trans_Fat': TodayNutrientData[counter].get_trans_fat(),
#             'Cholesterol': TodayNutrientData[counter].get_cholesterol(),
#             'Sodium': TodayNutrientData[counter].get_sodium(),
#             'Carbohydrates': TodayNutrientData[counter].get_carbs(),
#             'Dietary_Fiber': TodayNutrientData[counter].get_dietary_fibers(),
#             'Total_Sugars': TodayNutrientData[counter].get_total_sugars(),
#             'Added_Sugars': TodayNutrientData[counter].get_added_sugars(),
#             'Protein': TodayNutrientData[counter].get_protein(),
#             'Vitamin_D': TodayNutrientData[counter].get_vit_D(),
#             'Calcium': TodayNutrientData[counter].get_calcium(),
#             'Iron': TodayNutrientData[counter].get_iron(),
#             'Potassium': TodayNutrientData[counter].get_potassium(),
#             'Ingredients_List': TodayNutrientData[counter].get_ingredients_list(),
#             # 'ImageURL': 
#         }
#     )
#     counter = counter + 1

# print(counter)

# foodData = db.list_documents(
#             databaseId, 
#             food_dataCollectionId,
#             [ 
#                 Query.limit(5)
#             ]
#         )

# documents = foodData['documents']
# document_ids = [doc['$id'] for doc in documents]

# db.create_document(
#     database_id=databaseId,
#     collection_id='667273460017af80b5ca',
#     document_id=ID.unique(),
#     data={
#         'Location': "Kins Dining",
#         'docIds': document_ids
#     }
# )

# result = storage.delete_bucket(
#     bucket_id = '667b6a79000d75ebd33a'
# )




# pathway = scrapyguy.downloadImage('Plant-based "Cheese" Pizza')
# print(pathway)

# result = storage.create_file(
#                     bucket_id= '667b6aa50007d1f4f4fa',
#                     file_id= ID.unique(),
#                     file= InputFile.from_path(pathway)
#                 )

# files = storage.list_files('668ecc6e002a6900e032')
# for file in files['files']:
#     file_id = file['$id']
#     storage.delete_file('668ecc6e002a6900e032', file_id)



# getDataNow = storage.delete_bucket(
#     '667b6a79000d75ebd33a'
# )

# print(getDataNow)