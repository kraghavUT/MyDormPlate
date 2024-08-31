import {Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.rkalya.MyDormPlate',
    projectId: '66a05874000650900f76',
    databaseId: '669d848f0005879a1b3d',
    
    userCollectionId: '669d84ed000d3dfa4d3d',
    masterCollectionId: '669d84ea0019063c55c4',
    KINS_Collection: '669d84e6002bf167238b',
    J2_Collection: '669d84db0026ebdfdd1e',
    JCL_Collection: '669d84e0002244f247fb',
    imageBucketID: '669d8497001e7e37c472',

    // platform: 'com.jsm.MyDormPlate',
    // projectId: '666215c8000015e76b48',
    // databaseId: '666217ac0022cf47b3c8',
    // userCollectionId: '666217d1001e4fd1337c',
    // food_dataCollectionId: '66621809001b4eae229d',
    // storageId: '6662197200304382d7af',
    // imageStorageId: '667b6aa50007d1f4f4fa',
    // diningHallCollectionId: '667253de002c1dabb4f9',
    // hallsCollecId: '667273460017af80b5ca',
    // J2_Collection: '668cc0e2002042dbc963',
    // endpoint:  'https://mydormplate.ddns.net/v1',
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    food_dataCollectionId,
    imageStorageId,
    storageId,
    masterCollectionId,
    diningHallCollectionId,
    JCL_Collection,
    KINS_Collection,
    J2_Collection,
} = appwriteConfig;

const client = new Client();

client
    .setEndpoint(endpoint) // Appwrite Endpoint
    .setProject(projectId) // Project ID
    .setPlatform(platform) // Application ID or bundle ID

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);


export const createUser = async (email, password, username) => {
    try{
        const newAcc = await account.create(
            ID.unique(), 
            email,
            password,
            username
        )
        if(!newAcc) throw Error;

        const avatarURL = avatars.getInitials(username);

        await signIn(email, password);
        const newUser = await db.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAcc.$id,
                email,
                username,
                avatar: avatarURL
            }
        )
        return newUser;


    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async(email, password) =>{
    try{
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    }catch(error){
        throw new Error(error);
    }
}

