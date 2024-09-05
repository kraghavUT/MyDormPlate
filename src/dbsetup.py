from doctest import master
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.id import ID
from appwrite.services.storage import Storage
from requests import delete
from MenuWebScraper import MenuWebScraper
import schedule
import time
from appwrite.input_file import InputFile
from appwrite.query import Query

endpoint =  'https://cloud.appwrite.io/v1'
platform= 'com.rkalya.MyDormPlate'
projectId= '66a05874000650900f76'
databaseId= '669d848f0005879a1b3d'

userCollectionId= '669d84ed000d3dfa4d3d'
masterCollectionId= '669d84ea0019063c55c4'
KINS_Collection= '669d84e6002bf167238b'
J2_Collection= '669d84db0026ebdfdd1e'
JCL_Collection= '669d84e0002244f247fb'
imageBucketID= '669d8497001e7e37c472'

client = Client()
client.set_endpoint(endpoint)
client.set_project(projectId)
# raghav_UT
client.set_key('fc4a67fa4c171fa956cc237b75d26ba9f401be5fc9ea960697ce44b8374ba30f661cc48993f30a454b34fe1ccb1196767967545f6eb8b8ccdc37b5e17cbb92caa59f6fcb96c3e1ceadebdd3ff4dabee4cdddc8bd6de0e2842a6fe24efaee1e4c31047de626847ad4c6a0111e399ca31007431304d80d63bdf6417fa92c9ded87')
db = Databases(client)
storage = Storage(client)





GENERAL_J2_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=12&locationName=J2+Dining&naFlag=1'
GENERAL_JCL_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=01&locationName=Jester+City+Limits+(JCL)&naFlag=1'
GENERAL_KINS_LINK = 'https://hf-foodpro.austin.utexas.edu/foodpro/shortmenu.aspx?sName=University+Housing+and+Dining&locationNum=01&locationName=Kins+Dining&naFlag=1'
# files = storage.list_files(imageBucketID)
# for file in files['files']:
#     file_id = file['$id']
#     storage.delete_file(imageBucketID, file_id)


