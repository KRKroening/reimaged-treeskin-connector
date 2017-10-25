<?php
require("ent_constants.php");

$stream = file_get_contents("php://input");
$file = json_decode($stream,true);
// var_dump($file);

$toDate = "";
$fromDate = "";
$provider = "";
$type = "";
$subject = "";

if(isset($_GET['toDate'])){
    $toDate = $_GET['toDate'];
}
if(isset($_GET['fromDate'])){
    $fromDate = $_GET['fromDate'];
}
if(isset($_GET['provider'])){
    $provider = $_GET['provider'];
}
if(isset($_GET['type'])){
    $type = $_GET['type'];
}

if(isset($_GET['subject'])){
    $subject = $_GET['subject'];
}
 echo $toDate, $fromDate;
 echo "________";
if($subject != ""){
    $query = buildQueryString($toDate,$fromDate,$provider,$type,$subject);
    echo GetEntryByFilterFromMongo($query);
} else {
    errorNo();
}

function buildQueryString($toDate,$fromDate,$provider,$type,$subject){
    $qSt = array("subject" => $subject);
    if($provider != "Any"){
       $qSt["provider"] = $provider;
    }
    if($type){
        $qSt["type"] = $type;
    }
    if($toDate && $fromDate)
    {
        $qSt["date"] = array('$gt' => $fromDate, '$lte' => $toDate);      
    }
    return $qSt;
}

function errorNo(){
    echo "INSERT REQUIRES A NAME, GENDER, AND AGE! ";
}

?>