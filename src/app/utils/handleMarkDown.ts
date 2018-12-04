export class MarkDown{
    convertToHTML = function (markDownText:string) {
        var showdown  = require('showdown')
        var converter = new showdown.Converter() 
        return converter.makeHtml(markDownText);    
    }
}