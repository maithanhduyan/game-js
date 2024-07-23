<?php

$nonce = $LastSecretNumber;
function getRoll($serverSeed, $clientSeed, $nonce){
    $x = $serverSeed + $clientSeed + $nonce;
    $hash = hash('sha256', $x);
    $subhash = substr($hash, 0, 10);
    $hexdec = hexdec($subhash);
    $SecretNumber = fmod($hexdec, 1000000);
    return $SecretNumber;
}
        