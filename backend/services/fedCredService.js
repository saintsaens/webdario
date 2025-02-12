import { createFederatedCredential } from "../repositories/fedCredRepository.js"
import { createUser } from "../repositories/usersRepository.js"
import * as fedCredRepository from "../repositories/fedCredRepository.js"

export const createGoogleCredential = async (profile, role = "user") => {
    try {
        // Create user.
        const username = profile.name.givenName;
        const newUser = await createUser(username, null, role);
        if (!newUser) {
            throw new Error("User creation failed");
        }

        try {
            // Then store federated credentials
            const userId = newUser.id;
            const provider = "Google";
            const subject = profile.id;
            const result = await createFederatedCredential(userId, provider, subject);
            return result;
        } catch (error) {
            throw new Error(`Failed to store federated credentials: ${error.message}`);
        }
    } catch (error) {
        throw new Error(`Failed to create Google credentials: ${error.message}`);
    }
};

export const getGoogleCredential = async (profile) => {
    const provider = "Google"
    const subject = profile.id;
    const result = await fedCredRepository.getFederatedCredential(provider, subject);

    return result;
};
