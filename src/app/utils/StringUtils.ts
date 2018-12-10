export class StringUtils{
    getString(userName: string): string{
        let tempString= new Array();
        if(userName.includes('https://')){
            while(userName.includes('https://')){
                userName = userName.replace('https://', '');
            }
            return userName;
        }
        if(!(userName.indexOf(' ') >= 0) && userName.length >= 20){
            for(let str of userName.split('')){
                if(str == str.toUpperCase() && !('0123456789'.indexOf(str) !== -1)){
                    tempString.push(" "+str);
                }else{
                    tempString.push(""+str);
                }
            }
            return tempString.join("");
        }
        return userName;
    }
}