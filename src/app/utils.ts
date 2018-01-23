export class Utils{

  addKeyGuid(arr:any[], arrayKey:string):any[] {
    var newArray = [];
    for(var index in arr){
      var newElement = arr[index];
      newElement[arrayKey] = this.generateGuid();
      newArray.push(newElement);
    }
    return newArray;
  }

  getElementIndexByKeyValue(queryArray, queryKey, queryValue){
    return queryArray.findIndex(function (o) { return o[queryKey] === queryValue; });
  }

  generateGuid():string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return 'var_'+ s4() + s4() + '_' + s4() + '_' + s4() + '_' +
      s4() + '_' + s4() + s4() + s4();
  }

  generateUtcTimestamp(){
    return 123456;
  }

  removeDuplicates(originalArray, objKey) {
    var trimmedArray = [];
    var values = [];
    var value;

    for(var i = 0; i < originalArray.length; i++) {
      value = originalArray[i][objKey];

      if(values.indexOf(value) === -1) {
        trimmedArray.push(originalArray[i]);
        values.push(value);
      }
    }

    return trimmedArray;

  }

  getDate(): number{
    return Math.floor((new Date()).getTime() / 1000);
  }


  filterStringOnElementObjectKey(val: any, array, filterKey): any[] {
    if(val!==null){
      console.log(`Filter is running: ${val}, Key: ${filterKey}`);
      return array.filter(option =>
        option[filterKey]
        .toLowerCase()
        .indexOf(val.toLowerCase()) === 0);
    }else{
      return array;
    }

  }
}
