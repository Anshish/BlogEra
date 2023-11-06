import configure from '../configure/configure'
import {Client,ID,Databases,Storage,Query} from 'appwrite'

// this class contain function that will help us during creation
// and storation on blogs

export class Service{
    client=new Client()
    databases
    bucket 

    constructor(){
        this.client
            .setEndpoint(configure.appwriteUrl)
            .setProject(configure.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    // post creation service
    async createPost({title,slug,content,image,status,userId}){
        try {
            return await this.databases.createDocument(
                configure.appwriteDatabaseId,
                configure.appwriteCollectionId,
                slug, // this is the id of the document
                {   //this object are all the other data that we will store in database
                    title,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log('Appwrite service config :: createPost :: error',error);
        }
    }

    // post update service
    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(
                configure.appwriteDatabaseId,
                configure.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service config :: updatePost :: error',error);
        }
    }

    // post delete service 
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                configure.appwriteDatabaseId,
                configure.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service config :: deletePost :: error',error);
            return false
        }
    }

    // post get service
    async getPost(slug){
        try {
            const promise= await this.databases.getDocument(
                configure.appwriteDatabaseId,
                configure.appwriteCollectionId,
                slug
            )
            // console.log('promise',promise);
            return promise
        } catch (error) {
            console.log('Appwrite service config :: getPost :: error',error);
        }
    }


    // posts get service using query
    // we will only get those posts that have status active
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                configure.appwriteDatabaseId,
                configure.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite service config :: getPosts :: error',error);
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                configure.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service config :: uploadFile :: error',error);
            return false
        }
    }

    // file delete service
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                configure.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Appwrite service config :: deleteFile :: error',error);
            return false
        }
    }

    // file preview service
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            configure.appwriteBucketId,
            fileId
        )
    }
}

// we will create a single instance of this class
const service=new Service()

export default service