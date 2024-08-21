

let portOpeners = [];
let portFunctions = [];
let ports = 0;

/** @type {NS} ns */
let ns;

/** @param {NS} NS */
export async function main(NS) {
  ns = NS;

  portOpeners = ["BruteSSH.exe","FTPCrack.exe","relaySMTP.exe","HTTPWorm.exe","SQLInject.exe"];
  portFunctions = [ns.brutessh,ns.ftpcrack,ns.relaysmtp,ns.httpworm,ns.sqlinject];

  if ( ns.args.length < 1 ) {
    ns.tprint("ERROR you must pass target hostname to this script");
    return;
  }

  let targetHost = ns.args[0];

  if ( ns.hasRootAccess(targetHost) ) {
    ns.tprint(`WARNING already have full access to server [${targetHost}]!`);
    return;
  }

  if ( !ns.serverExists(targetHost) ) {
    ns.tprint(`ERROR server with hostname [${targetHost}] doesn't exist!`);
    return;
  }

  let portsRequired = ns.getServerNumPortsRequired(targetHost);

  
  ports = 0;
  for (let i = 0; i < portOpeners.length; i++) {
    //openPort(portOpeners[i]);
    openPort(i,targetHost);
  }

  if (ports >= portsRequired) {
    ns.nuke(targetHost);
    ns.tprint(`INFO server [${targetHost}] went Badaboom!`)
  } else {
    ns.tprint(`ERROR you can only open ${ports}/${portsRequired} ports`);
  }
 
}


function openPort(index,targetHost) {
  if ( ns.fileExists(portOpeners[index]) ) {
    portFunctions[index](targetHost);
    ports++;
    ns.tprint(`INFO ${portOpeners[index]} port open`);
  } else {
    ns.tprint(`WARNING ${portOpeners[index]} not available!`)
  }
}
