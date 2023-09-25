export default interface IIdProvider {
    generateId(): Promise<string>;
}