def main(LINK, collection, location): 
    scrapyguy = MenuWebScraper()
    J2_TodayFoodData = scrapyguy.collectMenuData(LINK, location)
    if(len(J2_TodayFoodData) == 0):
        return
    
    J2_NutriLinks = scrapyguy.scrapeLandingPage(LINK, J2_TodayFoodData)

    J2_TodayNutrientData = []
    for special in J2_NutriLinks:
        J2_TodayNutrientData.append(scrapyguy.collectNutrientInfo(special))

    J2_TodayImageURLs = []
    for food in J2_TodayFoodData:
        print(food.getTitle())
        pathway = scrapyguy.downloadImage(food.getTitle())
        # print(pathway)
        result = storage.create_file(
                        bucket_id= imageBucketID,
                        file_id= ID.unique(),
                        file= InputFile.from_path(pathway)
                    )
        res = f'{endpoint}/storage/buckets/{imageBucketID}/files/{result['$id']}/view?project={projectId}'
        J2_TodayImageURLs.append(res)

    counter = 0
    for food in J2_TodayFoodData:
        db.create_document(
        database_id= databaseId,
        collection_id= collection,
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

def duplicateToMaster(collection):
    try:
        response = db.list_documents(databaseId, collection, [Query.limit(500)])
        documents = response['documents']
        

        for document in documents:
            document_id = document['$id']
            try:
                db.create_document(databaseId, masterCollectionId, ID.unique(), data={
                    'Title': document['Title'],
                    'Category': document['Category'],
                    'Labels': document['Labels'],
                    'Time':  document['Time'],
                    'Location': document['Location'],
                    'Calories': document['Calories'],
                    'Fat': document['Fat'],
                    'Saturated_Fat': document['Saturated_Fat'],
                    'Trans_Fat': document['Trans_Fat'],
                    'Cholesterol': document['Cholesterol'],
                    'Sodium': document['Sodium'],
                    'Carbohydrates': document['Carbohydrates'],
                    'Dietary_Fiber':document['Dietary_Fiber'],
                    'Total_Sugars': document['Total_Sugars'],
                    'Added_Sugars': document['Added_Sugars'],
                    'Protein': document['Protein'],
                    'Vitamin_D':document['Vitamin_D'],
                    'Calcium': document['Calcium'],
                    'Iron': document['Iron'],
                    'Potassium':document['Potassium'],
                    'Ingredients_List': document['Ingredients_List'],
                    'ImageURL': document['ImageURL'],
                })
                print("Success")
            except Exception as e:
                print(f"Error duplicating document {document_id}: {e}")

    except Exception as e:
        print(f"Error fetching documents: {e}")

def delete_all_files():
    try:
        # List all files in the bucket
        response = storage.list_files(imageBucketID, [Query.limit(500)])
        files = response['files']

        for file in files:
            file_id = file['$id']
            try:
                storage.delete_file(imageBucketID, file_id)
            except Exception as e:
                print(f"Error deleting file {file_id}: {e}")

    except Exception as e:
        print(f"Error fetching files: {e}")


def updateDocs():
    try:
        response = db.list_documents(databaseId, JCL_Collection, [Query.limit(500)])
        documents = response['documents']

        for document in documents:
            document_id = document['$id']
            try:
                db.update_document(databaseId, JCL_Collection, document_id, data={
                    "Location": "JCL Dining"
                })
                print("Success")
            except Exception as e:
                print(f"Error deleting document {document_id}: {e}")

    except Exception as e:
        print(f"Error fetching documents: {e}")


def deleteAllDocuments(collection):
    try:
        # List all documents in the collection
        response = db.list_documents(databaseId, collection, [Query.limit(500)])
        documents = response['documents']

        for document in documents:
            document_id = document['$id']
            try:
                db.delete_document(databaseId, collection, document_id)
            except Exception as e:
                print(f"Error deleting document {document_id}: {e}")

    except Exception as e:
        print(f"Error fetching documents: {e}")

def importNewData_J2():
    deleteAllDocuments(masterCollectionId)
    deleteAllDocuments(J2_Collection)
    delete_all_files()
    main(GENERAL_J2_LINK, J2_Collection, "J2 Dining")
    duplicateToMaster(J2_Collection)
    print("J2 Done")

def importNewData_Kins():
    # deleteAllDocuments(KINS_Collection)
    main(GENERAL_KINS_LINK, KINS_Collection, "Kins Dining")
    duplicateToMaster(KINS_Collection)
    print("Kins Done")

def importNewData_JCL():
    # deleteAllDocuments(JCL_Collection)
    main(GENERAL_JCL_LINK, JCL_Collection, "JCL Dining")
    duplicateToMaster(JCL_Collection)
    print("JCL Done")

def getAllDocuments(collection):
    try:
        # List all documents in the collection
        response = db.list_documents(databaseId, collection, [Query.limit(500)])
        return response
    except Exception as e:
        print(f"Error fetching all documents: {e}")

def delete_document(collection, document_id):
    db.delete_document(databaseId, collection, document_id)




def deleteDuplicates(collection):
    documents = getAllDocuments(collection)
    docs = documents['documents']
    seen = {}

    for document in docs:
        title = document['Title']
        time = document['Time']
        key = (title, time)
        
        if key in seen:
            print(f"Deleting duplicate document ID: {document['$id']}")
            delete_document(collection, document['$id'])
        else:
            seen[key] = document['$id']


importNewData_J2()
# importNewData_JCL()
# importNewData_Kins()

# deleteDuplicates(J2_Collection)

# schedule.every().day.at("03:55").do(importNewData_J2)
# schedule.every().day.at("04:10").do(importNewData_Kins)
# schedule.every().day.at("04:25").do(importNewData_JCL)

# while True:
#     schedule.run_pending()
#     time.sleep(1)


