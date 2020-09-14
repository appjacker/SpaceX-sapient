function getDateList(projectList) {
   let DateList = [];
   projectList.forEach(element => {
       const year = new Date (element.launch_date_local).getFullYear();
       if(DateList.length === 0){
           DateList.push(year);
       }
       if(DateList.indexOf(year) !== -1){
       
    } else{
        DateList.push(year);
    }
    
   }); 
   return DateList;
}



export const SpacexService = {

    getDateList 

};