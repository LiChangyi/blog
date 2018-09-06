module.exports = (() => {
  Date.prototype.formatDate = function (format = 'YY-MM-DD hh:mm:ss'){
    var year = this.getFullYear(),
        month = this.getMonth()+1,//月份是从0开始的
        day = this.getDate(),
        hour = this.getHours(),
        min = this.getMinutes(),
        sec = this.getSeconds();
    
    var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g,year)
                        .replace(/MM/g,preArr[month]||month)
                        .replace(/DD/g,preArr[day]||day)
                        .replace(/hh/g,preArr[hour]||hour)
                        .replace(/mm/g,preArr[min]||min)
                        .replace(/ss/g,preArr[sec]||sec);

    return newTime;    
  }     
})()