<?php
include('prov_constants.php');


$provName = "";
$provType = "";
$provPPhone = "";

$provSPhone = "";
$provComp = "";

if(isset($_GET['name']))
{
    $provName = $_GET['name'];
}
if(isset($_GET['type']))
{
    $provType = $_GET['type'];
}
if(isset($_GET['pPhone']))
{
    $provPPhone = $_GET['pPhone'];
}

if(isset($_GET['sPhone']))
{
    $provSPhone = $_GET['sPhone'];
}
if(isset($_GET['comp']))
{
    $provComp = $_GET['comp'];
}

if($provName != "" && $provPPhone != "" && $provType != ""){
    $toIns = '{"name" : "'.$provName.'", "type":"'.$provType.'","pPhone":"'.$provPPhone.'","sPhone":"'.$provSPhone.'","comp":"'.$provComp.'"}';
    echo insertNewProvider($toIns);
} else {
    errorNo();
}

function insertNewProvider($provName)
{
    return insertNewProviderToMongo($provName);
}

function errorNo(){
    echo "INSERT REQUIRES A NAME, GENDER, AND AGE! ";
}


?>