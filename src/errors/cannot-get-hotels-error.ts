import { ApplicationError } from '@/protocols';

export function cannotGetHotelsErrors(): ApplicationError {
    return {
        name: 'CannotGetHotels',
        message: 'Cannot get the hotels list!',
    };
}
