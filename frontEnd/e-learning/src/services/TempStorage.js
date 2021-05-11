class TempStorage {
    constructor() {
        this.profile = {
            name: "Pavithra",
            age: 10,
            gender: "female",
            location: "India"
        };
    }
    
    getProfile = () => {
        return this.profile;
    };
}

export const tempstorage = new TempStorage();

