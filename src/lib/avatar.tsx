import { lorelei, croodlesNeutral, botttsNeutral, initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';


export type TCollection = "lorelei" | "botttsNeutral" | "croodlesNeutral" | "initials";
interface IGenerateAvatarUri {
    seed: string;
    collection?: TCollection;
    options?: Parameters<typeof createAvatar>[1];
}

function mapCollectionToAvatar(collection: IGenerateAvatarUri["collection"]): Parameters<typeof createAvatar>[0] {
    switch (collection) {
        case "lorelei":
            return lorelei;
        case "botttsNeutral":
            return botttsNeutral;
        case "croodlesNeutral":
            return croodlesNeutral;
        case "initials":
            return initials;

        default:
            return initials;
    }
}



export const generateAvatarUri = ({ seed, collection = "initials", options }: IGenerateAvatarUri) => {
    const avatar = createAvatar(mapCollectionToAvatar(collection), {
        ...options,
        seed,
    });

    return avatar.toDataUri();
}