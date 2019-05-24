export function timeParseInt(time, symbol) {
  let times = time.split(symbol);
  return times[0]*60*60 + times[1]*60 + times[2]*1;
}
