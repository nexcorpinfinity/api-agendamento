export interface IBusinessService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAlldataBusinessAndUser(idUser: string): Promise<any>;
}
