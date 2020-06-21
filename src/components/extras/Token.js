let token_genrator = ()=>{
    let token=localStorage.getItem('Token')
    if (token){
        return token
    }
    else{
        return false
    }
}
export default token_genrator 