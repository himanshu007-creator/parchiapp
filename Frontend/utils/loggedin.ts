import * as ls from "local-storage";
import Cookies from 'js-cookie'


const loggedInStatus = ()=>{
    const LSflag = ls.get('parchiUserLoggedIn')
    const CookieFlag = Cookies.get('ParchiToken')
}

module.exports = [loggedInStatus]
