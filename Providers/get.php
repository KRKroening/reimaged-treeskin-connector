<?php
include('prov_constants.php');


$provName = "";

if(isset($_GET['name']))
{
    $provName = $_GET['name'];
}

if($provName != ""){
    echo GetProviderByName($provName);
} else {
    echo GetAllProviders();
}

function GetProviderByName($provName)
{
    return GetProviderByNameFromMongo($provName);
}

function GetAllProviders()
{
    return GetAllProvidersFromMongo();
}

?>