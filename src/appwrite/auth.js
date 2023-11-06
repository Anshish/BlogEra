import configure from '../configure/configure'
import { Client, Account, ID } from "appwrite";

// this class will contain functions that we will help us during
// authentication process

export class AuthService{
    client=new Client()
    account

    // we made constructor to initialize the client and account
    // whenever we make new user we will create new client and account
    constructor(){
        this.client
            .setEndpoint(configure.appwriteUrl)
            .setProject(configure.appwriteProjectId)
        this.account=new Account(this.client)
    }

    // this function will help us to create new user
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // if user account is created then we will login 
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            console.log('Appwrite service auth :: createAccount :: error',error);
        }
    }

    // this function will help us to login
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log('Appwrite service auth :: login :: error',error); 
        }
    }

    // this function will help us to get current user
    async getCurrentUser(){ 
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite service auth :: getCurrentUser :: error',error);
        }
    }

    // this function will help us to logout
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service auth :: logout :: error',error);
        }
    }
}

// we made new instance of AuthService class and export it
const authService=new AuthService()

export default authService