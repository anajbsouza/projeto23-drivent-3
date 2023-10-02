import { ApplicationError } from '@/protocols';

export function cannotGetHotelsErrors(): ApplicationError {
    return {
        name: 'CannotGetHotelsError',
        message: 'Cannot get the hotels list!',
    };
}
