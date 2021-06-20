class TempStorage {
    constructor(props) {
        this.profile= {
                         name: '',
                         email: '',
                         password: '',
                         age: ''
                     };
    
    }
    
    getProfile = (key) => {
        if(key!== undefined) {
            return this.profile[key]||null;
        }
        return this.profile;
    };

    setProfile = (newProfile) => {
        for (let key in newProfile) {
               this.profile[key] = newProfile[key];
          }
        }
}

export const tempstorage = new TempStorage();

