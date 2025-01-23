import {Client, Account, ID} from "appwrite";
import conf from "../conf/config";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){//destructing object containing all
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // method call
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",  error);
        }
        return null;//in case the account get method fails to return an error;
    }

    async logout(){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;