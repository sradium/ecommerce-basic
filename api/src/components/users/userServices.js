const userServices = () => {
    const getUserByProperty = async (repository, params) => {
        const user =  await repository.findOne(params);
        return user;
    };

    const getUserById = async (repository, id) => {
        const user = await repository.findById(id);
        return user;
    };

    const createUser = async (
        repository, 
        authLogic, 
        name, 
        lastname,
        plain_password, 
        email
    ) => {
        const password = await authLogic.encryptPassword(plain_password);
        const newUser = await repository.create({
            name,
            lastname,
            password,
            email
        });
        return newUser;
    };

    return {    
        getUserByProperty,
        getUserById,
        createUser
    };  
};

module.exports = userServices;
