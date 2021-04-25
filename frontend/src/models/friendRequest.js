export class friendRequest{
    constructor(accepted, addresseeID, dateSent, inviteID, senderName, senderUsername, profilePhotoURL){
        this.accepted = accepted;
        this.addresseeID = addresseeID;

        let dateYear = dateSent.substring(0, 4);
        let dateMonth = dateSent.substring(5, 7);
        let dateDay = dateSent.substring(8, 10);
        this.dateSent = dateMonth + "/" + dateDay + "/" + dateYear;

        this.inviteID = inviteID;

        this.senderName = senderName;
        this.senderUsername = senderUsername;

        this.profilePhotoURL = profilePhotoURL;

    }
}