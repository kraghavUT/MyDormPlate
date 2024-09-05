import json
from appwrite.client import Client
from appwrite.services.databases import Databases

client = Client()

(client
 .set_endpoint('http://192.168.1.92:80/v1') # Replace with your local IP address
 .set_project('669d8469001ea0b78bed')             # Your project ID
 .set_key('28e0997407f750177fd87fc59a672c1c82ac66aa1c072817c597f68c5e4c04b6849a76e9262f990f5cd5a8d882276cd25e50140270190f67c0f84dc78b82f43e21f2f9bee0467eadf7657e4d7e47482338236ec79b0cf706cd5354c8452d5403d312d94e12aa3e8258b3cc9aef35fe27e19463618919bd93b94507311952760b'))                   # Your API key

databases = Databases(client)

# Define attributes
attributes = [
    {"key": "Title", "type": "string", 'size': 500},
    {"key": "Category", "type": "string"},
    {"key": "Labels", "type": "enum", "elements": ["Beef", "Fish", "Milk", "Peanuts", "Pork", "Shellfish", "Soy", "Tree_Nuts", "Vegan",
                                                   "Wheat", "Halal", "Veggie", "Sesame", "Eggs"]}, 
    {"key": "Calories", "type": "double"},
    {"key": "Fat", "type": "double"},
    {"key": "Saturated_Fat", "type": "double"},
    {"key": "Trans_Fat", "type": "double"},
    {"key": "Cholesterol", "type": "double"},
    {"key": "Sodium", "type": "double"},
    {"key": "Carbohydrates", "type": "double"},
    {"key": "Dietary_Fiber", "type": "double"},
    {"key": "Total_Sugars", "type": "double"},
    {"key": "Added_Sugars", "type": "double"},
    {"key": "Protein", "type": "double"},
    {"key": "Vitamin_D", "type": "double"},
    {"key": "Calcium", "type": "double"},
    {"key": "Potassium", "type": "double"},
    {"key": "Iron", "type": "double"},
    {"key": "Ingredients_List", "type": "string", 'size': 5000},
    {"key": "Location", "type": "string", 'size': 50},
    {"key": "ImageURL", "type": "string", 'size': 500},
    {"key": "Time", "type": "enum", "elements": ["Breakfast", "Lunch", "Dinner"]}  # Add your enum options
]

database_id = '669d848f0005879a1b3d'  # Replace with your database ID
collection_id = 'your-collection-id'  # Replace with your collection ID
masterCollectionId = '669d84ea0019063c55c4'
KINS_Collection = '669d84e6002bf167238b'
J2_Collection ='669d84db0026ebdfdd1e'
JCL_Collection = '669d84e0002244f247fb'

# Function to add attributes
def add_Masterattributes():
    for attribute in attributes:
        try:
            if attribute['type'] == 'string':
                if(attribute['key'] == 'Ingredients_List' or attribute['key'] == 'ImageURL'):
                    databases.create_string_attribute(
                    database_id, masterCollectionId, attribute['key'], 5000, True)
                databases.create_string_attribute(
                    database_id, masterCollectionId, attribute['key'], 500, True)
            elif attribute['type'] == 'double':
                databases.create_float_attribute(
                    database_id, masterCollectionId, attribute['key'], True)
            elif attribute['type'] == 'enum':
                databases.create_enum_attribute(
                    database_id, masterCollectionId, attribute['key'], attribute['elements'], True)
            print(f"Attribute {attribute['key']} added successfully")
        except Exception as e:
            print(f"Error adding attribute {attribute['key']}: {e}")


def add_Kinsattributes():
    for attribute in attributes:
        try:
            if attribute['type'] == 'string':
                if(attribute['key'] == 'Ingredients_List' or attribute['key'] == 'ImageURL'):
                    databases.create_string_attribute(
                    database_id, KINS_Collection, attribute['key'], 5000, True)
                databases.create_string_attribute(
                    database_id, KINS_Collection, attribute['key'], 500, True)
            elif attribute['type'] == 'double':
                databases.create_float_attribute(
                    database_id, KINS_Collection, attribute['key'], True)
            elif attribute['type'] == 'enum':
                databases.create_enum_attribute(
                    database_id, KINS_Collection, attribute['key'], attribute['elements'], True)
            print(f"Attribute {attribute['key']} added successfully")
        except Exception as e:
            print(f"Error adding attribute {attribute['key']}: {e}")

def add_JCLattributes():
    for attribute in attributes:
        try:
            if attribute['type'] == 'string':
                if(attribute['key'] == 'Ingredients_List' or attribute['key'] == 'ImageURL'):
                    databases.create_string_attribute(
                    database_id, JCL_Collection, attribute['key'], 5000, True)
                databases.create_string_attribute(
                    database_id, JCL_Collection, attribute['key'], 500, True)
            elif attribute['type'] == 'double':
                databases.create_float_attribute(
                    database_id, JCL_Collection, attribute['key'], True)
            elif attribute['type'] == 'enum':
                databases.create_enum_attribute(
                    database_id, JCL_Collection, attribute['key'], attribute['elements'], True)
            print(f"Attribute {attribute['key']} added successfully")
        except Exception as e:
            print(f"Error adding attribute {attribute['key']}: {e}")


def add_J2attributes():
    for attribute in attributes:
        try:
            if attribute['type'] == 'string':
                if(attribute['key'] == 'Ingredients_List' or attribute['key'] == 'ImageURL'):
                    databases.create_string_attribute(
                    database_id, J2_Collection, attribute['key'], 5000, True)
                databases.create_string_attribute(
                    database_id, J2_Collection, attribute['key'], 500, True)
            elif attribute['type'] == 'double':
                databases.create_float_attribute(
                    database_id, J2_Collection, attribute['key'], True)
            elif attribute['type'] == 'enum':
                databases.create_enum_attribute(
                    database_id, J2_Collection, attribute['key'], attribute['elements'], True)
            print(f"Attribute {attribute['key']} added successfully")
        except Exception as e:
            print(f"Error adding attribute {attribute['key']}: {e}")


# def delete_all_attributes():
#     try:
#         # Fetch the collection details
#         collection = databases.get_collection(database_id, masterCollectionId)
#         attributes = collection['attributes']
        
#         # Iterate over attributes and delete them
#         for attribute in attributes:
#             attribute_id = attribute['key']
#             try:
#                 databases.delete_attribute(database_id, masterCollectionId, attribute_id)
#                 print(f"Deleted attribute {attribute_id} successfully")
#             except Exception as e:
#                 print(f"Error deleting attribute {attribute_id}: {e}")
#     except Exception as e:
#         print(f"Error fetching collection details: {e}")

# delete_all_attributes()


add_Masterattributes()
add_Kinsattributes()
add_J2attributes()
add_JCLattributes()