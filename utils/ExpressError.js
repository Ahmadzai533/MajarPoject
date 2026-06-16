class ExpressError extends Error{
    constructor(status,massege){
        super()
        this.status=status;
        this.massege=massege;
    }
}
module.exports=ExpressError;