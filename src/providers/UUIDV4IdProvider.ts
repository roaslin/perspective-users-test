import { v4 as uuidv4 } from 'uuid';
import IIdProvider from './IIdProvider';

export default class UUIDV4IdProvider implements IIdProvider {
    generateId(): Promise<string> {
        return Promise.resolve(uuidv4());
    }
}
