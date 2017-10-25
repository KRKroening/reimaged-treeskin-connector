<?php
include('sub_constants.php');


$subName = "";
$subGender = "";
$subAge = "";

$subColour = "";
$subBreed = "";

if(isset($_GET['name']))
{
    $subName = $_GET['name'];
}
if(isset($_GET['age']))
{
    $subAge = $_GET['age'];
}
if(isset($_GET['gender']))
{
    $subGender = $_GET['gender'];
}

if(isset($_GET['colour']))
{
    $subColour = $_GET['colour'];
}
if(isset($_GET['breed']))
{
    $subBreed = $_GET['breed'];
}

if($subName != "" && $subAge != "" && $subGender != ""){
    $toIns = '{"name" : "'.$subName.'", "age":"'.$subAge.'","breed":"'.$subBreed.'","gender":"'.$subGender.'","colour":"'.$subColour.'"}';
    echo insertNewSubject($toIns);
} else {
    errorNo();
}

function insertNewSubject($subName)
{
    return insertNewSubjectToMongo($subName);
}

function errorNo(){
    echo "INSERT REQUIRES A NAME, GENDER, AND AGE! ";
}


?>