export const signInGuest = async () => {
    try {
        const guestSesh = await account.createAnonymousSession()
        return guestSesh;
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteGuestSessions = async () => {
        const sessionsResponse = await account.getSession('current');
        if(sessionsResponse == null){
            return;
        }
        const test = await account.deleteSession(sessionsResponse.$id);
        return test;
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount)throw Error;
        const currentUser = db.listDocuments(
            appwriteConfig.databaseId, appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return (await currentUser).documents[0];
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllFoodData = async () => {
    try{
        const foodData = await db.listDocuments(
            databaseId, 
            food_dataCollectionId,
            [ 
                Query.limit(10)
            ]
        )
        
        return foodData.documents
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getJ2Food = async () => {
    try{
        const foodData = await db.listDocuments(
            databaseId, 
            J2_Collection,
            [Query.limit(10)]
        )
        return foodData.documents
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getJCLFood = async () => {
    try{
        const foodData = await db.listDocuments(
            databaseId, 
            JCL_Collection,
            [Query.limit(10)]
        )
        return foodData.documents
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getKinsFood = async () => {
    try{
        const foodData = await db.listDocuments(
            databaseId, 
            KINS_Collection,
            [Query.limit(10)]
        )
        return foodData.documents
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getImage = async (fileID) => {
    try {
        const foodData = await storage.getFilePreview(
            imageStorageId, 
            fileID
        )
        
        return foodData.href
    } catch (error) {
        throw new Error(error)
    }


}


export const getDiningHalls = async () => {
    try{
        const foodData = await db.listDocuments(
            databaseId, 
            '667253de002c1dabb4f9',
        )
        return foodData.documents
        
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadUserHealthInput = async (form) => {
    try {
        const result = await db.updateDocument(
            databaseId, // databaseId
            userCollectionId, // collectionId
            form.userID, // documentId
            {
                height: form.height,
                weight: form.weight,
                age: form.age,
                gender: form.gender,
                goal: form.goal
            },
        );
        return result
    } catch (error) {
        throw new Error(error);
    }
}

export const getBestProtein = async () => {

    try {
        const result = await db.listDocuments(
            databaseId, // databaseId
            masterCollectionId, // collectionId
            [ 
                // Query.select("Title"),
                Query.limit(100),
                Query.orderDesc("Protein")
            ]
        );
        return result.documents
    } catch (error) {
        throw new Error(error);
    }


}

export const getLeastFat = async () => {

    try {
        const result = await db.listDocuments(
            databaseId, // databaseId
            masterCollectionId, // collectionId
            [ 
                // Query.select("Title"),
                // Query.orderAsc("Fat"),
                Query.and([Query.lessThan("Fat", 3), Query.greaterThan("Fat", 0)] ),
                
                Query.limit(100)
            ]
        );
        return result.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserData = async (userID) => {
    try {
        const user = await db.getDocument(
            databaseId, // databaseId
            userCollectionId, // collectionId
            userID
        );
        return user
    } catch (error) {
        throw new Error(error);
    }
}

const calculateProteinPerDay = (userWeight) => {
    //0.36g/lb  /day protein
    return userWeight*0.36
}

const calculateCarbsPerDay = (userWeight) => {
    //3 grams carbs per pound/day
    return userWeight*3
}

export const getBestForUser = async (user) => {

    try {
        const userInfo = await getUserData(user.$id)

        const result = await db.listDocuments(
            databaseId, // databaseId
            masterCollectionId, // collectionId
            [
                Query.limit(500),
                Query.or([Query.greaterThanEqual("Carbohydrates", calculateCarbsPerDay(userInfo.weight)/3), 
                    Query.greaterThanEqual("Protein", calculateProteinPerDay(userInfo.weight)/3)])                
            ]
        );
        return result.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const addFavorite = async (userID, Title, Time, location) => {
    
    try {
        let collecId = ''
        if(location == "J2 Dining"){
            collecId = J2_Collection
        }
        else if(location == "Kins Dining"){
            collecId = KINS_Collection
        }
        else
            collecId = JCL_Collection

        const getDocs = await db.listDocuments(
            databaseId,
            collecId,
            [
                Query.contains("Title", Title),
                Query.contains("Time", Time)
            ]
        )
        let findDocs = getDocs.documents
        
        const favs = findDocs[0].favorites || [];
        favs.push(userID)
        let docID = findDocs[0].$id
        const result = await db.updateDocument(
            databaseId, // databaseId
            collecId, // collectionId
            docID, // documentId
            {
                favorites: favs,
                favorites_count: favs.length
            }
        )
        console.log('Added fav: ', findDocs[0].$id)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const removeFavorite = async (userID, Title, Time, location) => {
    
    try {
        let collecId = ''
        if(location == "J2 Dining"){
            collecId = J2_Collection
        }
        else if(location == "Kins Dining"){
            collecId = KINS_Collection
        }
        else
            collecId = JCL_Collection

        const getDocs = await db.listDocuments(
            databaseId,
            collecId,
            [
                Query.contains("Title", Title)
            ]
        )
        let findDocs = getDocs.documents
        
        const favs = findDocs[0].favorites || [];
        favs.pop(userID)
        let docID = findDocs[0].$id
        const result = await db.updateDocument(
            databaseId, // databaseId
            collecId, // collectionId
            docID, // documentId
            {
                favorites: favs,
                favorites_count: favs.length
            }
        )
        console.log('Removed fav: ', findDocs[0].$id)
        return result
    } catch (error) {
        throw new Error(error)
    }
}


export const getFoodDoc = async (Title, Time) => {
    try {
        const result = await db.listDocuments(
            databaseId,
            food_dataCollectionId,
            [
                // Query.and([Query.contains("Title", Title), Query.contains("Time", Time)])
                Query.contains("Title", Title)
            ]
        )
        return result.documents[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const checkIfLiked = async (userID, Title, Time, loc) => {
    try {
        let collecId = ''
        if(loc == "J2 Dining"){
            collecId = J2_Collection
        }
        else if(loc == "Kins Dining"){
            collecId = KINS_Collection
        }
        else
            collecId = JCL_Collection

        const getDocs = await db.listDocuments(
            databaseId,
            collecId,
            [
                Query.contains("Title", Title), 
                Query.contains("Time", Time)
            ]
        )
        let findDocs = getDocs.documents
        var favs = []
        
        favs = findDocs[0].favorites
        
        
        if(favs.includes(userID)){
            return true;
        }
        else{
            return false;
        }

    } catch (error) {
        throw new Error(error)
    }
}

export const getFavPosts = async (userID) => {
    try {
        const list = await db.listDocuments(
            databaseId,
            J2_Collection,
            [
                Query.greaterThan('favorites_count', 0)
            ]
        )
        const list2 = await db.listDocuments(
            databaseId,
            JCL_Collection,
            [
                Query.greaterThan('favorites_count', 0)
            ]
        )
        const list3 = await db.listDocuments(
            databaseId,
            KINS_Collection,
            [
                Query.greaterThan('favorites_count', 0)
            ]
        )
        


        return list.documents.concat(list2.documents).concat(list3.documents)
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteAppwriteAccount = async (userID) => {
    try {
        const del = db.deleteDocument(databaseId, userCollectionId, userID)
        return del;

    } catch (error) {
        throw new Error(error)
    }
}

export const getJ2Breakfast = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            J2_Collection,
            [
                Query.contains("Time", "Breakfast"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getJ2Lunch = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            J2_Collection,
            [
                Query.contains("Time", "Lunch"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getJ2Dinner = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            J2_Collection,
            [
                Query.contains("Time", "Dinner"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getJCLBreakfast = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            JCL_Collection,
            [
                Query.contains("Time", "Breakfast"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getJCLLunch = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            JCL_Collection,
            [
                Query.contains("Time", "Lunch"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getJCLDinner = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            JCL_Collection,
            [
                Query.contains("Time", "Dinner"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getKinsBreakfast = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            KINS_Collection,
            [
                Query.contains("Time", "Breakfast"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getKinsLunch = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            KINS_Collection,
            [
                Query.contains("Time", "Lunch"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getKinsDinner = async () => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            KINS_Collection,
            [
                Query.contains("Time", "Dinner"),
                Query.limit(1000)
            ]
        )
        return foods.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const foods = await db.listDocuments(
            databaseId,
            masterCollectionId,
            [Query.search('Title', query)]
        )
        return foods.documents
    } catch (error) {
        throw new Error(error)
    }
}


export const getCategoriesList = async (time, location) => {
    
    var collectID;
    if(location == "J2"){
        collectID = J2_Collection
    }

    else if(location == "Kins"){
        collectID = KINS_Collection
    }
    else if(location == "JCL"){
        collectID = JCL_Collection
    }

    try {
        const cats = await db.listDocuments(
            databaseId,
            collectID,
            [
                Query.select("Category"),
                Query.contains("Time", time),
                Query.limit(400)
            ]
        )
        const categories = cats.documents.map(doc => doc.Category);
        const uniqueCategories = [...new Set(categories)];

        // console.log(uniqueCategories);
        return uniqueCategories;

    } catch (error) {
        throw new Error(error)
    }


}

export const getCategoryFood = async (time, location, categoriesList) => {
    var collectID;
    if(location == "J2"){
        collectID = J2_Collection
    }
    else if(location == "Kins"){
        collectID = KINS_Collection
    }
    else if(location == "JCL"){
        collectID = JCL_Collection
    }

    try {
        var allCatFood = []
        for(let i = 0; i<categoriesList.length; i++){
            const cats = await db.listDocuments(
                databaseId,
                collectID,
                [
                    Query.and([Query.contains("Time", time), Query.contains("Category", categoriesList[i])]),
                    Query.limit(400)
                ]
            )
            
            allCatFood.push(cats.documents);
        }
        return allCatFood
    } catch (error) {
        throw new Error(error)
    }



}