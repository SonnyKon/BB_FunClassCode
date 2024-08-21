/** @param {NS} ns */
export async function main(ns) {
  let targetServer = 'n00dles';

	while(true) {
    if ( (ns.getServerSecurityLevel(targetServer) - ns.getServerMinSecurityLevel(targetServer) ) > 0.05 ) {
      await ns.weaken(targetServer)
    } else if ( ns.getServerMoneyAvailable(targetServer) < ns.getServerMaxMoney(targetServer) ) {
      await ns.grow(targetServer);
    } else {
        for (let i = 3; i > 0; i--) {
      		await ns.hack(targetServer);
        }
    }
	}
}
