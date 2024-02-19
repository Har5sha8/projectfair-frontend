import axios from "axios";
 
export const commonAPI = async(httpRequest,url,reqBody,reqHeader)=>{
    const reqconfig = {
        method:httpRequest,
        url:url,
        data:reqBody,
        headers: reqHeader ?  reqHeader :{"content-type":"application/json"}
    }
    return await axios(reqconfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}