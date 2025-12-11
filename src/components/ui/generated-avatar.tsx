import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { generateAvatarUri, TCollection } from '@/lib/avatar';

interface IGeneratedAvatarProps {
    seed: string;
    collection: TCollection;
    className?: string;
}

export function GeneratedAvatar({ seed, collection, className }: IGeneratedAvatarProps) {

    return (
        <Avatar className={className}>
            <AvatarFallback>{seed.slice(0, 2).toUpperCase()}</AvatarFallback>
            <AvatarImage src={generateAvatarUri({ collection, seed })} alt={seed} />
        </Avatar>
    )
};