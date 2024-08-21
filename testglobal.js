// test of global variable

let globalValue = 0;
let hacks = 0;
/** @param {NS} ns */
export async function main(ns) {
  let targetServer = ns.args[0];

  globalValue++;
  
  if ((targetServer).toUpperCase() == "RESET") {
    hacks = 0;
    return;
  } //

  ns.tprint(`globalValue[${globalValue}]`);
  while(true){
    await ns.hack(targetServer); //hackit
    hacks++;
    ns.tprint(`Hacked[${targetServer}]:${hacks} - script was run ${globalValue} times`);
  }
}
