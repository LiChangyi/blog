function formatDate(val) {
  let time = new Date(val);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  m = m<10?'0'+m:m;
  d = d<10?'0'+d:d;
  h = h<10?'0'+h:h;
  mm = mm<10?'0'+mm:mm;
  s = s<10?'0'+s:s;
  return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
}

export default formatDate;
