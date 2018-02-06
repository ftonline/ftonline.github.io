var applicationData = {};

const SERVER_URL = 'https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec';


/**
 * 
 */
function getMetaContent(metaData) { 
   var metas = document.getElementsByTagName('meta'); 
   
   for (var i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("name") == metaData) { 
         return metas[i].getAttribute("content"); 
      } 
   } 

    return "";
} 




function isEmptyString(str) {
    return (!str || 0 === str.length);
}