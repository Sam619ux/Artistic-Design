<?php
$name =$_POST['name'];
$phone =$_POST['phone'];
$email =$_POST['email'];
$date =$_POST['date'];
$category =$_POST['category'];
$size =$_POST['size'];
$type =$_POST['type'];
$frame =$_POST['frame'];
$address =$_POST['address'];
// $file =$_POST['file'];
// $wrap =$_POST['wrap'];
// $description =$_POST['description'];


//database connection

$conn = new mysqli('localhost','root','','prototype');
if($conn->connect_error){
    die('connection failed :'.$conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into form(name,phone,email,date,category,size,type,frame,address)
    values(?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sisdsssss",$name,$phone,$email,$date,$category,$size,$type,$frame,$address);
    $stmt->execute();
    echo "registration successfully...";
    $stmt->close();
    $conn->close();
}

?>