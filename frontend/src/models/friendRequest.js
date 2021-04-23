import { AccountsRepository } from '../api/AccountRepository'

export class friendRequest{
    accountRepo = new AccountsRepository();

    constructor(accepted, addresseeID, dateSent, inviteID, senderID){
        this.accepted = accepted;
        this.addresseeID = addresseeID;
        let dateYear = dateSent.substring(0, 4);
        let dateMonth = dateSent.substring(5, 7);
        let dateDay = dateSent.substring(8, 10);

        this.dateSent = dateMonth + "/" + dateDay + "/" + dateYear;
        this.inviteID = inviteID;

        this.senderID = senderID;
        let senderUser = '';
        this.accountRepo.getUserByID(senderID).then(username => {
            senderUser = username;
        }
        )
        this.sender = senderUser;

    }
}