
export class UserInfo {
    public businessID: string = "";
    public enable:boolean = false;
    public loginID: string ="";
    public password: string="";
    public adminRole:boolean= false;
    public billerRole:boolean = false;
    
    constructor(businessID:string, loginID:string, password:string, billerRole:boolean, adminRole:boolean, enable:boolean){
        this.businessID= businessID;
        this.enable= enable;
        this.loginID= loginID;
        this.password= password;
        this.adminRole = adminRole;
        this.billerRole = billerRole;

    }
}