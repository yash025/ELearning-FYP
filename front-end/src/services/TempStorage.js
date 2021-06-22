import {router} from "../services/router";

class TempStorage {
    constructor(props) {
        this.profile= {
                         firstName: '',
                         lastName: '',
                         email: '',
                         password: '',
                         age: '',
                         phoneNumber: ''
                     };
    
    }
    
    getProfile = (key) => {
        if(key!== undefined) {
            return this.profile[key]||null;
        }
        return Object.assign({}, this.profile);
    };

    setProfile = (newProfile) => {
        for (let key in newProfile) {
               this.profile[key] = newProfile[key];
          }
    }

    logout = () => {
        for (let key in this.profile) {
            this.profile[key] = '';
       }
       router.stateService.go('login');
    }
}

export const tempstorage = new TempStorage();

