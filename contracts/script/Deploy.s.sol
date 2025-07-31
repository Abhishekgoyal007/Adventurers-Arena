// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script,console} from "forge-std/Script.sol";
import {AA} from "../src/AA.sol";

contract Deploy is Script {
    AA public aa;

    function run() public returns (AA) {
        vm.startBroadcast(msg.sender);
        aa = new AA();
        vm.stopBroadcast();
        return aa;
    }
}

contract DeployWithData is Script {
    AA public aa;

    function run() public returns (AA) {
        vm.startBroadcast(msg.sender);
        aa = new AA();
        aa.addItem(2000, "KnCHR");
        aa.addItem(2000, "ScCHR");
        aa.addItem(2000, "HlCHR");
        aa.addItem(2000, "MgCHR");
        aa.addItem(2000, "TnCHR");
        vm.stopBroadcast();
        address ownedBy = aa.owner();
        console.log("Owner",ownedBy);
        return aa;
    }
}

// forge script script/Deploy.s.sol:DeployWithData --rpc-url etherlink-testnet.rpc.thirdweb.com --private-key $PRIVATE_KEY --broadcast
