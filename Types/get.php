<?php
include('type_constants.php');


$typeName = "";

if(isset($_GET['name']))
{
    $typeName = $_GET['name'];
}

if($typeName != ""){
    echo GetTypeByName($typeName);
} else {
    echo GetAllTypes();
}

function GetTypeByName($typeName)
{
    return GetTypeByNameFromMongo($typeName);
}

function GetAllTypes()
{
    return GetAllTypesFromMongo();
}

?>