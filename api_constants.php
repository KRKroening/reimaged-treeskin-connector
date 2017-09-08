<?php
$mongoUrl = 'mongodb://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01';
$mongoKey = "c6ddf72b-6b5c-4a70-94b5-a7a36eeb2e9c";
$ConString = 'mongodb://ts_admin:ts_pass@ts-01-shard-00-00-penqj.mongodb.net:27017,ts-01-shard-00-01-penqj.mongodb.net:27017,ts-01-shard-00-02-penqj.mongodb.net:27017/test?ssl=true&replicaSet=TS-01-shard-0&authSource=admin';

function ExecuteSelectAll($dbCol){
    $ConString = 'mongodb://ts_admin:ts_pass@ts-01-shard-00-00-penqj.mongodb.net:27017,ts-01-shard-00-01-penqj.mongodb.net:27017,ts-01-shard-00-02-penqj.mongodb.net:27017/test?ssl=true&replicaSet=TS-01-shard-0&authSource=admin';

    $m = new \MongoDB\Driver\Manager($ConString);
    $ns = 'Treeskin_db.Visit_Types';

    // Create query object with all options:
    $query = new \MongoDB\Driver\Query(
            [] // query (empty: select all)
    );
    // echo $dbCol;
    // Execute query and obtain cursor:
    $cursor = $m->executeQuery( $dbCol, $query );

    $it = new \IteratorIterator($cursor);
    $it->rewind(); // Very important

    $return = array();
    while($doc = $it->current()) {
        // var_dump($doc);
        array_push($return,$doc);
        $it->next();
    }
    return $return;
}

function ExecuteSelectFilter($dbCol,$typeName){
    $ConString = 'mongodb://ts_admin:ts_pass@ts-01-shard-00-00-penqj.mongodb.net:27017,ts-01-shard-00-01-penqj.mongodb.net:27017,ts-01-shard-00-02-penqj.mongodb.net:27017/test?ssl=true&replicaSet=TS-01-shard-0&authSource=admin';

    $m = new \MongoDB\Driver\Manager($ConString);
    $ns = 'Treeskin_db.Visit_Types';

    // Create query object with all options:
    $query = new \MongoDB\Driver\Query(
            $typeName // query (empty: select all)
    );

    // Execute query and obtain cursor:
    $cursor = $m->executeQuery( $ns, $query );

    $it = new \IteratorIterator($cursor);
    $it->rewind(); // Very important

    $return = array();
    while($doc = $it->current()) {
        // var_dump($doc);
        array_push($return,$doc);
        $it->next();
    }
    return $return;
}

function ExecuteInsert($dbCol,$data){
    $ConString = 'mongodb://ts_admin:ts_pass@ts-01-shard-00-00-penqj.mongodb.net:27017,ts-01-shard-00-01-penqj.mongodb.net:27017,ts-01-shard-00-02-penqj.mongodb.net:27017/test?ssl=true&replicaSet=TS-01-shard-0&authSource=admin';
    $m = new \MongoDB\Driver\Manager($ConString);

    $insRec = new MongoDB\Driver\BulkWrite;
    $dataJSON = json_decode($data);
    // var_dump($dataJSON);
    $insRec->insert($dataJSON);
    
    $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
    
    $result = $m->executeBulkWrite($dbCol, $insRec, $writeConcern);

    if($result->getInsertedCount()){
        $flag = 3;
        echo "Success";
    }else{
        $flag = 2;
        echo "fail";
    }
}

function ExecuteDeleteFilter($dbCol,$name){
    $ConString = 'mongodb://ts_admin:ts_pass@ts-01-shard-00-00-penqj.mongodb.net:27017,ts-01-shard-00-01-penqj.mongodb.net:27017,ts-01-shard-00-02-penqj.mongodb.net:27017/test?ssl=true&replicaSet=TS-01-shard-0&authSource=admin';

    $m = new \MongoDB\Driver\Manager($ConString);

    // Create query object with all options:
    $delRec = new MongoDB\Driver\BulkWrite;

    $delRec->delete(['name' => $name], ['limit' => 1]);

    $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);

    $result = $m->executeBulkWrite($dbCol, $delRec, $writeConcern);

    if($result->getDeletedCount()){

      $flag = 1;
      return "Success";

    }else{

      $flag = 2;
      return "failed";

    }

}


?>